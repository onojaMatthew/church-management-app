import { error, success } from "../../config/response";
import {roleSchema } from "../../models/role";
import { getModelByChurch } from "../../utils/util";

export const createRole = async (req, res) => {
  try {
    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const isRole = await Role.findOne({ name: req.body.name });
    if (isRole) return res.status(400).json(error("Role already exists", res.statusCode));
    let newRole = new Role({ name: req.body.name });
    newRole = await newRole.save();
    return res.json(success("Role created successfully", newRole, res.statusCode));
  } catch (err) {
    console.log(err)
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode));
  }
}

export const fetchRoles = async (req, res) => {
  try {
    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const roles = await Role.find();
    return res.json(success("Success", roles, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode));
  }
}

export const fetchRole = async (req, res) => {
  const { roleId } = req.params;
  try {
    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const role = await Role.findById({ _id: roleId });
    if (!role) return res.json(success("No records found", role, res.statusCode));
    return res.json(success("Success", role, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode));
  }
}

export const updateRole = async (req, res) => {
  try {
    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    let role = await Role.findById({ _id: req.params.roleId });
    if (!role) return res.json(success("Role not found", role, res.statusCode));
    role.name = req.body.name;
    const updatedRole = await role.save()
    return res.json(success("Updated successfully", updatedRole, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode));
  }
}

export const deleteRole = async (req, res) => {
  try {
    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const role = await Role.findByIdAndRemove({ _id: req.params.roleId });
    if (!role) return res.status(404).json(error("Failed to delete role", res.statusCode));
    return res.json(success("Role deleted successfully", role, res.statusCode))
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode))
  }
}