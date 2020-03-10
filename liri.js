require("dotenv").config();


var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

var command = process.argv[2];
var argument = process.argv.slice(3).join(" ");

start(command, argument);

function start(command, argument){
    switch(command){
        case "concert-this": concertThis(argument);
        break;
        case "spotify-this-song": spotifySong(argument);
        break;
        case "movie-this": getMovieInfo(argument);
        break;
        case "do-what-it-says": doWhatItSays();
        break;
        default: console.log("Wrong command Please do check it")
    }
}
function concertThis(artistName){
    var url = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    axios.get(url).then(
        function(res){
            console.log(res.data[0].venue);
            for (var i = 0; i < res.data.length; i++) {
               console.log("Venue Name: " + res.data[i].venue.name);
               console.log("Venue Region: " + res.data[i].venue.region);
               console.log("Venue Country: " + res.data[i].venue.country);
               console.log("Venue Date and Time: " + moment(res.data[i].datetime).format("MM/DD/YYYY A"));
            console.log("___________________________________")
            }
        }
    )

}
function spotifySong(songName){
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}