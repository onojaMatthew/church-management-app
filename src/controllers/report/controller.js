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
    const reports = await Report.paginate({ "coordinator._id": coordinatorId }, { offset, limit });
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
    const reports = await Report.paginate({ church }, { offset, limit });
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
  const { reportId, remark, approval } = req.query;
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