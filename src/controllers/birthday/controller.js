import { birthdaySchema } from "../../models/birthday";
import { success, error } from "../../config/response";
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
      
      event = await event.save();
      birthdays.push(event);
    }
    
    return res.json(success("Birthday event created", birthdays, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const eventList = async (req, res) => {
  const { church } = req.params;
  try {
    const Event = await getModelByChurch(church, "Birthday", birthdaySchema);
    const events = await Event.paginate({});
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
  const { church, eventId } = req.query;
  try {
    const Event = await getModelByChurch(church, "Birthday", birthdaySchema);
    const event = await Event.findByIdAndDelete({ _id: eventId});
    return res.json(success("Success", event, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}