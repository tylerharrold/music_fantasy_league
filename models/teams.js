var mongoose = require("mongoose");

var teamSchema = mongoose.Schema({
	teamName : String,
	owners	: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Owner"
		}
	]
});

module.exports = mongoose.model("Team" , teamSchema);
