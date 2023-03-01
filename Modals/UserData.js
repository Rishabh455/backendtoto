const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  iconurl: {
    type: String,
    required: true,
  },
  siteurl: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", UserDataSchema);
