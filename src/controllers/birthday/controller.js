import { birthdaySchema } from "../../models/birthday";
import { success, error } from "../../config/response";
import { getModelByChurch } from "../../utils/util";

export const postBirthday = async (req, res) => {
  const { celebrants, church } = req.body;

  try {
    // let birthdays = [];
    // celebrants.forEach(celeb => birthdays.push(celeb));
    // console.log(birthdays, " the birth days");
    const Birthday = await getModelByChurch(church, "Birthday", birthdaySchema);
    let event = new Birthday({ celebrants: celebrants });

    event = await event.save();
    return res.json(success("Birthday event created", event, res.statusCode));
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