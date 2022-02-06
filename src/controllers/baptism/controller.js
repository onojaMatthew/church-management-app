import { baptismSchema } from "../../models/baptism";
import { success, error } from "../../config/response";
import { getModelByChurch } from "../../utils/util";
import { pagination } from "../../middleware/pagination";

export const create_baptism = async (req, res) => {
  const { church } = req.body;
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);

    let baptism = new Baptism(req.body);
    
    baptism = await baptism.save();
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const baptism_list = async (req, res) => {
  const { church } = req.query;
  const { offset, limit } = pagination(req.query);
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);

    const baptism = await Baptism.paginate({}, { limit, offset });
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const baptism_details = async (req, res) => {
  const { church, id } = req.query;
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);
    const baptism = await Baptism.findById({ _id: id });
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const update_baptism = async (req, res) => {
  const { church, id } = req.body;
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);
    const baptism = await Baptism.findByIdAndUpdate({ _id: id}, req.body, { new: true });
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_baptism = async (req, res) => {
  const { church, id } = req.query;
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);
    const baptism = await Baptism.findByIdAndDelete({ _id: id });
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}