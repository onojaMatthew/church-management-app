import { getModelByChurch } from "../../utils/util";
import { success, error, notFound } from "../../config/response";
import { pagination, paginated_data } from "../../middleware/pagination";
import { donationSchema } from "../../models/donation";


export const create_donation = async (req, res) => {
  const { church } = req.body;
  try {
    const Donation = await getModelByChurch(church, "Donation", donationSchema);
    let donation = new Donation(req.body);

    donation = await donation.save();
    return res.json(success("Success", donation, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const get_donation_list = async (req, res) => {
  const { limit, offset } = pagination(req.query);
  const { church } = req.query;
  try {
    const Donation = await getModelByChurch(church, "Donation", donationSchema);
    const donation = await Donation.paginate({}, { offset, limit });
    if (!donation) return res.json(success("No records found", donation, res.statusCode));
    return res.json(success("Success", donation, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, ))
  }
}

export const get_donation_details = async (req, res) => {
  const { church, donationId } = req.query;
  try {
    const Donation = await getModelByChurch(church, "Donation", donationSchema);
    const donation = await Donation.findById({ _id: donationId });
    if (!donation) return res.json(success("No record found", donation, res.statusCode));
    return res.json(success("Success", donation, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, ));
  }
}

export const update_donation = async (req, res) => {
  const { church, donationId } = req.query;
  try {
    const Donation = await getModelByChurch(church, "Donation", donationSchema);
    const donation = await Donation.findByIdAndUpdate({ _id: donationId }, req.body, {new: true });
    if (!donation) return res.status(404).json(notFound("Record not found", donation, res.statusCode));
    return res.json(success("Success", donation, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, ));
  }
}

export const delete_donation = async (req, res) => {
  const { church, donationId } = req.query;
  try {
    const Donation = await getModelByChurch(church, "Donation", donationSchema);
    const donation = await Donation.findByIdAndDelete({ _id: donationId });
    if (!income) return res.status(404).json(notFound("Record not found", donation, res.statusCode));
    return res.json(success("Success", donation, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const donation_filter = async (req, res) => {
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

    const Donation = await getModelByChurch(church, "Donation", donationSchema);
    const donation = await Donation.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", donation, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const donation_search = async (req, res) => {
  const { searchTerm, page, limit, church } = req.query;
  try {
    const Donation = await getModelByChurch(church, "Donation", donationSchema);
    const searchResult = await Donation.aggregate([{ $match: {
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
        { 
          createdAt: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          donation_type: {
            $regex: searchTerm,
            $options: "i"
          },
        }
      ]
    }}]);

    const result = paginated_data(searchResult, page, limit);

    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}