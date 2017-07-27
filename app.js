var express = require("express");
var app = express();
var request = require("request");
var clientData = require("./clientData.js");
var mongoose = require("mongoose");
var seedDB = require("./seeds.js");

// connect to our database
mongoose.connect("mongodb://localhost/music_fantasy_league"); 

// seed our db
seedDB();

// load our schemas

// FOR TESTING - seed our database


// set the view engine to ejs
app.set("view engine" , "ejs");

var authorizationCode;


app.get("/" , function(req , res){
	res.render("home" , {connection: clientData});
});

app.get("/callback" , function(req , res){
	// store authorization code returned from spotify login services
	authorizationCode = req.query.code;

	// prepare for post call to exchange authorization for refresh and access tokens
	// authOptions specified from spotify authorization documentation
	// i.e. this is the info we need to pass to request for a post
	// to spotify
	var authOptions = {
		url: "https://accounts.spotify.com/api/token",
		form:{
			code: authorizationCode,
			grant_type: "authorization_code",
			redirect_uri: clientData.redirectURI
		},
		headers:{
			"Authorization":"Basic " + (new Buffer(clientData.clientID + ":" + clientData.clientSecret).toString("base64"))
		},
		json: true

	};	
	// Now we can use request to make our post request
	request.post(authOptions , function(err , response , body){
		if(!err && response.statusCode == 200){
			var access_token = body.access_token,
				refresh_token = body.refresh_token;	
			// these are our options for the actual api call
			var options = {
				url: "https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj",
				headers: {"Authorization" : "Bearer " + access_token},
				json:true
			};

			// make api call
			request.get(options , function(error, response, body){
				res.send(body);
			});
		} else{
			res.send("failure wah wah");
		}
	});
});

app.get("/test" , function(req , res){
	res.send("got back with dat data");
});

app.get("/redirect_test" , function(req, res){
	res.send("redirect test...");
});

app.listen(8000 , function(){
	console.log("listening...");
});
