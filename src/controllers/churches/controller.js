import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../services/mailer";
import { churchSchema } from "../../models/church";
import { memberSchema } from "../../models/member";
import { officeSchema } from "../../models/office";
import { groupSchema } from "../../models/group";
import { zonalPastorSchema } from "../../models/zonal_pastor";
import { error, success } from "../../config/response";
import { roleSchema } from "../../models/role";
import { getModelByChurch } from "../../utils/util";
import { chartData } from "../../utils/computation";
import { pagination } from "../../middleware/pagination";
import { financeSchema } from "../../models/finance";
import { expenditureSchema } from "../../models/expenditure";
import { formatMoney } from "../../middleware/num_formatter";
import { residentPastorSchema } from "../../models/residence_pastor";
import { regionalPastorSchema } from "../../models/regional_pastor";

export const createChurch = async (req, res) => {
  const { 
    email, 
    city, 
    state, 
    street, 
    bank_name, 
    acct_no, 
    acct_name, 
    phone, 
    password, 
    role,
    branch,
    resident_pastor_id,
  } = req.body;

  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const ResidentPastor = await getModelByChurch("hostdatabase", "ResidentPastor", residentPastorSchema);
    const resident_pastor = await ResidentPastor.findById({ _id: resident_pastor_id });
    const head_pastor_name = {
      first_name: resident_pastor && resident_pastor.first_name, 
      last_name: resident_pastor && resident_pastor.last_name,
      email: resident_pastor && resident_pastor.email,
      phone: resident_pastor && resident_pastor.phone,
    }
      
    if (!resident_pastor) return res.status(404).json(error("Resident does not exist", res.statusCode));
    const roleData = await Role.findById({ _id: role });
    const isExists = await Church.findOne({ email });
    const subdomain_name = branch.split(" ").join("-");
    const subdomain_link = `${req.header('Origin')}/church-login`;
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
      subdomain_link,
      branch,
      head_pastor: head_pastor_name
    });

    church = await church.save();
    
    const receiver = church.email;
    const subject = "Account Creation";
    const message = `<h3>Hello dear,</h3> \n 
    Your church account has been created successfully. You can login to the account by visiting: ${subdomain_link} and using: \n
    Email: ${church.email} \n
    Password: ${password}\n\n
    Thanks.`;

    const data = {
      receiver,
      subject,
      message
    }

    await sendEmail(data);
    console.log(church)
    return res.json(success("Success", church, res.statusCode));
  } catch (err) {
    console.log
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const checkDomainName = async (req, res) => {
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const isExists = await Church.findOne({ subdomain_name: req.body.subdomain_name });
    if (!isExists) return res.status(404).json(error("Subdomain not found. Contact admin for assistance", res.statusCode));
    res.json(success("Success", isExists, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const churchLogin = async (req, res) => {
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const isChurch = await Church.findOne({$or: [{ email: req.body.email }, { phone: req.body.email }]});
    if (!isChurch) return res.status(404).json(error("This church account does not exist", res.statusCode));
    const passwordMatched = bcrypt.compareSync(req.body.password, isChurch.password);
    if (!passwordMatched) return res.status(400).json(error("Password did not match", res.statusCode));
    const { email, subdomain_name, phone, _id, role, zonal_pastor, regional_pastor } = isChurch;
    const token = jwt.sign({ _id, subdomain_name, email, role, }, process.env.SECRET_KEY, { expiresIn: "1days"});
    res.cookie("token", `Bearer ${token}`, { expires: new Date(new Date() + 64800000)});
    return res.header("authorization", `Bearer ${token}`).json(success("Login success", { token, church: { email, subdomain_name, role, phone, _id, zonal_pastor, regional_pastor }}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const churchList = async (req, res) => {
  const { offset, limit } = pagination(req.query);
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const churchList = await Church.paginate({}, { offset, limit, sort: { createdAt: -1 } });
    if (!churchList) return res.json(success("No records found", churchList, res.statusCode))
    return res.json(success("Success", churchList, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const allChurches = async (req, res) => {
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const churchList = await Church.find({}).sort({ createdAt: -1 });
    if (!churchList) return res.json(success("No records found", churchList, res.statusCode))
    return res.json(success("Success", churchList, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const churchDetails = async (req, res) => {
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const church = await Church.findById({ _id: req.params.churchId });
    if (!church) return res.json(success("Record not found", church, res.statusCode));
    return res.json(success("Success", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateChurch = async (req, res) => {
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const church = await Church.findByIdAndUpdate({ _id: req.params.churchId }, req.body);
    return res.json(success("Updated", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteChurch = async (req, res) => {
  try {
    const ZonalPastor = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const RegionalPastor = await getModelByChurch("hostdatabase", "RegionalPastor", regionalPastorSchema);
    let regionalPastor = await RegionalPastor.find({});
    let zonalPastor = await ZonalPastor.find({});
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const church = await Church.findByIdAndRemove({ _id: req.query.church });
    for (let region_pastor of regionalPastor) {
      region_pastor.churches.splice(region_pastor.churches[church._id], 1);
      await region_pastor.save();
    }

    for (let zone_pastor of zonalPastor) {
      zone_pastor.churches.splice(zone_pastor.churches[church._id], 1);
      await zone_pastor.save();
    }
    return res.json(success("Church account deleted", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const dashboardData = async (req, res) => {
  const { church } = req.query;
  try {
    let groupObj = {};
    let officeObj = {};
    let memberObj = {};
    let incomeObj = {};
    let expenditureObj = {};

    let incomeArr = [];
    let expensesArr = [];
    
    const Group = await getModelByChurch( church, "Group", groupSchema);
    const Office = await getModelByChurch( church, "Office", officeSchema);
    const Member = await getModelByChurch( church, "Member", memberSchema);
    const Income = await getModelByChurch(church, "Finance", financeSchema);
    const Expenditure = await getModelByChurch(church, "Expenditure", expenditureSchema);

    const church_expenses = await Expenditure.find({});
    const church_income = await Income.find({});

    for (let i = 0; i < church_expenses.length; i++) {
      const current_exp = church_expenses[i];
      expensesArr.push(current_exp.cost);
    }

    for (let i = 0; i < church_income.length; i++) {
      const current_exp = church_income[i];
      incomeArr.push(current_exp.amount);
    }

    let group = await Group.find({});
    groupObj["totalGroup"] = group.length;

    let office = await Office.find({});
    officeObj["totalOffice"] = office.length;

    let members = await Member.find({});

    memberObj["totalMember"] = members.length;

    const adult_members = members && members.filter(m => m.membershipGroup === "adult").length;
    const children_members = members && members.filter(m => m.membershipGroup === "children").length;
    const male_members = members && members.filter(m => m.sex === "male");
    const female_members = members && members.filter(m => m.sex === "female");
    const chart_data = chartData({ male_members, female_members });

    expenditureObj["totalExpenditure"] = formatMoney(expensesArr.reduce((a,b) => a + b, 0));
    incomeObj["totalIncome"] = formatMoney(incomeArr.reduce((a,b) => a + b, 0));

    const result = { children_members, adult_members, incomeObj, expenditureObj, groupObj, memberObj, officeObj, chart_data, maleMembers: male_members.length, femaleMembers: female_members.length };

    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const searchChurch = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const searchResult = await Church.aggregate([{ $match: {
      $or: [
        { subdomain_name: {
            $regex: searchTerm,
            $options: "i"
          }
        },
          { branch: {
            $regex: searchTerm,
            $options: "i"
          }
        },
        { 
          email: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          phone: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          state: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          head_pastor: {
            $regex: searchTerm,
            $options: "i"
          },
        }
      ]
    }}]).sort({ createdAt: -1 });

    return res.json(success("Success", searchResult, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode))
  }
}

export const church_filter = async (req, res) => {
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

    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const church = await Church.find({ createdAt: { $gte: date_ago }}).sort({ createdAt: -1 });
    return res.json(success("Success", church, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const adminData = async (req, res) => {
  try {
    let incomeObj = {};
    let expenditureObj = {};
    let coordinatorObj = {};
    let memberObj = {};
    let members = [];
    let income = [];
    let expenditure = [];
    let income_arr = [];
    let expenditure_arr = [];
    let churchObj = {};

    const Church = await getModelByChurch( "hostdatabase", "Church", churchSchema);    

    let churches = await Church.find({});

    const Coordinator = await getModelByChurch("hostdatabase", "ZonalPastor", zonalPastorSchema);
    const coordinators = await Coordinator.find({});

    if (churches.length > 0) {
      for (let church of churches) {
        const id = church && church._id;
        const Member = await getModelByChurch( id, "Member", memberSchema);
        const Income = await getModelByChurch(id, "Finance", financeSchema);
        const Expenditure = await getModelByChurch(id, "Expenditure", expenditureSchema);
        const church_expenses = await Expenditure.find({});
        const church_members = await Member.find({});
        const church_income = await Income.find({});
        if (church_members) members.push(church_members);
        if (church_income) income.push(church_income);
        if (church_expenses) expenditure.push(church_expenses);
      }
    }

    const flattened_income = income.flat();
    const flattened_expenses = expenditure.flat();
    flattened_income.forEach(i => {
      income_arr.push(i.amount);
    });

    flattened_expenses.forEach(e => {
      expenditure_arr.push(e.cost);
    });
    
    incomeObj["totalIncome"] = formatMoney(income_arr.reduce((a,b) => a + b, 0));
    expenditureObj["totalExpenses"] = formatMoney(expenditure_arr.reduce((a,b) => a + b, 0));
    const flattened_members = members.flat();
    if (coordinators) coordinatorObj["totalCoordinator"] = coordinators && coordinators.length;

    memberObj["totalMember"] = flattened_members.length;
    churchObj["totalChurch"] = churches && churches.length;
    const male_members = flattened_members && flattened_members.filter(m => m.sex === "male");
    const female_members = flattened_members && flattened_members.filter(m => m.sex === "female");
    const chart_data = chartData({ male_members, female_members });
    const result = { coordinatorObj, expenditureObj, incomeObj, memberObj, chart_data, churchObj };

    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

// @desc Recover Password - Generates token and Sends password reset email
// @access Public
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    let church = await Church.findOne({ email });
    if (!church) return res.status(404).json(error(`We could not find any account with the email ${email}`));
    church.resetPasswordToken = jwt.sign({ firstName: church.firstName }, process.env.SECRET_KEY, { expiresIn: "120m" });
    church.resetPasswordExpires = Date.now() + 3600000;

    church = await church.save();
    let link = `${req.header('Origin')}/church_reset_password/${church.resetPasswordToken}`
    const receiver = church.email;
    const sender = "no-reply@mail.com";
    const subject = "Password change request";
    const message = `<p><strong>Hi ${church.first_name}</strong></p>
    <p>You sent a password reset request. Please click on the following link ${link} to reset your password.</p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }

    await sendEmail(data);
    return res.json(success("A password reset email was sent to you", {}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Server Error. Please try again", res.statusCode));
  }
};


// @route POST api/auth/reset
// @desc Reset Password
// @access Public
export const resetPassword = async (req, res) => {
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    let church = await Church.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: {$gt: Date.now()} });
    if (!church) return res.status(401).json(error("Invalid password reset token or token has expired", res.statusCode));
    const hash = bcrypt.hashSync(req.body.password, 12);
    church.password = hash;
    church.resetPasswordToken = undefined;
    church.resetPasswordExpires = undefined;
    const result = await church.save();
    if (!result) return res.status(400).json(error("Failed to update password. Try again", res.statusCode));
    const receiver = church.email;
    const sender = "no-reply@mail.com";
    const subject = "Password reset confirmation";
    const message = `<p><strong>Hi ${church.first_name}</strong></p>
    <p>This is a confirmation that the password for your account ${church.email} has just been changed.</p>`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }

    await sendEmail(data);
    return res.json(success("Your password has been changed successfully"))
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after some time", res.statusCode));
  }
};