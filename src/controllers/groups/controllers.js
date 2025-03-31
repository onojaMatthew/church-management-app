import { groupSchema } from "../../models/group";
// import { churchSchema } from "../../models/church";
import { getModelByChurch } from "../../utils/util";
import { success, error } from "../../config/response";
import { memberSchema } from "../../models/member";
import { paginated_data, pagination } from "../../middleware/pagination";

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
    const { offset, limit } = pagination(req.query);
    const Group = await getModelByChurch(church, "Group", groupSchema);
    const groups = await Group.paginate({}, { offset, limit, sort: { name: -1 }});
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

export const add_members = async (req, res) => {
  const { church, member, groupId } = req.params;
  try {
    const Member = await getModelByChurch(church, "Member", memberSchema);
    const Group = await getModelByChurch(church, "Group", groupSchema);
    let group = await Group.findById({ _id: groupId });
    let isMember = await Member.findById({ _id: member });
    if (!isMember) return res.status(404).json(success("Member does not exist", isMember, res.statusCode));
    const group_data = {
      name: group && group.name,
      _id: group && group._id
    }

    const member_data = {
      first_name: isMember && isMember.first_name,
      last_name: isMember && isMember.last_name,
      email: isMember && isMember.email,
      phone: isMember && isMember.phone,
      dob: isMember && isMember.dob,
      _id: isMember && isMember._id,
    }

    isMember.group.push(group_data);
    group.members.push(member_data);
    isMember = await isMember.save();
    group = await group.save();

    return res.json(success("Success", group, res.statusCode));
  } catch (err) {
    console.log(err)
    return res.status(400).json(error(err.message, res.statusCode));
  }
}