import { baptismSchema } from "../../models/baptism";
import { success, error } from "../../config/response";
import { getModelByChurch } from "../../utils/util";
import { pagination } from "../../middleware/pagination";
import { dedicationSchema } from "../../models/dediccation";

export const create_dedication = async (req, res) => {
  const { church } = req.body;
  try {
    const Dedication = await getModelByChurch(church, "Dedication", dedicationSchema);

    let dedication = new Dedication(req.body);

    dedication = await dedication.save();
    return res.json(success("Success", dedication, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const dedication_list = async (req, res) => {
  const { church } = req.query;
  const { offset, limit } = pagination(req.query);
  try {
    const Dedication = await getModelByChurch(church, "Dedication", dedicationSchema);

    const dedication = await Dedication.paginate({}, { limit, offset });
    return res.json(success("Success", dedication, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const dedication_details = async (req, res) => {
  const { church, id } = req.query;
  try {
    const Baptism = await getModelByChurch(church, "Baptism", baptismSchema);
    const baptism = await Baptism.findById({ _id: id });
    return res.json(success("Success", baptism, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const update_dedication = async (req, res) => {
  const { church, id } = req.body;
  try {
    const Dedication = await getModelByChurch(church, "Dedication", dedicationSchema);
    const dedication = await Dedication.findByIdAndUpdate({ _id: id}, req.body, { new: true });
    return res.json(success("Success", dedication, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_dedication = async (req, res) => {
  const { church, id } = req.query;
  try {
    const Dedication = await getModelByChurch(church, "Dedication", dedicationSchema);
    const dedication = await Dedication.findByIdAndDelete({ _id: id });
    return res.json(success("Success", dedication, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const search = async (req, res) => {
  const { church, searchTerm } = req.query
  try {
    const Dedication = await getModelByChurch(church, "Dedication", baptismSchema);
    const dedication = await Dedication.aggregate([{ $match: {
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

    return res.json(success("Success", dedication, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const filter = async (req, res) => {
  const { time_range, church } = req.query;
  try {
    let dedication;
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

    const Dedication = await getModelByChurch(church, "Dedication", dedicationSchema);
    if (time_range.toLowerCase() === "all") {
      baptism = await Dedication.find({});
    } else {
      baptism = await Dedication.find({ createdAt: { $gte: date_ago }});
    }
    
    return res.json(success("Success", dedication, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}