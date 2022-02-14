import { getModelByChurch } from "../../utils/util";
import { success, error, notFound } from "../../config/response";
import { pagination, paginated_data } from "../../middleware/pagination";
import { donationSchema } from "../../models/donation";
import { titheSchema } from "../../models/tithe";


export const create_tithe = async (req, res) => {
  const { church } = req.body;
  try {
    const Tithe = await getModelByChurch(church, "Tithe", titheSchema);
    let tithe = new Tithe(req.body);

    tithe = await tithe.save();
    return res.json(success("Success", tithe, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const get_tithe_list = async (req, res) => {
  const { limit, offset } = pagination(req.query);
  const { church } = req.query;
  try {
    const Tithe = await getModelByChurch(church, "Tithe", titheSchema);
    const tithe = await Tithe.paginate({}, { offset, limit });
    if (!tithe) return res.json(success("No records found", tithe, res.statusCode));
    return res.json(success("Success", tithe, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, ))
  }
}

export const get_tithe_details = async (req, res) => {
  const { church, titheId } = req.query;
  try {
    const Tithe = await getModelByChurch(church, "Tithe", titheSchema);
    const tithe = await Tithe.findById({ _id: titheId });
    if (!tithe) return res.json(success("No record found", tithe, res.statusCode));
    return res.json(success("Success", tithe, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, ));
  }
}

export const update_tithe = async (req, res) => {
  const { church, titheId } = req.query;
  try {
    const Tithe = await getModelByChurch(church, "Tithe", titheSchema);
    const tithe = await Tithe.findByIdAndUpdate({ _id: titheId }, req.body, {new: true });
    if (!tithe) return res.status(404).json(notFound("Record not found", tithe, res.statusCode));
    return res.json(success("Success", tithe, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, ));
  }
}

export const delete_tithe = async (req, res) => {
  const { church, titheId } = req.query;
  try {
    const Tithe = await getModelByChurch(church, "Tithe", titheSchema);
    const tithe = await Tithe.findByIdAndDelete({ _id: titheId });
    if (!tithe) return res.status(404).json(notFound("Record not found", tithe, res.statusCode));
    return res.json(success("Success", tithe, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const tithe_filter = async (req, res) => {
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

    const Tithe = await getModelByChurch(church, "Tithe", titheSchema);
    const tithe = await Tithe.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", tithe, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const tithe_search = async (req, res) => {
  const { searchTerm, page, limit, church } = req.query;
  try {
    const Tithe = await getModelByChurch(church, "Tithe", titheSchema);
    const searchResult = await Tithe.aggregate([{ $match: {
      $or: [
        { first_name: {
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
          last_name: {
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