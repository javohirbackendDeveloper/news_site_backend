const ensiclopedySchema = require("../schema/ensiclopedy.schema");

const createEnsiclopedy = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log({ title, description });

    const findExistOne = await ensiclopedySchema.findOne({ title });
    if (findExistOne) {
      return res.json({
        message: "Bu ensiklopediya allaqachon mavjud",
        findExistOne,
      });
    }

    const ensic = await ensiclopedySchema.create({ title, description });

    req.user.user_ensiclopedies.push(ensic._id);
    await req.user.save();

    return res.json({ message: "Successfully created" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const updatedEnsic = async (req, res) => {
  try {
    const { ensicId } = req.params;
    const { ...data } = req.body;
    const ensiclopediy = await ensiclopedySchema.findOne({ _id: ensicId });
    if (ensiclopediy) {
      const updatedEnsic = await ensiclopedySchema.findOneAndUpdate(
        { _id: ensicId },
        data
      );
      return res.json({ updatedEnsic });
    } else {
      return res.json({
        message: "Bu ensiklopediya mavjud emas",
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const deleteEnsics = async (req, res) => {
  try {
    const { ensicId } = req.params;
    const ensiclopediy = await ensiclopedySchema.findById(ensicId);
    if (ensiclopediy) {
      await ensiclopedySchema.findByIdAndDelete(ensicId);

      const index = req.user.user_ensiclopedies.findIndex(
        (item) => item.toString() === ensiclopediy._id.toString()
      );
      if (index !== -1) {
        req.user.user_ensiclopedies.splice(index, 1);
        await req.user.save();
      }

      return res.json({
        message: "Ensiclopediy successfully deleted",
        ensiclopediy,
      });
    } else {
      return res.json({
        message: "Bu mahsulot mavjud emas",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Xato", error: error.message });
  }
};

const getRandomEnsiclopedies = async (req, res) => {
  try {
    const allEnsic = await ensiclopedySchema.find();
    const sortedEnsic = allEnsic.sort((a, b) => {
      b.createdAt - a.createdAt;
    });

    let ensiclopediy = [];
    const limit = 10;
    if (sortedEnsic.length > limit) {
      let randomNumbers = [];

      while (randomNumbers.length < limit) {
        const randomNum = Math.floor(Math.random() * sortedEnsic.length);

        if (!randomNumbers.includes(randomNum)) {
          randomNumbers.push(randomNum);
        }
      }

      for (let i = 0; i < randomNumbers.length; i++) {
        ensiclopediy.push(sortedEnsic[randomNumbers[i]]);
      }
    } else {
      ensiclopediy = sortedEnsic;
    }

    res.json({ ensiclopediy });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getOneEnsic = async (req, res) => {
  try {
    const { id } = req.params;
    const ensiclopediy = await ensiclopedySchema.findOne({ _id: id });
    return res.json({ ensiclopediy });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getByCharacter = async (req, res) => {
  try {
    const { character } = req.query;
    const ensiclopedy = await ensiclopedySchema.find();

    const ensiclopedies = ensiclopedy.filter((item) => {
      const title = item.title.trim().toLowerCase();
      const res = title.startsWith(character.trim().toLowerCase());

      return title.startsWith(character.trim().toLowerCase());
    });

    if (ensiclopedies.length <= 0) {
      return res.json({ message: "Bu harfga ensiklopediya topilmadi" });
    }

    const sortedEnsiclopedies = ensiclopedies.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    return res.json({ ensiclopedies: sortedEnsiclopedies });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = {
  createEnsiclopedy,
  getRandomEnsiclopedies,
  updatedEnsic,
  deleteEnsics,
  getOneEnsic,
  getByCharacter,
};
