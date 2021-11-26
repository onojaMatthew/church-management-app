import { success, error } from "../../config/response";
import { getModelByChurch } from "../../utils/util";
import { reportSchema } from "../../models/report";
import { pagination } from "../../middleware/pagination";
import { zonalCoordinatorSchema } from "../../models/zonal_coordinator"
import { churchSchema } from "../../models/church";

export const create_report = async (req, res) => {
  const { church, subject, to, message } = req.body;
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const Coordinator = await getModelByChurch("hostdatabase", "Coordinator", zonalCoordinatorSchema);

    const church_details = await Church.findById({ _id: church });

    if (!church_details) return res.status(404).json(error("Church does not exist", res.statusCode));

    let coordinator = await Coordinator.findById({ _id: to });

    const first_name = coordinator && coordinator.first_name;
    const last_name = coordinator && coordinator.last_name;
    const data = {
      _id: coordinator && coordinator._id,
      name: `${first_name} ${last_name}`,
      email: coordinator && coordinator.email,
      phone: coordinator && coordinator.phone,
    }

    const church_data = {
      _id: church_details && church_details._id,
      branch: church_details && church_details.branch,
      head_pastor: church_details && church_details.head_pastor,
      email: church_details && church_details.email,
      phone: church_details && church_details.phone
    }

    let report = new Report({ church: church_data, subject, to, message, coordinator: data });

    report = await report.save();

    return res.json(success("Success", report, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const report_list = async (req, res) => {
  const { offset, limit } = pagination(req.query);
  
  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const reports = await Report.paginate({}, { offset, limit });
    return res.json(success("Success", reports, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const report_by_coordinator = async (req, res) => {
  const { coordinatorId } = req.query;
  const { offset, limit } = pagination(req.query);
  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const reports = await Report.paginate({ to: coordinatorId }, { offset, limit });
    return res.json(success("Success", reports, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const report_by_church = async (req, res) => {
  const { church } = req.query;
  const { offset, limit } = pagination(req.query);

  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const reports = await Report.paginate({ "church._id": church }, { offset, limit });
    return res.json(success("Success", reports, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const report_details = async (req, res) => {
  const { reportId } = req.query;

  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const report = await Report.findById({ _id: reportId });
    return res.json(success("Success", report, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const coordinator_remark = async (req, res) => {
  const { reportId, coordinatorId, remark, approval } = req.query;
  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    let report = await Report.findOne({ _id: reportId, "coordinator._id": coordinatorId });
    if (!report) return res.status(404).json(error("Report does not exist", res.statusCode));

    if (remark) report.coordinator_remark = remark;
    if (approval) report.coordinator_approval = approval;

    report = await report.save();

    return res.json(success("Success", report, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const gco_remark = async (req, res) => {
  const { reportId, remark, approval } = req.body;
  console.log(req.body, " the request body")
  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    let report = await Report.findOne({ _id: reportId });
    if (!report) return res.status(404).json(error("Report does not exist", res.statusCode));

    if (remark) report.gco_approval_remark.remark = remark;
    if (approval) report.gco_approval_remark.approved = approval;

    report = await report.save();

    return res.json(success("Success", report, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_report = async (req, res) => {
  const { reportId } = req.query;
  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    let report = await Report.findByIdAndDelete({ _id: reportId });
    return res.json(success("Success", report, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const searchReport = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const searchResult = await Report.aggregate([{ $match: {
      $or: [
          { "church.head_pastor": {
            $regex: searchTerm,
            $options: "i"
          }
        },
        { 
          "church.branch": {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          "church.email": {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          "church.phone": {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { "coordinator.name": {
          $regex: searchTerm,
          $options: "i"
        }
      },
      { 
        "coordinator.email": {
          $regex: searchTerm,
          $options: "i"
        },
      },
      { 
        "coordninator.phone": {
          $regex: searchTerm,
          $options: "i"
        },
      },
      { 
        subject: {
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

export const report_filter = async (req, res) => {
  const { time_range } = req.query;

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

    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const report = await Report.find({ createdAt: { $gte: date_ago }});
    return res.json(success("Success", report, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}
