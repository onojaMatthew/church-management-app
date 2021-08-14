import { groupSchema } from "../../models/group";
import { churchSchema } from "../../models/church";
import { getModelByChurch } from "../../services/utils/util";
import { success, error } from "../../config/response";

export const postGroup = async (req, res) => {
  const { name, church } = req.body;
  try {
    const Group = await getModelByChurch(church, "Group", groupSchema);
    const isExists = await Group.findOne({ name, church });
    if (isExists) return res.status(error("Group already exists", res.statusCode));
    let group = new Group({ name });
    group = await group.save();
    return res.status(success("Group created", group, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const 