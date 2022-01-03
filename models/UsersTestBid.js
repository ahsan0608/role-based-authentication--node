const { Schema, model } = require("mongoose");

const UserTestBidSchema = new Schema(
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
      BidNum: {
        type: String,
        required: true,
      },
      BidDate: {
        type: String,
        required: true,
      },
      BidIssuer: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("usersTestBid", UserTestBidSchema);
