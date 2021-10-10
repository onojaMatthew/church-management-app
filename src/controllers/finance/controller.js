import { financeSchema } from "../../models/finance";
import { getModelByChurch } from "../../utils/util";
import { success, error, notFound } from "../../config/response";
import { pagination } from "../../middleware/pagination";


export const create_finance = async (req, res) => {
  const { church, service_type, amount, category, date, created_by } = req.body;
  console.log(req.body);
  // return
  try {
    const Finance = await getModelByChurch(church, "Finance", financeSchema);
    let income = new Finance({ church, service_type, amount, category, date, created_by });

    income = await income.save();
    return res.json(success("Success", income, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const get_income_list = async (req, res) => {
  const { limit, offset } = pagination(req.query);
  const { church } = req.query;
  try {
    const Finance = await getModelByChurch(church, "Finance", financeSchema);
    const income = await Finance.paginate({}, { offset, limit });
    if (!income) return res.json(success("No records found", income, res.statusCode));
    return res.json(success("Success", income, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, ))
  }
}

export const get_income_details = async (req, res) => {
  const { church, incomeId } = req.query;
  try {
    const Finance = await getModelByChurch(church, "Finance", financeSchema);
    const income = await Finance.findById({ _id: incomeId });
    if (!income) return re.json(success("No record found", income, res.statusCode));
    return res.json(success("Success", income, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, ));
  }
}

export const update_income = async (req, res) => {
  const { church, incomeId } = req.query;
  try {
    const Finance = await getModelByChurch(church, "Finance", financeSchema);
    const income = await Finance.findByIdAndUpdate({ _id: incomeId }, req.body, {new: true });
    if (!income) return res.status(404).json(notFound("Record not found", income, res.statusCode));
    return res.json(success("Success", income, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, ));
  }
}

export const delete_income = async (req, res) => {
  const { church, incomeId } = req.query;
  try {
    const Finance = await getModelByChurch(church, "Finance", financeSchema);
    const income = await Finance.findByIdAndDelete({ _id: incomeId });
    if (!income) return res.status(404).json(notFound("Record not found", income, res.statusCode));
    return res.json(success("Success", income, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}