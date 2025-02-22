const applySchema = require("../schema/apply.schema");

const sendMessage = async (req, res) => {
  try {
    const apply = await applySchema.create({ ...req.body });
    return res.json({ message: "Murojatingiz jonatildi" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getMessages = async (req, res) => {
  try {
    const allMessages = await applySchema.find();
    const sortedMessages = allMessages.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return res.json(sortedMessages);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getOneMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await applySchema.findById(id);
    if (message) {
      return res.json({ message });
    } else {
      return res.json({ message: "Bu message topilmadi" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
const deleteApply = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await applySchema.findByIdAndDelete({ _id: id });
    if (message) {
      return res.json({ message });
    } else {
      return res.json({ message: "Bu message topilmadi" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getByMessageSubject = async (req, res) => {
  try {
    const { message_subject } = req.query;
    const sameSubjectMessages = await applySchema.find({ message_subject });
    return res.json({ sameSubjectMessages });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = {
  sendMessage,
  getMessages,
  deleteApply,
  getByMessageSubject,
  getOneMessage,
};
