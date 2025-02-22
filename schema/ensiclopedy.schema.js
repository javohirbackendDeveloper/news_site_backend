const { Schema, model } = require("mongoose");

const ensiclopedySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Ensiclopedies", ensiclopedySchema);
