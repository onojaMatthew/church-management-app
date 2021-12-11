import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { success, error } from "../../config/response";
import { regionalPastorSchema } from "../../models/regional_pastor";
import { getModelByChurch } from "../../utils/util";
import { sendEmail } from "../../services/mailer";
import { pagination } from "../../middleware/pagination";
import { churchSchema } from "../../models/church";
import { roleSchema } from "../../models/role";

export const create_regional_pastor = async (req, res) => {
  const { first_name, last_name, email, phone, password, role, region } = req.body;
  try {
    const RegionalPastor = await getModelByChurch("hostdatabase", "Regionalpastor", regionalPastorSchema);
    const itExists = await RegionalPastor.findOne({ email });
    if (itExists) return res.status(400).json(error("Email already taken", res.statusCode));

    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const role_data = await Role.findById({ _id: role });
    
    if (!role) return res.status(404).json(error("Role not found", ))
    const hash = bcrypt.hashSync(password, 12);
    
    let newRegionalpastor = new RegionalPastor({ first_name, last_name, email, password: hash && hash, phone, region });
    newRegionalpastor = await newRegionalpastor.save();
    newRegionalpastor.role.role_id = role_data && role_data._id;
    newRegionalpastor.role.role_name = role_data && role_data.name;

    newRegionalpastor = await newRegionalpastor.save();

    const link = "http://localhost:3000/regional-pastor/login";
    const receiver = newRegionalpastor.email;
    const sender = "no-reply@church.mail";
    const subject = "Account Creation Details";
    const message = `<h3>Hello dear,</h3> 
    <p>Your account has been created successfully. You can login to the account by visiting: ${link}</p>
    <p><strong>Email</strong>: ${newRegionalpastor.email}</p>
    <p><strong>Password</strong>: ${password}</p>
    <p>Thanks.</p>`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }

    sendEmail(data);
    return res.json(success("Account created successfully", newRegionalpastor, res.statusCode ));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const login = async (req, res) => {
  try {
    const RegionalPastor = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    const isRegionalPastor = await RegionalPastor.findOne({ email: req.body.email });
    if (!isRegionalPastor) return res.status(404).json(error("User does not exist", res.statusCode));
    const passwordMatched = bcrypt.compareSync(req.body.password, isRegionalPastor.password);
    if (!passwordMatched) return res.status(400).json(error("Password did not match", res.statusCode));
    const { email, first_name, last_name, phone, _id, role } = isRegionalPastor;
    const token = jwt.sign({ _id, email, role }, process.env.SECRET_KEY, { expiresIn: "1days"});
    res.cookie("token", `Bearer ${token}`, { expires: new Date(new Date() + 64800000)});
    return res.header("authorization", `Bearer ${token}`).json(success("Login success", { token, user: { email, first_name, role, last_name, phone, _id }}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const regional_pastor_list = async (req, res) => {
  const { offset, limit } = pagination(req.query);
  try {
    const Regional = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    const regionalPastor = await Regional.paginate({}, { offset, limit });

    return res.json(success("Success", regionalPastor, res.statusidCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const regional_pastor_details = async (req, res) => {
  try {
    const Regional = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    const regionalPastor = await Regional.findById({ _id: req.query.id });
    return res.json(success("Success", regionalPastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const assign_churches = async (req, res) => {
  const { church, regional_pastor_id } = req.body;
  try {
    const RegionalPastor = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);

    let church_details = await Church.findById({ _id: church });
    const head_pastor = {
      first_name: church_details && church_details.head_pastor && church_details.head_pastor.first_name,
      last_name: church_details && church_details.head_pastor && church_details.head_pastor.last_name
    }
    const data = {
      _id: church_details && church_details._id,
      branch: church_details && church_details.branch,
      phone: church_details && church_details.phone,
      email: church_details && church_details.email,
      head_pastor,
    }

    let regionalPastor = await RegionalPastor.findById({ _id: regional_pastor_id });

    if (!regionalPastor) return res.status(404).json(error("No records found", res.statusCode));
    const findChurch = regionalPastor && regionalPastor.churches.findIndex(i => {
      return i._id.toString() === church.toString();
    });

    
    if (findChurch >= 0) return res.status(400).json(error("Church selected already assigned to this coordinator", res.statusCode));

    regionalPastor.churches.push(data);

    await regionalPastor.save();
    const church_data = {
      first_name: regionalPastor && regionalPastor.first_name,
      last_name: regionalPastor && regionalPastor.last_name,
      email: regionalPastor && regionalPastor.email,
      phone: regionalPastor && regionalPastor.phone,
      _id: regionalPastor && regionalPastor._id,
    }

    church_details.regional_pastor = church_data;
    church_details = await church_details.save();
    return res.json(success("Success", regionalPastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const update_regional_pastor = async (req, res) => {
  const { regional_pastor_id } = req.body;
  try {
    const RegionalPastor = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    const regionalPastor = await RegionalPastor.findByIdAndUpdate({ _id: regional_pastor_id }, req.body, { new: true });
    return res.json(success("Success", regionalPastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_regional_pastor = async (req, res) => {
  const { regional_pastor_id } = req.query;
  try {
    const RegionalPastor = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const regional_pastor = await RegionalPastor.findByIdAndDelete({ _id: regional_pastor_id });
    await Church.findOneAndUpdate({ "regional_pastor._id": regional_pastor_id }, { $set: { regional_pastor: null }}, { new: true });

    return res.json(success("Success", regional_pastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const region_church_list = async (req, res) => {
  const { regional_pastor_id } = req.query;
  const { offset, limit } = pagination(req.query);
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const church_list = await Church.paginate({ "regional_pastor._id": regional_pastor_id }, { offset, limit });

    return res.json(success("Success", church_list, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const search_regional_pastor = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const RegionalPastor = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    const searchResult = await RegionalPastor.aggregate([{ $match: {
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
          region: {
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

export const region_pastor_filter = async (req, res) => {
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

    const RegionalPastor = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    const regionalPastor = await RegionalPastor.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", regionalPastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}
