import { Church } from "../../models/church";

export const createChurch = async (req, res) => {
  const { email, city, state, street, back_name, acct_no, acct_name, phone, domain_name } = req.body;
  try {
    const isExists = await Church.findOne({ email, domain_name });
    if (isExists) return res.status(400).json(error("Church already exists", res.statusCode));
    let church = new Church({ email, city, state, street, back_name, acct_no, acct_name, phone, domain_name });
    church = await church.save();
    return res.json(success("Success", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const churchList = async (req, res) => {
  try {
    const churchList = await Church.find({});
    return res.json(success("Success", churchList, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const churchDetails = async (req, res) => {
  try {
    const church = await Church.findById({ _id: req.params.churchId });
    if (!church) return res.json(success("Record not found", church, res.statusCode));
    return res.json(success("Success", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const updateChurch = async (req, res) => {
  try {
    const church = await Church.findByIdAndUpdate({ _id: req.params.churchId });
    return res.json(success("Updated", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}