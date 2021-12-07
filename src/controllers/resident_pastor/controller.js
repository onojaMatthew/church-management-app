import { residentPastorSchema } from "../../models/residence_pastor";
import { roleSchema } from "../../models/role";
import { error, success } from "../../config/response";
import { getModelByChurch } from "../../utils/util";

export const create_residence_pastor = async (req, res) => {
  const { email, first_name, last_name, phone, role } = req.body;
  try {
    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const role_data = await Role.findById({ _id: role });
    const ResidentPastor = await getModelByChurch("hostdatabase", "ResidentPastor", residentPastorSchema);
    const itExists = await ResidentPastor.findOne({ email });
    if (itExists) return res.status(400).json(error("Email already taken", res.statusCode));
    let resident_pastor = new ResidentPastor({ email, first_name, last_name, phone });
    resident_pastor.role.role_id = role_data && role_data._id;
    resident_pastor.role.role_name = role_data && role_data.name;
    resident_pastor = await resident_pastor.save();
    return res.json(success("Success", resident_pastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const resident_pastor_list = async (req, res) => {
  try {
    
    const ResidentPastor = await getModelByChurch("hostdatabase", "ResidentPastor", residentPastorSchema);
    const result = await ResidentPastor.find({});
    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const pastor_detail = async (req, res) => {
  try {
    const ResidentPastor = await getModelByChurch("hostdatabase", "ResidentPastor", residentPastorSchema);
    const result = await ResidentPastor.findById({ _id: req.query.id });
    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const update_detail = async (req, res) => {
  try {
    const ResidentPastor = await getModelByChurch("hostdatabase", "ResidentPastor", residentPastorSchema);
    const pastor = await ResidentPastor.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
    if (!pastor) return res.status(404).json(error("No records found for this account", res.statusCode));
    return res.json(success("Success", pastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_pastor = async (req, res) => {
  try {
    const ResidentPastor = await getModelByChurch("hostdatabase", "ResidentPastor", residentPastorSchema);
    const pastor = await ResidentPastor.findByIdAndDelete({ _id: req.query.resident_pastor_id });
    return res.json(success("Success", pastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const search_resident_pastor = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const ResidentPastor = await getModelByChurch("hostdatabase", "ResidentPastor", residentPastorSchema);
    const searchResult = await ResidentPastor.aggregate([{ $match: {
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
      ]
    }}]);

    return res.json(success("Success", searchResult, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode))
  }
}

export const resident_pastor_filter = async (req, res) => {
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

    const ResidentPastor = await getModelByChurch("hostdatabase", "ResidentPastor", residentPastorSchema);
    const residentPastor = await ResidentPastor.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", residentPastor, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}
