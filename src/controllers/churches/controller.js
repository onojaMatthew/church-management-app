import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../services/mailer";
import { churchSchema } from "../../models/church";
import { memberSchema } from "../../models/member";
import { officeSchema } from "../../models/office";
import { groupSchema } from "../../models/group";
import { zonalCoordinatorSchema } from "../../models/zonal_coordinator";
import { error, success } from "../../config/response";
import { roleSchema } from "../../models/role";
import { getModelByChurch } from "../../utils/util";
import { chartData } from "../../utils/computation";
import { pagination } from "../../middleware/pagination";
import { financeSchema } from "../../models/finance";
import { expenditureSchema } from "../../models/expenditure";
import { formatMoney } from "../../middleware/num_formatter";

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
    head_pastor,
  } = req.body;

  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const Role = await getModelByChurch("hostdatabase", "Role", roleSchema);
    const roleData = await Role.findById({ _id: role });
    const isExists = await Church.findOne({ email });
    const subdomain_name = branch.split(" ").join("-");
    const subdomain_link = `https://${req.hostname}/church-login`;
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
      head_pastor
    });

    church = await church.save();
    
    const receiver = church.email;
    const sender = "onoja.matthew@ojirehprime.com";
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
    const isChurch = await Church.findOne({ email: req.body.email });
    if (!isChurch) return res.status(404).json(error("This church account does not exist", res.statusCode));
    const passwordMatched = bcrypt.compareSync(req.body.password, isChurch.password);
    if (!passwordMatched) return res.status(400).json(error("Password did not match", res.statusCode));
    const { email, subdomain_name, phone, _id, role, coordinator } = isChurch;
    const token = jwt.sign({ _id, subdomain_name, email, role, }, process.env.SECRET_KEY, { expiresIn: "1days"});
    res.cookie("token", `Bearer ${token}`, { expires: new Date(new Date() + 64800000)});
    return res.header("authorization", `Bearer ${token}`).json(success("Login success", { token, church: { email, subdomain_name, role, phone, _id, coordinator }}, res.statusCode));
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
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const church = await Church.findByIdAndRemove({ _id: req.query.church });
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
    
    const Group = await getModelByChurch( church, "Group", groupSchema);
    const Office = await getModelByChurch( church, "Office", officeSchema);
    const Member = await getModelByChurch( church, "Member", memberSchema);

    let group = await Group.find({});
    groupObj["totalGroup"] = group.length;

    let office = await Office.find({});
    officeObj["totalOffice"] = office.length;

    let members = await Member.find({});
    memberObj["totalMember"] = members.length;
    const male_members = members && members.filter(m => m.sex === "male");
    const female_members = members && members.filter(m => m.sex === "female");
    const chart_data = chartData({ male_members, female_members });
    const result = { groupObj, memberObj, officeObj, chart_data };

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

    const Coordinator = await getModelByChurch("hostdatabase", "Coordinator", zonalCoordinatorSchema);
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