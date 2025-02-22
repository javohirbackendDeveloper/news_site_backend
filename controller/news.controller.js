const cloudinary = require("../libraries/cloudinary");
const newsSchema = require("../schema/news.schema");

// CREATING NEW FOR ADMIN

const createNews = async (req, res) => {
  try {
    const { image, ...data } = req.body;

    let cloudinary_response = null;
    if (image) {
      cloudinary_response = await cloudinary.uploader.upload(image, {
        folder: "news",
      });
    }

    const news = await newsSchema.create({
      ...req.body,
      image: cloudinary_response.secure_url || "",
    });

    req.user.user_news.push(news?._id);
    await req.user.save();

    return res.json({ message: "Added successfully", news });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getRelevantNews = async (req, res) => {
  try {
    const allRelevantNews = await newsSchema.find({ type: "dolzarb" });
    const news = allRelevantNews.sort((a, b) => {
      b.createdAt - a.createdAt;
    });
    return res.json({ news });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
// CALCULATING WATCHED NUMBER

const viewsFunction = async (newId) => {
  try {
    const news = await newsSchema.findByIdAndUpdate(newId, {
      $inc: { watched: 1 },
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// GETTING ALL NEWS

const getNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.limit) || 2;

    const allNews = await newsSchema
      .find()
      .sort({ createdAt: +1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalNews = await newsSchema.countDocuments();

    res.json({
      news: allNews,
      currentPage: page,
      totalPages: Math.ceil(totalNews / perPage),
      totalNews,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Xatolik yuz berdi", message: error.message });
  }
};

// DELETING NEW

const deleteNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const news = await newsSchema.findById(newsId);
    if (news) {
      await newsSchema.findByIdAndDelete(newsId);

      const index = req.user.user_news.findIndex(
        (newsItem) => newsItem.toString() === news._id.toString()
      );
      if (index !== -1) {
        req.user.user_news.splice(index, 1);
        await req.user.save();
      }

      return res.json({ message: "News successfully deleted", news });
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

// UPDATING ONE NEW
const updateNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const { ...data } = req.body;
    const news = await newsSchema.findOne({ _id: newsId });
    if (news) {
      const updatedNews = await newsSchema.findOneAndUpdate(
        { _id: newsId },
        data
      );
      return res.json({ updatedNews });
    } else {
      return res.json({
        message: "Bu mahsulot mavjud emas",
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// FILTERING NEWS BY THEIR CATEGORY

const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const allNews = await newsSchema.find({ category });
    const news = allNews.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return res.json({ news });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// GET THE MOST WATCHED NEWS

const getMostWatchedNews = async (req, res) => {
  try {
    const allNews = await newsSchema.find();
    const sortedByWatchedNews = allNews.sort((a, b) => {
      return b.watched - a.watched;
    });

    const news = sortedByWatchedNews.sort((a, b) => {
      return parseInt(a.watched) - parseInt(a.watched);
    });

    return res.json({ news });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// GETTING ONE NEW BY ID

const getOneNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const news = await newsSchema.findOne({ _id: newsId });
    await viewsFunction(newsId);

    return res.json({ news });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// SEARCHING NEWS BY THEIR DESCRIPTION AND CATEGORY

const searchNews = async (req, res) => {
  try {
    const { searching_item } = req.query;
    console.log(searching_item);

    const news = await newsSchema.find({
      $or: [
        { description: { $regex: `${searching_item}`, $options: "i" } },
        { category: { $regex: `${searching_item}`, $options: "i" } },
      ],
    });
    return res.json(news);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = {
  createNews,
  getNews,
  deleteNews,
  updateNews,
  getNewsByCategory,
  getMostWatchedNews,
  getOneNews,
  searchNews,
  getRelevantNews,
};
