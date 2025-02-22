const social_linksSchema = require("../schema/social_links.schema");

const addSocial = async (req, res) => {
  try {
    const { ...data } = req.body;
    const social = await social_linksSchema.create({ ...req.body });
    req.user.user_socials.push(social._id);
    await req.user.save();

    return res.json({
      message: "Sizning ijtimoiy tarmoqingiz muvaffaqiyatli qo'shildi",
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const deleteSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const social = await social_linksSchema.findByIdAndDelete({ _id: id });

    const index = req.user.user_socials.findIndex(
      (socialsItem) => socialsItem.toString() === socialsItem._id.toString()
    );
    if (index !== -1) {
      req.user.user_socials.splice(index, 1);
      await req.user.save();
    }

    return res.json({
      message: "Ijtimoiy tarmoq muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const updatesocials = async (req, res) => {
  try {
    const { socialId } = req.params;
    const { ...data } = req.body;
    const socials = await social_linksSchema.findOne({ _id: socialId });
    if (socials) {
      const updatedsocials = await social_linksSchema.findOneAndUpdate(
        { _id: socialId },
        data
      );
      return res.json({ updatedsocials });
    } else {
      return res.json({
        message: "Bu ijtimoiy tarmoq mavjud emas",
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await social_linksSchema.find();
    return res.json({ socialLinks });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getOneSocialLink = async (req, res) => {
  try {
    const { id } = req.params;
    const socialLink = await social_linksSchema.findById(id);
    if (!socialLink) {
      return res.json({ message: "Ijtimoiy tarmoq havolasi topilmadi" });
    }
    return res.json({ socialLink });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
module.exports = {
  addSocial,
  deleteSocial,
  updatesocials,
  getSocialLinks,
  getOneSocialLink,
};
