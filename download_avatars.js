var request = require('request');
var token = require('./secrets').GITHUB_TOKEN;
var fs = require('fs');

var firstArg = process.argv[2];

var secondArg = process.argv[3];


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'Token '+ token
    }
  };


  request(options, function(err, res, body) {
    var parsedBody = JSON.parse(body);
    cb(err, parsedBody);

    for (var i = 0; i < parsedBody.length; i++) {
      var avatarurl = parsedBody[i].avatar_url;
      var login = parsedBody[i].login
      console.log("Login: " + login);
      console.log("Avatar URL: " + avatarurl);
      downloadImageByURL(avatarurl, "avatar/" + login + ".jpg")
    }
  });
}


getRepoContributors(firstArg, secondArg, function(err, result) {
  console.log("Errors:", err);
});


function downloadImageByURL(url, filePath) {

request.get(url)

  .on('error', function (err) {
    throw err;
  })


  .pipe(fs.createWriteStream(filePath));

}


