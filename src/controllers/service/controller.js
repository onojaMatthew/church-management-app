// import { churchSchema } from "../../models/church";
import { getModelByChurch } from "../../utils/util";
import { success, error } from "../../config/response";
import { serviceSchema } from "../../models/service";

export const postService = async (req, res) => {
  const { name, preacher, topic, bible_quote, men, women, children, start_time, end_time, church } = req.body;
  console.log(end_time, start_time)
  try {
    const Service = await getModelByChurch(church, "Service", serviceSchema);
   
    let service = new Service({ 
      name, 
      preacher, 
      topic, 
      bible_quote, 
      "attendance.men": men, 
      "attendance.women": women, 
      "attendance.children": children, 
      start_time, 
      end_time 
    });
    service = await service.save();
    return res.json(success("Group created", service, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const serviceList = async (req, res) => {
  const { church } = req.params;
  try {
    const Service = await getModelByChurch(church, "Service", serviceSchema);
    const services = await Service.paginate({});
    if (!services) return res.json(success("No records found", services, res.statusCode));
    return res.json(success("Success", services, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const service = async (req, res) => {
  const { church, serviceId } = req.query
  try {
    const Service = await getModelByChurch(church, "Service", serviceSchema);
    const service = await Service.findById({ _id: serviceId});
    if (!service) return res.json(success("No records found", service, res.statusCode));
    return res.json(success("Success", service, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateService = async (req, res) => {
  const { church } = req.query;
  try {
    const Service = await getModelByChurch(church, "Service", serviceSchema);
    const service = await Service.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
    return res.json(success("Success", service, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteService = async (req, res) => {
  const { church, serviceId } = req.query;
  try {
    const Service = await getModelByChurch(church, "Service", serviceSchema);
    const service = await Service.findByIdAndDelete({ _id: serviceId});
    return res.json(success("Success", service, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const search = async (req, res) => {
  try {
    const { searchTerm, church } = req.query;

    const Service = await getModelByChurch(church, "Service", serviceSchema);
   
    const result = await Service.find({$or: [
        { name: {
            $regex: searchTerm,
            $options: "i"
          }
        },
          { preacher: {
            $regex: searchTerm,
            $options: "i"
          }
        },
        { 
          bible_quote: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          start_time: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          end_time: {
            $regex: searchTerm,
            $options: "i"
          },
        },
      ]
    });

    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export const filter = async (req, res) => {
  const { time_range, church } = req.query;
  try {
    let service;
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

    const Service = await getModelByChurch(church, "Baptism", baptismSchema);
    if (time_range.toLowerCase() === "all") {
      service = await Service.find({});
    } else {
      service = await Service.find({ createdAt: { $gte: date_ago }});
    }
    
    return res.json(success("Success", service, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}