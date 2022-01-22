import { birthdaySchema } from "../../models/birthday";
import { success, error } from "../../config/response";
import { pagination } from "../../middleware/pagination";
import { getModelByChurch } from "../../utils/util";

export const postBirthday = async (req, res) => {
  const { celebrants, church } = req.body;

  try {
    let birthdays = [];
    
    const Birthday = await getModelByChurch(church, "Birthday", birthdaySchema);
    let event;

    for (let i = 0; i < celebrants.length; i++) {
      event = new Birthday();
      event.first_name = celebrants[i].first_name;
      event.last_name = celebrants[i].last_name;
      event.email = celebrants[i].email;
      event.phone = celebrants[i].phone;
      event.birth_date = celebrants[i].birth_date;
      event.sex = celebrants[i].sex;
      event.venue = celebrants[i].venue;
      
      event = await event.save();
      birthdays.push(event);
    }
    
    return res.json(success("Birthday event created", birthdays, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const eventList = async (req, res) => {
  const { offset, limit } = pagination(req.query);
  const { church } = req.params;
  try {
    const Event = await getModelByChurch(church, "Birthday", birthdaySchema);
    const events = await Event.paginate({}, { offset, limit });
    if (!events) return res.json(success("No records found", events, res.statusCode));
    return res.json(success("Success", events, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const event = async (req, res) => {
  const { eventId, church } = req.query;
  try {
    const Event = await getModelByChurch(church, "Birthday", birthdaySchema);
    const event = await Event.findById({ _id: eventId });
    if (!event) return res.json(success("No records found", event, res.statusCode));
    return res.json(success("Success", event, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateEvent = async (req, res) => {
  const { church } = req.query;
  try {
    const Event = await getModelByChurch(church, "Birthday", birthdaySchema);
    const event = await Event.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
    return res.json(success("Success", event, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteEvent = async (req, res) => {
  const { church, eventId } = req.params;
  try {
    const Event = await getModelByChurch(church, "Birthday", birthdaySchema);
    const event = await Event.findByIdAndDelete({ _id: eventId});
    return res.json(success("Success", event, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const searchEvent = async (req, res) => {
  const { searchTerm, church } = req.query;

  try {
    const Event = await getModelByChurch(church, "Birthday", birthdaySchema);
    const searchResult = await Event.aggregate([{ $match: {
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
          email: {
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
        { 
          sex: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          venue: {
            $regex: searchTerm,
            $options: "i"
          },
        },
      ]
    }}]);

    return res.json(success("Success", searchResult, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode))
  }
}

export const birthday_filter = async (req, res) => {
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

    const Birthday = await getModelByChurch(church, "Birthday", birthdaySchema);
    const birthday = await Birthday.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", birthday, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}