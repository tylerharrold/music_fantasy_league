var mongoose = require("mongoose");

var leagueSchema = mongoose.Schema({
	leagueName : String,
	leagueTeams: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Team"
		}	
	],
});

module.exports = mongoose.model("League" , leagueSchema);
