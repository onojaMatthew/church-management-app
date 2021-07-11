import { error, success } from "../../config/response";
import { Office } from "../../models/office";

export const create = async (req, res) => {
  const { churchId, name } = req.body;
  try {
    const isExists = await Office.findOne({ name });
    if (isExists) return res.status(400).json(error("Name already exists", res.statusCode));
    let office = new Office({ name, churchId });
    office = await office.save();
    return res.json(success("New office created", office, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const fetchOffice = async (req, res) => {
  try {
    const office = await Office.find({});
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}