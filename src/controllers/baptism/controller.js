import { baptismSchema } from "../../models/baptism";
import { success, error } from "../../config/response";
import { getModelByChurch } from "../../utils/util";
import { pagination } from "../../middleware/pagination";

export const create_baptism = async (req, res) => {
  const { church } = req.body;
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);

    let baptism = new Baptism(req.body);

    baptism = await baptism.save();
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const baptism_list = async (req, res) => {
  const { church } = req.query;
  const { offset, limit } = pagination(req.query);
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);

    const baptism = await Baptism.paginate({}, { limit, offset });
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const baptism_details = async (req, res) => {
  const { church, id } = req.query;
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);
    const baptism = await Baptism.findById({ _id: id });
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const update_baptism = async (req, res) => {
  const { church, id } = req.body;
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);
    const baptism = await Baptism.findByIdAndUpdate({ _id: id}, req.body, { new: true });
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_baptism = async (req, res) => {
  const { church, id } = req.query;
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);
    const baptism = await Baptism.findByIdAndDelete({ _id: id });
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const search = async (req, res) => {
  const { church, searchTerm } = req.query
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);
    const baptism = await Baptism.aggregate([{ $match: {
      $or: [
        { first_name: {
            $regex: searchTerm,
            $options: "i"
          }
        },
          { last_name: {
            $regex: searchTerm,
            $options: "i"
          }
        },
        { 
          venue: {
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
          teacher: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          administrating_pastor: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          phone: {
            $regex: searchTerm,
            $options: "i"
          },
        },
      ]
    }}]);

    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const filter = async (req, res) => {
  const { time_range, church } = req.query;
  try {
    const time_data = time_range.split(" ");
    const time_length = Number(time_data[0]);
    const time_param = time_data[1];
    const date = new Date();
    let date_ago;

    if (time_param === "hours") {
      date_ago = date.setDate(date.getHours() - time_length);
    } else if (time_param === "days") {
      date_ago = date.setDate(date.getDate() - time_length);
    } else if (time_param === "weeks") {
      date_ago = date.setDate(date.getDate() - (time_length * 7));
    } else if (time_param === "months") {
      date_ago = date.setDate(date.getDate() - (time_length * 30));
    }

    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);
    const baptism = await Baptism.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}