const { Schema, model } = require("mongoose");

const socialSchema = new Schema(
  {
    type_of_social: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Socials", socialSchema);
