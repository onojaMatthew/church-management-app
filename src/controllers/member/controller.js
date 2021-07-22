import { error, success } from "../../config/response";
import { memberSchema } from "../../models/member";
import { getModelByChurch } from "../../utils/util";

export const createMember = async (req, res) => {
  const { church } = req.body;
  try {
    const Member = await getModelByChurch(church, "member", memberSchema);
    const isExists = await Member.aggregate([{ $match: { $or: [{ email: req.body.email }, { phone: req.body.phone }]}}]);
    if (isExists[0]) return res.status(400).json(error("Member alreay exists", res.statusCode));
    let newMember = new Member();
    newMember.first_name = req.body.first_name;
    newMember.last_name = req.body.last_name;
    newMember.email = req.body.email;
    newMember.phone = req.body.phone;
    newMember.address.city = req.body.city;
    newMember.address.state = req.body.state;
    newMember.address.street = req.body.street;
    newMember.state_of_origin = req.body.state_of_origin;
    newMember.occupation = req.body.occupation;

    const response = await newMember.save();
    return res.json(success("Member successfully created", response, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message), res.statusCode);
  }
}

export const getMembers = async (req, res) => {
  const { church } = req.params;
  try {
    const Member = await getModelByChurch(church, "member", memberSchema);
    const members = await Member.find({});
    if (!members) return res.json(success("No records found", members, res.statusCode));
    return res.json(success("Success", members, res.statusCode));
  } catch (err) {
    return res.status(400).json(eror(err.message, res.statusCode));
  }
}

export const deleteMember = async (req, res) => {
  const { church, memberId } = req.params;
  try {
    const Member = await getModelByChurch(church, "member", memberSchema);
    const member = await Member.findByIdAndRemove({ _id: memberId });
    return res.json(success("Success", member, res.statusCode));
  } catch (err) {
    return res.status(400).json(eror(err.message, res.statusCode));
  }
}

export const updateMember = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}