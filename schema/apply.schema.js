const { Schema, model } = require("mongoose");

const applySchema = new Schema(
  {
    sender_name: {
      type: String,
      required: true,
    },

    sender_phone_number: {
      type: String,
      required: true,
    },
    sender_gmail: {
      type: String,
    },
    message_subject: {
      type: String,
      required: true,
      enum: {
        values: ["taklif", "tanqid", "shikoyat"],
      },
      default: "taklif",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("apply", applySchema);
