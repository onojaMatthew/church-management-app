import { getModelByChurch } from "../../utils/util";
import { weddingSchema } from "../../models/wedding";
import { success, error } from "../../config/response";

export const create = async (req, res) => {
  const { groom_first_name, groom_last_name, groom_phone_number, bride_first_name, bride_last_name, bride_phone_number, venue,date,lead_pastor, } = req.body;
  const { church } = req.query;
  try {
    const Wedding = await getModelByChurch(church, "Wedding", weddingSchema);
    const itExists = await Wedding.findOne({ "groom.phone": groom_phone_number, "bride.phone": bride_phone_number });
    if (itExists) return res.json(success("Wedding event already exists", itExists, res.statusCode ));
    const wedding_picture = req.files.wedding_picture && req.files.wedding_picture[0].location;
    let newWedding = new Wedding({
      "groom.first_name": groom_first_name,
      "groom.last_name": groom_last_name,
      "groom.phone": groom_phone_number,
      "bride.first_name": bride_first_name,
      "bride.last_name": bride_last_name,
      "bride.phone": bride_phone_number,
      venue,
      date,
      lead_pastor,
      wedding_picture
    });

    newWedding = await newWedding.save();
    return res.json(success("Success", newWedding, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const getWeddingList = async (req, res) => {
  const { church } = req.query;
  try {
    const Wedding = await getModelByChurch(church, "Wedding", weddingSchema);
    const wedding_list = await Wedding.find({}).sort({ createdAt: -1 });
    return res.json(success("Success", wedding_list, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateWedding = async (req, res) => {
  const { church } = req.query;
  try {
    const Wedding = await getModelByChurch(church, "Wedding", weddingSchema);
    const wedding_picture = req.files.wedding_picture && req.files.wedding_picture[0].location;
    let wedding = await Wedding.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
    if (wedding_picture) wedding.wedding_picture = wedding_picture;
    wedding = await wedding.save();
    if (!wedding) return res.status(404).json(success("Event not found", wedding, res.statusCode));
    return res.json(success("Event updated", wedding, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteWedding = async (req, res) => {
  const { church } = req.query;
  try {
    const Wedding = await getModelByChurch(church, "Wedding", weddingSchema);
    const wedding = await Wedding.findByIdAndDelete({ _id: req.query.id });
    if (!wedding) return res.status(404).json(success("The event you want to delete does not exist", wedding, res.statusCode));
    return res.json(success("Event successfully deleted", wedding, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}