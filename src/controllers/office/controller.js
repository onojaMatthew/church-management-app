import { error, success } from "../../config/response";
// import { churchSchema } from "../../models/church";
import { officeSchema } from "../../models/office";
import { getModelByChurch } from "../../utils/util";

export const create = async (req, res) => {
  const { churchId, name } = req.body;
  try {
    const Office = await getModelByChurch(churchId, "Office", officeSchema);
    const isExists = await Office.findOne({ name });
    if (isExists) return res.status(400).json(error("Name already exists", res.statusCode));
    let office = new Office({ name, churchId });
    office = await office.save();
    let church = await Church.findByIdAndUpdate({ _id: churchId }, { $push: { office: office._id }}, { new: true });
    await church.save();
    return res.json(success("New office created", office, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const fetchOfficeList = async (req, res) => {
  const { churchId } = req.params;
  try {
    const Office = await getModelByChurch(churchId, "Office", officeSchema);
    const officeList = await Office.find({});
    if (!officeList) return res.json(success("No records found", officeList, res.statusCode));
    return res.json(success("Success", officeList, res.statusCode));
  } catch (err) {
    console.log(err)
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const fetchOffice = async (req, res) => {
  const { officeId, churchId } = req.params;
  try {
    const Office = await getModelByChurch(churchId, "Office", officeSchema);
    const office = await Office.findById({ _id: officeId });
    if (!office) return res.json(success("No records found", office, res.statusCode));
    return res.json(success("Success", office, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Server Error. Please check your connection and try again", res.statusCode));
  }
}

export const updateOffice = async (req, res) => {
  const { officeId, churchId } = req.params;
  try {
    const Office = await getModelByChurch(churchId, "Office", officeSchema);
    const office = await Office.findByIdAndUpdate({ _id: officeId }, req.body);
    return res.json(success("Updated successfully", office, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const deleteOffice = async (req, res) => {
  const { officeId, churchId } = req.params;
  try {
    const Office = await getModelByChurch(churchId, "Office", officeSchema);
    const office = await Office.findByIdAndRemove({ _id: officeId });
    if (!office) return res.json(success("Office does not exist", office, res.statusCode));
    return res.json(success("Office deleted", office, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}