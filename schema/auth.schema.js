const { Schema, model } = require("mongoose");

const authSchema = new Schema(
  {
    username: {
      type: String,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "The password must be more then 6 characters"],
    },
    email: {
      type: String,
      required: true,
    },
    user_adverts: {
      type: Array,
      ref: "advert",
      default: [],
    },
    user_news: {
      type: Array,
      ref: "news",
      default: [],
    },
    user_ensiclopedies: {
      type: Array,
      ref: "ensiclopedy",
      default: [],
    },
    user_socials: {
      type: Array,
      ref: "social",
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Auth", authSchema);
