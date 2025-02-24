const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = async () => {
  try {
    const connecter = await mongoose.connect(
      "mongodb+srv://javohirabdusharipov676:iW6qTLpz39kwoxCV@cluster0.6apzw.mongodb.net/"
    );
    if (connecter) {
      console.log("Connected");
    } else {
      console.log("");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDB;
