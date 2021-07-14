import { Church } from "../../models/church";
import { error, success } from "../../config/response";

export const createChurch = async (req, res) => {
  const { email, city, state, street, bank_name, acct_no, acct_name, phone } = req.body;
  try {
    const isExists = await Church.findOne({ email });
    if (isExists) return res.status(400).json(error("Church already exists", res.statusCode));
    let church = new Church({ 
      email, 
      "address.city": city, 
      "address.state": state,
      "address.street": street, 
      "bank.bank_name": bank_name, 
      "bank.acct_no": acct_no, 
      "bank.acct_name": acct_no, 
      phone 
    });
    church = await church.save();
    return res.json(success("Success", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const churchList = async (req, res) => {
  try {
    const churchList = await Church.find({}).populate("office").populate("officers").populate("memebers").sort({ createdAt: -1 });;
    return res.json(success("Success", churchList, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const churchDetails = async (req, res) => {
  try {
    const church = await Church.findById({ _id: req.params.churchId }).populate("office").populate("officers").populate("memebers");
    if (!church) return res.json(success("Record not found", church, res.statusCode));
    return res.json(success("Success", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const updateChurch = async (req, res) => {
  try {
    const church = await Church.findByIdAndUpdate({ _id: req.params.churchId }, req.body);
    return res.json(success("Updated", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const deleteChurch = async (req, res) => {
  try {
    const church = await Church.findByIdAndRemove({ _id: req.params.churchId });
    return res.json(success("Church account deleted", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}