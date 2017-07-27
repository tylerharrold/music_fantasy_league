// require mongoose
var mongoose = require("mongoose");
var User = require("./models/users.js");
var Team = require("./models/teams.js");
var League = require("./models/leagues.js");

// array of users to add in
var userData = [
	{	username: "Tyler Harrold" , 
		passwd: "password"
	} ,
	{	username: "Cory Harrold" , 
		passwd: "aci"
	} ,
	{	username: "Rick Sanchez" , 
		passwd: "morty"
	}
],

teamData = [
	{
		teamName: "Whitepolypousthings"
	},
	{
		teamName: "Fuck Goodells"	
	},
	{
		teamName: "The Mortys"
	}
],

leagueData = [
	{
		leagueName: "Filthy Casuals"
	},
	{
		leagueName: "Nobody Cares"
	},
	{
		leagueName: " Test League"
	}
]

function seedDB(){
		// remove users, teams, and leagues
		Team.remove({} , function(err){
			if(err){
				console.log("error removing teams");
			}
			else{
				User.remove({} , function(err){
					if(err){
						console.log("error removing users");
					}
					else{
						League.remove({} , function(err){
							if(err){
								console.log("error removing leagues");
							}
							else{
								console.log("wiped db");
								// now we seed
								// loop to create users
								for(i = 0 ; i < userData.length ; i++){
									console.log("here our i is:" + i);
									User.create(userData[i] , function(err , user){
										if(err){
											console.log(err);
										}
										else{
											// create a team
											console.log(i);
											console.log(teamData);
											Team.create(teamData[i] , function(err , team){
												if(err){
													console.log(err);
												}
												else{
													console.log(team);
													// link our team and ownder
													user.teams.push(team);
													user.save();
													team.owners.push(user);
													team.save();
													// maybe print here
													console.log("created team");
													// create a league
													League.create(leagueData[i] , function(err , league){
														if(err){
															console.log(err);
														}
														else{
															// link our team, owner and league
															league.leagueTeams.push(team);
															league.save();
														}
													});

												}
											});
										}
									});
								}
							}
						});
					}
				});	
			}
		});
		
}
/*
function seedDB(){
	// remove all users
	Team.remove({} , function(err){
		if(err){
			console.log(err);
		}else{
			User.remove({} , function(err){
				if(err){
					console.log(err);
				}
				else{
					console.log("wiped db");
					// add some users
					data.forEach(function(seed){
						User.create(seed , function(err, user){
							if(err){
								console.log(err);
							}else{
								console.log("added user");
								// give a team to a user
								Team.create({
									teamName: "Test Team",
									owners: []		
								} , function(err , team){
									if(err){
										console.log(err);
									}else{
										user.teams.push(team);	
										user.save();
										console.log("added team");
										team.owners.push(user);
										team.save();
									}
															});
							}
						});
					});

				}// end else for wipe db of users
			}); // end user remove callback 
		} // end else for remove teams
	}); // end remove team callback
}// end seedDB function
*/
module.exports = seedDB;
