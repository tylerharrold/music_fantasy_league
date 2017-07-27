// require mongoose
var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	username : String,
	passwd	: String,
	teams	: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Team"
		}
	]
				

});

module.exports = mongoose.model("User" , userSchema);

