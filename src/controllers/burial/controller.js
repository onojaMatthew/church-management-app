import { burialSchema } from "../../models/burial";
import { getModelByChurch } from "../../utils/util";
import { success, error } from "../../config/response";
import { pagination } from "../../middleware/pagination";

export const createBurial = async (req, res) => {
  const { church, first_name, last_name, age, death_date, burial_venue, officiating_pastor, position, sex } = req.body;
  const image_url = req.files.image_url[0] && req.files.image_url[0].location;
  try {
    const Burial = await getModelByChurch(church, "Burial", burialSchema)
    let burial = new Burial({ first_name, last_name, age, death_date, burial_venue, officiating_pastor, position, sex, image_url });
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
  const { church, first_name, last_name, age, death_date, burial_venue, officiating_pastor, position, sex } = req.body;
  const image_url = req.files.image_url[0] && req.files.image_url[0].location;
  try {
    const Burial = await getModelByChurch(church, "Burial", burialSchema);
    const burial = await Burial.findById({ _id: burialId });

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