import { fcategorySchema } from "../../models/fin_category";
import { getModelByChurch } from "../../utils/util";
import { error, success, alreadyExists, notFound } from "../../config/response";

export const create_fin_category = async (req, res) => {
  const { church, name } = req.body;
  console.log(req.body, " in controller")
  try {
    const FinCategory = await getModelByChurch(church, "FinCategory", fcategorySchema);
    console.log("after getting fin category")
    const itExists = await FinCategory.findOne({ name });
    if (itExists) return res.status(407).json(alreadyExists("Finance category name already exists", res.statusCode));
    let newCategory = new FinCategory({ church: req.body.church, name });
    newCategory = await newCategory.save();
    console.log()
    return res.json(success("Success", newCategory, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const category_list = async (req, res) => {
  const { church } = req.query;
  try {
    const FinCategory = await getModelByChurch(church, "FinCategory", fcategorySchema);
    const categories = await FinCategory.find({});
    if (!categories) return res.status(404).json(notFound("No records found", res.statusCode));
    return res.json(success("Success", categories, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const category_details = async (req, res) => {
  const { church, categoryId } = req.query;
  try {
    const FinCategory = await getModelByChurch(church, "FinCategory", fcategorySchema);
    const categories = await FinCategory.findById({ _id: categoryId }).populate("church");
    if (!categories) return res.status(404).json(notFound("No record found", res.statusCode));
    return res.json(success("Success", categories, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_category = async (req, res) => {
  const { church, categoryId } = req.query;
  try {
    const FinCategory = await getModelByChurch(church, "FinCategory", fcategorySchema);
    const category = await FinCategory.findByIdAndDelete({ _id: categoryId });
    if (!category) return res.status(407).json(notFound("Record does not exist", category, res.statusCode));
    return res.json(success("Success", category, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const update_category = async (req, res) => {
  const { church, categoryId } = req.query;
  try {
    const FinCategory = await getModelByChurch(church, "FinCategory", fcategorySchema);
    const category = await FinCategory.findByIdAndUpdate({ _id: categoryId }, req.body, { new: true });
    return res.json(success("Success", category, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}