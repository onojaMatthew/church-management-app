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

export const fetchOfficeList = async (req, res) => {
  try {
    const officeList = await Office.find({});
    if (!officeList) return res.json(success("No records found", officeList, res.statusCode));
    return res.json(success("Success", officeList, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const fetchOffice = async (req, res) => {
  const { officeId } = req.params
  try {
    const office = await Office.findById({ _id: officeId });
    if (!office) return res.json(success("No records found", office, res.statusCode));
    return res.json(success("Success", office, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Server Error. Please check your connection and try again", res.statusCode));
  }
}

export const updateOffice = async (req, res) => {
  const { officeId } = req.params;
  try {
    const office = await Office.findByIdAndUpdate({ _id: officeId }, req.body);
    return res.json(success("Updated successfully", office, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const deleteOffice = async (req, res) => {
  const { officeId } = req.params;
  try {
    const office = await Office.findByIdAndRemove({ _id: officeId });
    if (!office) return res.json(success("Office does not exist", office, res.statusCode));
    return res.json(success("Office deleted", office, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}