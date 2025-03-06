import { error, success } from "../../config/response";
import { paginated_data, pagination } from "../../middleware/pagination";
import { membershipCategorySchema } from "../../models/membership_category";
import { getModelByChurch } from "../../utils/util";

export const create = async (req, res) => {
  const { churchId, name } = req.body;
  try {
    const MembershipCategory = await getModelByChurch(churchId, "MembershipCategory", membershipCategorySchema)
    const isExists = await MembershipCategory.findOne({ name });
    if (isExists) return res.status(400).json(error("Name already exists", res.statusCode));
    let category = new MembershipCategory({ name, churchId });
    category = await category.save();
    return res.json(success("New office created", category, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const fetchCategoryList = async (req, res) => {
  const { churchId } = req.params;
  try {
    const { page, limit } = pagination(req.query);
    const MembershipCategory = await getModelByChurch(churchId, "MembershipCategory", membershipCategorySchema)
    const categoryList = await MembershipCategory.paginate({}, { offset: page, limit });
    if (!categoryList) return res.json(success("No records found", categoryList, res.statusCode));
    
    return res.json(success("Success", categoryList, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const fetchCategory = async (req, res) => {
  const { id, churchId } = req.params;
  try {
    const MembershipCategory = await getModelByChurch(churchId, "MembershipCategory", membershipCategorySchema);
    const category = await MembershipCategory.findById({ _id: id });
    if (!category) return res.json(success("No records found", category, res.statusCode));
    return res.json(success("Success", category, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateCategory = async (req, res) => {
  const { id, churchId } = req.params
  try {
    const MembershipCategory = await getModelByChurch(churchId, "MembershipCategory", membershipCategorySchema)
    const category = await MembershipCategory.findByIdAndUpdate({ _id: id }, req.body);
    return res.json(success("Updated successfully", category, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteCategory = async (req, res) => {
  const { id, churchId } = req.params
  try {
    const MembershipCategory = await getModelByChurch(churchId, "MembershipCategory", membershipCategorySchema)
    const category = await MembershipCategory.findByIdAndRemove({ _id: id });
    
    if (!category) return res.status(400).json(error("Category does not exist", res.statusCode));
    return res.json(success("Deleted successfully", category, res.statusCode));
  } catch (err) {
    return res.status(500).json(error(err.message, res.statusCode));
  }
}

