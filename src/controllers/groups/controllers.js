import { groupSchema } from "../../models/group";
// import { churchSchema } from "../../models/church";
import { getModelByChurch } from "../../utils/util";
import { success, error } from "../../config/response";

export const postGroup = async (req, res) => {
  const { name, church } = req.body;
  try {
    const Group = await getModelByChurch(church, "Group", groupSchema);
    const isExists = await Group.findOne({ name, church });
    if (isExists) return res.status(error("Group already exists", res.statusCode));
    let group = new Group({ name });
    group = await group.save();
    return res.json(success("Group created", group, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const groupList = async (req, res) => {
  const { church } = req.params;
  try {
    const Group = await getModelByChurch(church, "Group", groupSchema);
    const groups = await Group.find({});
    return res.json(success("Success", groups, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const group = async (req, res) => {
  const { church, groupId } = req.query
  try {
    const Group = await getModelByChurch(church, "Group", groupSchema);
    const group = await Group.findById({ _id: groupId});
    return res.json(success("Success", group, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateGroup = async (req, res) => {
  const { church } = req.query;
  try {
    const Group = await getModelByChurch(church, "Group", groupSchema);
    const group = await Group.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
    return res.json(success("Success", group, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteGroup = async (req, res) => {
  const { church, groupId } = req.query;
  try {
    const Group = await getModelByChurch(church, "Group", groupSchema);
    const group = await Group.findByIdAndDelete({ _id: groupId});
    return res.json(success("Success", group, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}