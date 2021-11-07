import { error, success } from "../../config/response";
import { paginated_data, pagination } from "../../middleware/pagination";
import { expenditureSchema } from "../../models/expenditure";
import { getModelByChurch } from "../../utils/util";


export const create_expenditure = async (req, res) => {
  const { church } = req.body;
  try {
    const Expenditure = await getModelByChurch(church, "Expenditure", expenditureSchema);
    let new_exp = new Expenditure({ 
      item: req.body.item,
      cost: req.body.cost,
      church: req.body.church,
      unit_price: req.body.unit_price,
      quantity: req.body.quantity,
      purchased_by: req.body.purchased_by,
      authorized_by: req.body.authorized_by,
      time: req.body.time
    });

    new_exp = await new_exp.save();
    return res.json(success("Success", new_exp, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const expenditure_list = async (req, res) => {
  const { offset, limit } = pagination(req.query);
  console.log()
  try {
    const Expenditure = await getModelByChurch(req.query.church, "Expenditure", expenditureSchema);
    const expenditure = await Expenditure.paginate({ church: req.query.church }, { offset, limit });
    return res.json(success("Success", expenditure, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const expenditure = async (req, res) => {
  const { church, expenditure_id } = req.query;
  try {
    const Expenditure = await getModelByChurch(church, "Expenditure", expenditureSchema);
    const expenditure = await Expenditure.findById({ _id: expenditure_id });
    return res.json(success("Success", expenditure, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const expenditure_filter = async (req, res) => {
  // const { offset, limit } = pagination(req.query);
  const { time_range, church } = req.query;
  console.log(req.query);

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

    const Expenditure = await getModelByChurch(church, "Expenditure", expenditureSchema);
    const expenditure = await Expenditure.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", expenditure, res.statusCode));
  } catch (err) {
    console.log(err)
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const search_expenditure = async (req, res) => {
  const { searchTerm, page, limit, church } = req.query;
  console.log(req.query)
  try {
    const Expenditure = await getModelByChurch(church, "Expenditure", expenditureSchema);
    const searchResult = await Expenditure.aggregate([{ $match: {
      $or: [
        { cost: {
            $regex: searchTerm,
            $options: "i"
          }
        },
          { item: {
            $regex: searchTerm,
            $options: "i"
          }
        },
        { 
          unit_price: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          quantity: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          authorized_by: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        {
          purchased_by: {
            $regex: searchTerm,
            $options: "i"
          }
        }
      ]
    }}]);

    const result = paginated_data(searchResult, page, limit);

    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_expenditure = async (req, res) => {
  const { church, expenditure_id } = req.query;
  try {
    const Expenditure = await getModelByChurch(church, "Expenditure", expenditureSchema);
    const expenditure = await Expenditure.findByIdAndDelete({ _id: expenditure_id });
    return res.json(success("Success", expenditure, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}
