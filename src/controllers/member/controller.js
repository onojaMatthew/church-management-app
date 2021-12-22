import { error, success } from "../../config/response";
import { memberSchema } from "../../models/member";
import { membershipCategorySchema } from "../../models/membership_category";
import { churchSchema } from "../../models/church";
import { getModelByChurch } from "../../utils/util";
import { pagination } from "../../middleware/pagination";

export const createMember = async (req, res) => {
  const { church } = req.body;
  try {
    const Member = await getModelByChurch(church, "Member", memberSchema);
    const MembershipCategory = await getModelByChurch(church, "MembershipCategory", membershipCategorySchema)
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const membershipCategory = await MembershipCategory.findById({ _id: req.body.category });
    const isExists = await Member.aggregate([{ $match: { $or: [{ email: req.body.email }, { phone: req.body.phone }]}}]);
    if (isExists[0]) return res.status(400).json(error("Member alreay exists", res.statusCode));
    let newMember = new Member();
    newMember.first_name = req.body.first_name;
    newMember.last_name = req.body.last_name;
    newMember.email = req.body.email;
    newMember.phone = req.body.phone;
    newMember.address.city = req.body.city;
    newMember.address.state = req.body.state;
    newMember.address.street = req.body.street;
    newMember.state_of_origin = req.body.state_of_origin;
    newMember.occupation = req.body.occupation;
    newMember.church = req.body.church;
    newMember.category = req.body.category;
    newMember.marital_status = req.body.marital_status;
    newMember.dob = req.body.dob;
    newMember.sex = req.body.sex;
    newMember.membershipCategory = membershipCategory.name;
    
    const response = await newMember.save();

    await Church.findByIdAndUpdate({ _id: church }, { $push: { members: response._id }}, { new: true})
    return res.json(success("Member successfully created", response, res.statusCode));
  } catch (err) {
    console.log(err)
    return res.status(400).json(error(err.message), res.statusCode);
  }
}

export const getMembers = async (req, res) => {
  const { limit, offset } = pagination(req.query);
  const { church } = req.params;
  try {
    const Member = await getModelByChurch(church, "Member", memberSchema);
    const members = await Member.paginate({}, { limit, offset });
    if (!members) return res.json(success("No records found", members, res.statusCode));
    return res.json(success("Success", members, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const memberDetails = async (req, res) => {
  const { church, member } = req.params;
  try {
    const Member = await getModelByChurch(church, "Member", memberSchema);
    let isMember = await Member.findById({ _id: member }).populate("category").populate("office");
    if (!isMember) return res.status(404).json(success("Member does not exist", isMember, res.statusCode));
    return res.json(success("Success", isMember, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteMember = async (req, res) => {
  const { church, memberId } = req.params;
  try {
    const Member = await getModelByChurch(church, "Member", memberSchema);
    const member = await Member.findByIdAndRemove({ _id: memberId });
    return res.json(success("Success", member, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateMember = async (req, res) => {
  const { church, member } = req.params;
  try {
    const Member = await getModelByChurch(church, "Member", memberSchema);
    let result = await Member.findByIdAndUpdate({ _id: member }, req.body, { new: true }); 
    
    return res.json(success("Operation success", result, res.statusCode));
  } catch (err) {
    res.status(400).json(error(err.message, res.statusCode));
  }
}

export const assignOffice = async (req, res) => {
  const { church, member, office } = req.body;
  try {
    const Church = await getModelByChurch("hostdatabase", "Church", churchSchema);
    const church = await Church.findById({ _id: church });
    const Member = await getModelByChurch(church, "Member", memberSchema);
    let isMember = await Member.findById({ _id: member });
    if (!church) return res.json(error("Church account does not exist", res.statusCode));
    if (!isMember) return res.status(404).json(error("Member does not exist in the database", res.statusCode));
    isMember.office = office;
    const result = await isMember.save();
    return res.json(success("Operation successfull", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const searchMember = async (req, res) => {
  const { searchTerm, church } = req.query;

  try {
    const Member = await getModelByChurch(church, "Member", memberSchema);
    const searchResult = await Member.aggregate([{ $match: {
      $or: [
        { first_name: {
            $regex: searchTerm,
            $options: "i"
          }
        },
          { last_name: {
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
          state_of_origin: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          sex: {
            $regex: searchTerm,
            $options: "i"
          },
        },
        { 
          occupation: {
            $regex: searchTerm,
            $options: "i"
          },
        }
      ]
    }}]);

    return res.json(success("Success", searchResult, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode))
  }
}