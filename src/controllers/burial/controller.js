import { burialSchema } from "../../models/burial";
import { getModelByChurch } from "../../utils/util";
import { success, error } from "../../config/response";
import { pagination } from "../../middleware/pagination";

export const createBurial = async (req, res) => {
  const { church, first_name, last_name, age, death_date, burial_venue, officiating_pastor, position, sex, burial_date } = req.body;
  const image_url = req.files.image_url && req.files.image_url[0].location;

  try {
    const Burial = await getModelByChurch(church, "Burial", burialSchema)
    let burial = new Burial({ first_name, last_name, age, death_date, burial_venue, officiating_pastor, position, sex, image_url, burial_date });
    burial = await burial.save();
    return res.json(success("Success", burial, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const death_list = async (req, res) => {
  const { offset, limit } = pagination(req.query);
  const { church } = req.query;
  try {
    const Burial = await getModelByChurch(church, "Burial", burialSchema);
    const burial = await Burial.paginate({}, { offset, limit });
    return res.json(success("Success", burial, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const burialDetail = async (req, res) => {
  const { church, burialId } = req.query;
  try {
    const Burial = await getModelByChurch(church, "Burial", burialSchema);
    const burial = await Burial.findById({ _id: burialId });
    return res.json(success("Success", burial, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateBurial = async (req, res) => {
  const { first_name, last_name, age, death_date, burial_venue, officiating_pastor, position, sex, burial_date } = req.body;
  const { church, burialId } = req.query;
  const image_url = req.files.image_url && req.files.image_url[0] && req.files.image_url[0].location;
  try {
    const Burial = await getModelByChurch(church, "Burial", burialSchema);
    let burial = await Burial.findById({ _id: burialId });

    if (!burial) return res.json(success("No records found", burial, res.statusCode));
    if (first_name) burial.first_name = first_name;
    if (last_name) burial.last_name = last_name;
    if (age) burial.age = age;
    if (death_date) burial.death_date = death_date;
    if (burial_venue) burial.burial_venue = burial_venue;
    if (officiating_pastor) burial.officiating_pastor = officiating_pastor;
    if (position) burial.position = position;
    if (image_url) burial.image_url = image_url;
    if (sex) burial.sex = sex;
    if (burial_date) burial.burial_date = burial_date;

    burial = await burial.save();
    return res.json(success("Updated successfully", burial, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteBurial = async (req, res) => {
  const { church, burialId } = req.query;
  try {
    const Burial = await getModelByChurch(church, "Burial", burialSchema);
    const burial = await Burial.findByIdAndDelete({ _id: burialId });
    return res.json(success("Success", burial, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const searchDeathRecord = async (req, res) => {
  const { searchTerm, church } = req.query;
  console.log(req.query)
  try {
    const Burial = await getModelByChurch(church, "Burial", burialSchema);
    const searchResult = await Burial.aggregate([{ $match: {
      $or: [
        { first_name: {
            $regex: searchTerm,
            $options: "i"
          }
        },
          { last_name: {
            $regex: searchTerm,
            $options: "i"
          }
        },
        { 
          burial_venue: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          sex: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          officiating_pastor: {
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

export const burial_filter = async (req, res) => {
  // const { offset, limit } = pagination(req.query);
  const { time_range, church } = req.query;

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

    const Burial = await getModelByChurch(church, "Burial", burialSchema);
    const burial = await Burial.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", burial, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}