import { success, error } from "../../config/response";
import { getModelByChurch } from "../../utils/util";
import { reportSchema } from "../../models/report";
import { regionalPastorSchema } from "../../models/regional_pastor";
import { pagination } from "../../middleware/pagination";
import { zonalPastorSchema } from "../../models/zonal_pastor"
import { churchSchema } from "../../models/church";

export const create_report = async (req, res) => {
  const { 
    church, 
    subject, 
    zonal_pastor, 
    regional_pastor, 
    message,
    to_general_overseer,
    to_regional_pastor,
    to_zonal_pastor,
    attachment,
  } = req.body;
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const Coordinator = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const RegionalPastor = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    const church_details = await Church.findById({ _id: church });

    if (!regional_pastor) return res.status(404).json(error("Invalid request params: regionalPastor", res.statusCode));
    if (!church_details) return res.status(404).json(error("Church does not exist", res.statusCode));

    let coordinator;
    let regionalPastor;
    let regionPastorData = {};
    let data = {};

    if (to_regional_pastor) {
      regionalPastor = RegionalPastor && await RegionalPastor.findById({ _id: regional_pastor });
    }
     
    if (to_zonal_pastor) {
      coordinator = Coordinator && await Coordinator.findById({ _id: zonal_pastor });
    }

    if (coordinator) {
      const first_name = coordinator && coordinator.first_name;
      const last_name = coordinator && coordinator.last_name;
      data = {
        _id: coordinator && coordinator._id,
        name: `${first_name} ${last_name}`,
        email: coordinator && coordinator.email,
        phone: coordinator && coordinator.phone,
      }
    }
    
    if (regionalPastor) {
      regionPastorData = {
        _id: regionalPastor && regionalPastor._id,
        name: `${regionalPastor.first_name} ${regionalPastor.last_name}`,
        email: regionalPastor && regionalPastor.email,
        phone: regionalPastor && regionalPastor.phone,
      }
    }

    

    const church_data = {
      _id: church_details && church_details._id,
      branch: church_details && church_details.branch,
      "head_pastor.first_name": church_details && church_details.head_pastor && church_details.head_pastor.first_name,
      "head_pastor.last_name": church_details && church_details.head_pastor && church_details.head_pastor.last_name,
      email: church_details && church_details.email,
      phone: church_details && church_details.phone
    }

    let report = new Report({ 
      church: church_data, subject, 
      regional_pastor: regionPastorData, 
      to: zonal_pastor, 
      message, 
      coordinator: data,
      to_general_overseer,
      to_regional_pastor,
      to_zonal_pastor,
      attachment
    });

    report = await report.save();

    return res.json(success("Success", report, res.statusCode));
  } catch (err) {
    console.log(err)
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

export const report_by_regional_pastor = async (req, res) => {
  console.log(req.user)
  const { regional_pastor_id } = req.query;
  console.log(req.query)
  const { offset, limit } = pagination(req.query);
  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const reports = await Report.paginate({ "regional_pastor._id": regional_pastor_id }, { offset, limit, sort: { createdAt: -1 } });
    return res.json(success("Success", reports, res.statusCode));
  } catch (err) {
    // console.log(err)
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const report_by_church = async (req, res) => {
  const { church } = req.query;
  const { offset, limit } = pagination(req.query);

  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const reports = await Report.paginate({ "church._id": church }, { offset, limit, sort: { createdAt: -1 } });
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

export const viewed = async (req, res) => {
  const { reportId } = req.query;
  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    const report = await Report.findByIdAndUpdate({ _id: reportId }, { $set: { viewed: true }}, { new: true });
    return res.json(success("Success", {}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const coordinator_remark = async (req, res) => {
  const { reportId, coordinatorId, remark, approval } = req.body;
  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    let report = await Report.findOne({ _id: reportId, to: coordinatorId });
    if (!report) return res.status(404).json(error("Report does not exist", res.statusCode));

    if (remark) report.coordinator_remark = remark;
    if (approval) report.coordinator_approval = approval;

    report = await report.save();

    return res.json(success("Success", report, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const regional_pastor_remark = async (req, res) => {
  const { reportId, regional_pastor_id, remark, approval } = req.body;
  try {
    const Report = await getModelByChurch("hostdatabase", "Report", reportSchema);
    let report = await Report.findOne({ _id: reportId, "regional_pastor._id": regional_pastor_id });
    if (!report) return res.status(404).json(error("Report does not exist", res.statusCode));

    if (remark) report.regional_pastor_remark = remark;
    if (approval) report.regional_pastor_approval = approval;

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
