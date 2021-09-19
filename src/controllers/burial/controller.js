import { burialSchema } from "../../models/burial";
import { getModelByChurch } from "../../utils/util";
import { success, error } from "../../config/response";

export const createBurial = async (req, res) => {
  const { church } = req.body;
  const image_url = req.files.image_url[0] && req.files.image_url[0].location;
  try {
    const Burial = await getModelByChurch(church, "Burial", burialSchema)
    let burial = new Burial({ first_name, last_name, age, death_date, burial_venue, officiating_pastor, post, image_url });
    burial = await burial.save();
    return res.json(success("Success", burial, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}