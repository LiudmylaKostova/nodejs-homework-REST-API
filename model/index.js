const Contacts = require("./schemas/contact");

const listContacts = async (userId, query) => {
  const {
    limit = 5,
    offset = 0,
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
  } = query;
  const optionsSearch = { owner: userId };
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }
  // const results = await Contacts.find({ owner: userId }).populate({
  //   path: "owner",
  //   select: "name email",
  // });
  const results = await Contacts.paginate(optionsSearch, {
    limit,
    offset,
    select: filter ? filter.split("|").join(" ") : "",
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
  });
  const { docs: contacts, totalDocs: total } = results;
  return { contacts, total, limit, offset };
};

const getContactById = async (userId, id) => {
  const result = await Contacts.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "name email",
  });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await Contacts.findByIdAndRemove({ _id: id, owner: userId });
  return result;
};

const addContact = async (body) => {
  const result = await Contacts.create(body);
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    {
      _id: id,
      owner: userId,
    },
    { ...body },
    { new: true }
  );

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
