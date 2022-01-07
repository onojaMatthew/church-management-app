import { fcategorySchema } from "../../models/fin_category";
import { getModelByChurch } from "../../utils/util";
import { error, success, alreadyExists, notFound } from "../../config/response";

export const create = async (req, res) => {
  const { name } = req.body;
  try {
    const IncomeCategory = await getModelByChurch("hostdatabase", "FinCategory", fcategorySchema);
    const category = await IncomeCategory.findOne({ name });
    if (category) return res.status(400).json(error("Income type already exists", res.statusCode));
    let newCategory = new IncomeCategory({ name });
    newCategory = await newCategory.save();
    return res.json(success("Success", newCategory, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const category_list = async (req, res) => {
  try {
    const FinCategory = await getModelByChurch("hostdatabase", "FinCategory", fcategorySchema);
    const categories = await FinCategory.find({});
    if (!categories) return res.status(404).json(notFound("No records found", res.statusCode));
    return res.json(success("Success", categories, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const category_details = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const FinCategory = await getModelByChurch("hostdatabase", "FinCategory", fcategorySchema);
    const categories = await FinCategory.findById({ _id: categoryId });
    if (!categories) return res.status(404).json(notFound("No record found", res.statusCode));
    return res.json(success("Success", categories, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_category = async (req, res) => {
  const { id } = req.query;
  try {
    const FinCategory = await getModelByChurch("hostdatabase", "FinCategory", fcategorySchema);
    const category = await FinCategory.findByIdAndDelete({ _id: id });
    if (!category) return res.status(407).json(notFound("Record does not exist", category, res.statusCode));
    return res.json(success("Success", category, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const update_category = async (req, res) => {
  try {
    const FinCategory = await getModelByChurch("hostdatabase", "FinCategory", fcategorySchema);
    const category = await FinCategory.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
    return res.json(success("Success", category, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}