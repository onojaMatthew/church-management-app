import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { success, error } from "../../config/response";
import { zonalPastorSchema } from "../../models/zonal_pastor";
import { getModelByChurch } from "../../utils/util";
import { sendEmail } from "../../services/mailer";
import { pagination } from "../../middleware/pagination";
import { churchSchema } from "../../models/church";
import { roleSchema } from "../../models/role";

export const create_zonal_pastor = async (req, res) => {
  const { first_name, last_name, email, phone, password, role, zone, image_url } = req.body;
 
  try {
    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const itExists = await ZonalPastor.findOne({ email });
    if (itExists) return res.status(400).json(error("Email already taken", res.statusCode));

    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const role_data = await Role.findById({ _id: role });
    
    if (!role) return res.status(404).json(error("Role not found", ))
    const hash = bcrypt.hashSync(password, 12);
    
    let newZonalPastor = new ZonalPastor({ first_name, last_name, email, password: hash && hash, phone, zone, image_url });
    newZonalPastor = await newZonalPastor.save();
    newZonalPastor.role.role_id = role_data && role_data._id;
    newZonalPastor.role.role_name = role_data && role_data.name;

    newZonalPastor = await newZonalPastor.save();

    const link = `${req.header('Origin')}/zonal_pastor_login`;
    const receiver = newZonalPastor.email;
    const sender = "no-reply@church.mail";
    const subject = "Account Creation Details";
    const message = `<h3>Hello dear,</h3>  
    <p>Your account has been created successfully. You can login to the account by visiting: ${link}</p>
    <p><strong>Email</strong>: ${newZonalPastor.email}</p>
    <p><strong>Password</strong>: ${password}</p>
    Thanks.`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }

    sendEmail(data);
    return res.json(success("Account created successfully", newZonalPastor, res.statusCode ));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const login = async (req, res) => {
  try {
    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const isZonalPastor = await ZonalPastor.findOne({ $or: [{ email: req.body.email }, { phone: req.body.email }]});
    if (!isZonalPastor) return res.status(404).json(error("User does not exist", res.statusCode));
    const passwordMatched = bcrypt.compareSync(req.body.password, isZonalPastor.password);
    if (!passwordMatched) return res.status(400).json(error("Password did not match", res.statusCode));
    const { email, first_name, last_name, phone, _id, role } = isZonalPastor;
    const token = jwt.sign({ _id, email, role }, process.env.SECRET_KEY, { expiresIn: "1days"});
    res.cookie("token", `Bearer ${token}`, { expires: new Date(new Date() + 64800000)});
    return res.header("authorization", `Bearer ${token}`).json(success("Login success", { token, user: { email, first_name, role, last_name, phone, _id }}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const zonal_pastor_list = async (req, res) => {
  const { offset, limit } = pagination(req.query);
  try {
    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const zonalPastor = await ZonalPastor.paginate({}, { offset, limit });

    return res.json(success("Success", zonalPastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const assign_churches = async (req, res) => {
  const { church, zonal_pastor_id } = req.body;
  try {
    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);

    let church_details = await Church.findById({ _id: church });

    const data = {
      _id: church_details && church_details._id,
      branch: church_details && church_details.branch,
      phone: church_details && church_details.phone,
      email: church_details && church_details.email,
      "head_pastor.first_name": church_details && church_details.head_pastor && church_details.head_pastor.first_name,
      "head_pastor.last_name": church_details && church_details.head_pastor && church_details.head_pastor.last_name,
    }

    let zonalPastor = await ZonalPastor.findById({ _id: zonal_pastor_id });

    if (!zonalPastor) return res.status(404).json(error("No records found", res.statusCode));
    const findChurch = zonalPastor && zonalPastor.churches.findIndex(i => {
      return i._id.toString() === church.toString();
    });

    
    if (findChurch >= 0) return res.status(400).json(error("Church selected already assigned to this coordinator", res.statusCode));

    zonalPastor.churches.push(data);

    await zonalPastor.save();
    const church_data = {
      first_name: zonalPastor && zonalPastor.first_name,
      last_name: zonalPastor && zonalPastor.last_name,
      email: zonalPastor && zonalPastor.email,
      phone: zonalPastor && zonalPastor.phone,
      _id: zonalPastor && zonalPastor._id,
    }

    church_details.zonal_pastor = church_data;
    church_details = await church_details.save();
    return res.json(success("Success", zonalPastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const update_zonal_pastor = async (req, res) => {
  const { zonal_pastor_id } = req.body;
  try {
    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    let zonalPastor = await ZonalPastor.findByIdAndUpdate({ _id: zonal_pastor_id });

    if (req.body.first_name) zonalPastor.first_name = req.body.first_name;
    if (req.body.last_name) zonalPastor.last_name = req.body.last_name;
    if (req.body.email) zonalPastor.email = req.body.email;
    if (req.body.phone) zonalPastor.phone = req.body.phone;
    if (req.body.image_url) zonalPastor.image_url = req.body.image_url;
    if (req.body.region) zonalPastor.region = req.body.region;

    zonalPastor = await zonalPastor.save();

    return res.json(success("Success", zonalPastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_zonal_pastor = async (req, res) => {
  const { zonal_pastor_id } = req.query;
  try {
    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const zonal_pastor = await ZonalPastor.findByIdAndDelete({ _id: zonal_pastor_id });
    await Church.findOneAndUpdate({ "zonal_pastor._id": zonal_pastor_id }, { $set: { zonal_pastor: null }}, { new: true });

    return res.json(success("Success", zonal_pastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const zone_church_list = async (req, res) => {
  const { zonal_pastor_id } = req.query;
  const { offset, limit } = pagination(req.query);
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const church_list = await Church.paginate({ "zonal_pastor._id": zonal_pastor_id }, { offset, limit });

    return res.json(success("Success", church_list, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const search_zonal_pastor = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const searchResult = await ZonalPastor.aggregate([{ $match: {
      $or: [
          { first_name: {
            $regex: searchTerm,
            $options: "i"
          }
        },
        { 
          email: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          phone: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          last_name: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          zone: {
            $regex: searchTerm,
            $options: "i"
          },
        },
      ]
    }}]);

    return res.json(success("Success", searchResult, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode))
  }
}

export const zonal_pastor_filter = async (req, res) => {
  const { time_range } = req.query;

  try {

    const time_data = time_range.split(" ");
    const time_length = Number(time_data[0]);
    const time_param = time_data[1];
    const date = new Date();
    let date_ago;

    if (time_param === "days") {
      date_ago = date.setDate(date.getDate() - time_length);
    } else if (time_param === "weeks") {
      date_ago = date.setDate(date.getDate() - (time_length * 7));
    } else if (time_param === "months") {
      date_ago = date.setDate(date.getDate() - (time_length * 30));
    }

    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const zonalPastor = await ZonalPastor.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", zonalPastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}


// @desc Recover Password - Generates token and Sends password reset email
// @access Public
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const Pastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    let pastor = await Pastor.findOne({ email });
    if (!pastor) return res.status(404).json(error(`We could not find any account with the email ${email}`));
    pastor.resetPasswordToken = jwt.sign({ firstName: pastor.firstName }, process.env.SECRET_KEY, { expiresIn: "120m" });
    pastor.resetPasswordExpires = Date.now() + 3600000;

    pastor = await pastor.save();
    let link = `${req.header('Origin')}/zonal_reset_password/${pastor.resetPasswordToken}`
    const receiver = pastor.email;
    const sender = "no-reply@mail.com";
    const subject = "Password change request";
    const message = `<p><strong>Hi ${pastor.first_name}</strong></p>
    <p>You sent a password reset request. Please click on the following link ${link} to reset your password.</p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }
    await sendEmail(data);
    return res.json(success("A password reset email was sent to you", {}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Server Error. Please try again", res.statusCode));
  }
};


// @route POST api/auth/reset
// @desc Reset Password
// @access Public
export const resetPassword = async (req, res) => {
  try {
    const Pastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    let isPastor = await Pastor.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: {$gt: Date.now()} });
    if (!isPastor) return res.status(401).json(error("Invalid password reset token or token has expired", res.statusCode));
    const hash = bcrypt.hashSync(req.body.password, 12);
    isPastor.password = hash;
    isPastor.resetPasswordToken = undefined;
    isPastor.resetPasswordExpires = undefined;
    const result = await isPastor.save();
    if (!result) return res.status(400).json(error("Failed to update password. Try again", res.statusCode));
    const receiver = isPastor.email;
    const sender = "no-reply@mail.com";
    const subject = "Password reset confirmation";
    const message = `<p><strong>Hi ${isPastor.first_name}</strong></p>
    <p>This is a confirmation that the password for your account ${isPastor.email} has just been changed.</p>`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }

    await sendEmail(data);
    return res.json(success("Your password has been changed successfully"))
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after some time", res.statusCode));
  }
};
