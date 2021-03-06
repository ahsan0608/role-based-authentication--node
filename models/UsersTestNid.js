const { Schema, model } = require("mongoose");

const UserTestNidSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      NidNum: {
        type: String,
        required: true,
      },
      NidIssuer: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("usersTestNid", UserTestNidSchema);
