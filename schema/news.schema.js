const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
  {
    title: {
      type: String,
    },

    image: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      default: "oddiy",
      enum: {
        values: ["dolzarb", "oddiy"],
        message: "{VALUE} mavjud emas",
      },
    },
    category: {
      type: String,
      enum: {
        values: [
          "Sud-huquq",
          "ijtimoiy_iqtisodiy",
          "talim",
          "siyosat",
          "xorij",
        ],
      },
    },
    watched: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("News", newsSchema);
