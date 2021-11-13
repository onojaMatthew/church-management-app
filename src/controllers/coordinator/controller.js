import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { success, error } from "../../config/response";
import { zonalCoordinatorSchema } from "../../models/zonal_coordinator";
import { getModelByChurch } from "../../utils/util";
import { sendEmail } from "../../services/mailer";
import { pagination } from "../../middleware/pagination";
import { churchSchema } from "../../models/church";
import { roleSchema } from "../../models/role";

export const create_coordinator = async (req, res) => {
  const { first_name, last_name, email, phone, password, role } = req.body;
  try {
    const Coordinator = await getModelByChurch("hostdatabase", "Coordinator", zonalCoordinatorSchema);
    const itExists = await Coordinator.findOne({ email });
    if (itExists) return res.status(400).json(error("Email already taken", res.statusCode));

    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const role_data = await Role.findById({ _id: role });
    
    if (!role) return res.status(404).json(error("Role not found", ))
    const hash = bcrypt.hashSync(password, 12);
    
    let newCoordinator = new Coordinator({ first_name, last_name, email, password: hash && hash, phone });
    newCoordinator = await newCoordinator.save();
    newCoordinator.role.role_id = role_data && role_data._id;
    newCoordinator.role.role_name = role_data && role_data.name;

    newCoordinator = await newCoordinator.save();

    const link = "http://localhost:3000/coordinator/login";
    const receiver = newCoordinator.email;
    const sender = "no-reply@church.mail";
    const subject = "Account Creation Details";
    const message = `<h3>Hello dear,</h3> \n 
    Your account has been created successfully. You can login to the account by visiting: ${link} and using: \n
    Email: ${newCoordinator.email} \n
    Password: ${password}\n\n
    Thanks.`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }

    sendEmail(data);
    return res.json(success("Account created successfully", newCoordinator, res.statusCode ));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const login = async (req, res) => {
  try {
    const Coordinator = await getModelByChurch("hostdatabase", "Coordinator", zonalCoordinatorSchema);
    const isCoordinator = await Coordinator.findOne({ email: req.body.email });
    if (!isCoordinator) return res.status(404).json(error("User does not exist", res.statusCode));
    const passwordMatched = bcrypt.compareSync(req.body.password, isCoordinator.password);
    if (!passwordMatched) return res.status(400).json(error("Password did not match", res.statusCode));
    const { email, first_name, last_name, phone, _id, role } = isCoordinator;
    const token = jwt.sign({ _id, email, role }, process.env.SECRET_KEY, { expiresIn: "1days"});
    res.cookie("token", `Bearer ${token}`, { expires: new Date(new Date() + 64800000)});
    return res.header("authorization", `Bearer ${token}`).json(success("Login success", { token, user: { email, first_name, role, last_name, phone, _id }}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const coordinatore_list = async (req, res) => {
  const { offset, limit } = pagination(req.query);
  try {
    const Coordinator = await getModelByChurch("hostdatabase", "Coordinator", zonalCoordinatorSchema);
    const coordinators = await Coordinator.paginate({}, { offset, limit });

    return res.json(success("Success", coordinators, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const assign_churches = async (req, res) => {
  const { church, coordinatorId } = req.query;
  try {
    const Coordinator = await getModelByChurch("hostdatabase", "Coordinator", zonalCoordinatorSchema);
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);

    let church_details = await Church.findById({ _id: church });

    const data = {
      _id: church_details._id,
      branch: church_details.branch,
    }

    const coordinator = await Coordinator.findByIdAndUpdate({ _id: coordinatorId }, { $push: { churches: data }}, { new: true });

    if (!coordinator) return res.status(404).json(error("Coordinator not found", res.statusCode));

    const church_data = {
      first_name: coordinator && coordinator.first_name,
      last_name: coordinator && coordinator.last_name,
      email: coordinator && coordinator.email,
      phone: coordinator && coordinator.phone,
      _id: coordinator && coordinator._id,
    }

    church_details.coordinator = church_data;
    church_details = await church_details.save();
    return res.json(success("Success", coordinator, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const update_coordinator = async (req, res) => {
  const { coordinatorId } = req.query;
  try {
    const Coordinator = await getModelByChurch("hostdatabase", Coordinator, zonalCoordinatorSchema);
    const coordinator = await Coordinator.findByIdAndUpdate({ _id: coordinatorId }, req.body, { new: true });
    return res.json(success("Success", coordinator, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_coordinator = async (req, res) => {
  const { coordinatorId } = req.query;
  try {
    const Coordinator = await getModelByChurch("hostdatabase", "Coordinator", zonalCoordinatorSchema);
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const coordinator = await Coordinator.findByIdAndDelete({ _id: coordinatorId });
    await Church.findOneAndUpdate({ "coordinator._id": coordinatorId }, { $set: { coordinator: null }}, { new: true });

    return res.json(success("Success", coordinator, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const coordinating_church_list = async (req, res) => {
  const { coordinatorId } = req.query;
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const church_list = await Church.find({ "coordinator._id": coordinatorId });

    return res.json(success("Success", church_list, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}