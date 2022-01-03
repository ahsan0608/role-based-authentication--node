const mongoose = require("mongoose");

const IdSchema = new mongoose.Schema(
  {
    Photo: {
      type: String,
      required: true,
    },
    Color: {
      type: String,
      required: true,
    },
  },
  { discriminatorKey: "kind" }
);

const EmployeeId = mongoose.model("EmployeeId", IdSchema);

const NidSchema = EmployeeId.discriminator(
  "nid",
  new mongoose.Schema({
    NidNum: {
      type: String,
      required: true,
    },
    NidIssuer: {
      type: String,
      required: true,
    },
  })
);

const BidSchema = EmployeeId.discriminator(
  "bid",
  new mongoose.Schema({
    BidNum: {
      type: String,
      required: true,
    },
    BirthDate: {
      type: String,
      required: true,
    },
    BirthPlace: {
      type: String,
      required: true,
    },
  })
);

module.exports = mongoose.model("nid", NidSchema);
module.exports = mongoose.model("bid", BidSchema);

module.exports = IdSchema;
