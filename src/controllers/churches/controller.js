import bcrypt from "bcrypt";
import { sendEmail } from "../../services/mailer";
import { Church } from "../../models/church";
import { error, success } from "../../config/response";
import Role from "../../models/role";

export const createChurch = async (req, res) => {
  const { email, city, state, street, bank_name, acct_no, acct_name, phone, password, role } = req.body;
  try {
    const roleData = await Role.findById({ _id: role });
    const isExists = await Church.findOne({ email });
    const subdomain_name = email.split("@")[0];
    const subdomain_link = `https://${subdomain_name}.${req.hostname}/`;
    if (isExists) return res.status(400).json(error("Church already exists", res.statusCode));
    const hash = bcrypt.hashSync(password, 15);
    let church = new Church({ 
      email, 
      "address.city": city,
      "address.state": state,
      "address.street": street,
      "bank.bank_name": bank_name,
      "bank.acct_no": acct_no,
      "bank.acct_name": acct_name,
      "role.role_id": role,
      "role.role_name": roleData && roleData.name,
      phone,
      password: hash,
      subdomain_name,
      subdomain_lnk,
    });

    church = await church.save();
    
    const receiver = church.email;
    const sender = "onoja.matthew@giglogistics.ng";
    const subject = "Account Creation";
    const message = `<h3>Hello dear,</h3> \n 
    Your church account has been created successfully. You can login to the account by visiting: ${subdomain_link} and using: \n
    Email: ${church.email} \n
    Password: ${password}\n\n
    Thanks.`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }

    await sendEmail(data);
    return res.json(success("Success", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const checkDomainName = async (req, res) => {
  try {
    const isExists = await Church.findOne({ subdomain_name: req.body.subdomain_name });
    if (!isExists) return res.status(404).json(error("Subdomain not found. Contact admin for assistance", res.statusCode));
    res.redirect()
  } catch (err) {
    
  }
}

export const churchLogin = async (req, res) => {
  try {
    const isChurch = await Church.findOne({ email: req.body.email });
    if (!isChurch) return res.status(404).json(error("This church account does not exist", res.statusCode));
    const passwordMatched = bcrypt.compareSync(req.body.password, isChurch.password);
    if (!passwordMatched) return res.status(400).json(error("Password did not match", res.statusCode));
    const { email, subdomain_name, phone, _id, role } = isChurch;
    const token = jwt.sign({ _id, subdomain_name, email, role }, process.env.SECRET_KEY, { expiresIn: "1days"});
    res.cookie("token", `Bearer ${token}`, { expires: new Date(new Date() + 64800000)});
    return res.header("authorization", `Bearer ${token}`).json(success("Login success", { token, church: { email, subdomain_name, role, phone, _id }}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Please try again", res.statusCode));
  }
}

export const churchList = async (req, res) => {
  try {
    const churchList = await Church.find({});
    return res.json(success("Success", churchList, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const churchDetails = async (req, res) => {
  try {
    const church = await Church.findById({ _id: req.params.churchId }).populate("office").populate("officers").populate("memebers");
    if (!church) return res.json(success("Record not found", church, res.statusCode));
    return res.json(success("Success", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const updateChurch = async (req, res) => {
  try {
    const church = await Church.findByIdAndUpdate({ _id: req.params.churchId }, req.body);
    return res.json(success("Updated", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}

export const deleteChurch = async (req, res) => {
  try {
    const church = await Church.findByIdAndRemove({ _id: req.params.churchId });
    return res.json(success("Church account deleted", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Unknown Error. Please check your connection and try again", res.statusCode));
  }
}