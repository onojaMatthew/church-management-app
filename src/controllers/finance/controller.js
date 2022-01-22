import { financeSchema } from "../../models/finance";
import { getModelByChurch } from "../../utils/util";
import { success, error, notFound } from "../../config/response";
import { pagination, paginated_data } from "../../middleware/pagination";


export const create_finance = async (req, res) => {
  const { church, service_type, amount, category, date, created_by } = req.body;
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

export const income_filter = async (req, res) => {
  // const { offset, limit } = pagination(req.query);
  const { time_range, church } = req.query;

  try {
    const time_data = time_range.split(" ");
    const time_length = Number(time_data[0]);
    const time_param = time_data[1];
    const date = new Date();
    let date_ago;

    if (time_param === "days") {
      date_ago = date.setDate(date.getDate() - time_length);
    } else if (time_param === "weeks") {
      date_ago = date.setDate(date.getDate() - (time_length * 7));
    } else if (time_param === "months") {
      date_ago = date.setDate(date.getDate() - (time_length * 30));
    }

    const Income = await getModelByChurch(church, "Finance", financeSchema);
    const income = await Income.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", income, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const income_search = async (req, res) => {
  const { searchTerm, page, limit, church } = req.query;
  try {
    const Income = await getModelByChurch(church, "Finance", financeSchema);
    const searchResult = await Income.aggregate([{ $match: {
      $or: [
        { service_type: {
            $regex: searchTerm,
            $options: "i"
          }
        },
          { amount: {
            $regex: searchTerm,
            $options: "i"
          }
        },
        { 
          category: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          date: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          created_by: {
            $regex: searchTerm,
            $options: "i"
          },
        },
      ]
    }}]);

    const result = paginated_data(searchResult, page, limit);

    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}