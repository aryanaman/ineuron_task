var mongoose = require("mongoose");
var newSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("ineutrondatas", newSchema);
