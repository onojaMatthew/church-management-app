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
  const { first_name, last_name, email, phone, password, role, zone } = req.body;
  try {
    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const itExists = await ZonalPastor.findOne({ email });
    if (itExists) return res.status(400).json(error("Email already taken", res.statusCode));

    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const role_data = await Role.findById({ _id: role });
    
    if (!role) return res.status(404).json(error("Role not found", ))
    const hash = bcrypt.hashSync(password, 12);
    
    let newZonalPastor = new ZonalPastor({ first_name, last_name, email, password: hash && hash, phone, zone });
    newZonalPastor = await newZonalPastor.save();
    newZonalPastor.role.role_id = role_data && role_data._id;
    newZonalPastor.role.role_name = role_data && role_data.name;

    newZonalPastor = await newZonalPastor.save();

    const link = "http://localhost:3000/zonal-pastor/login";
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
    const isZonalPastor = await ZonalPastor.findOne({ email: req.body.email });
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
      head_pastor: church_details && church_details.head_pastor,
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

    church_details.zonalPastor = church_data;
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
    const zonalPastor = await ZonalPastor.findByIdAndUpdate({ _id: zonal_pastor_id }, req.body, { new: true });
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