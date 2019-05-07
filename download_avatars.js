var request = require('request');
var token = require('./secrets').GITHUB_TOKEN;

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
      console.log("Avatar URL: " + parsedBody[i].avatar_url);
    }
  });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  // console.log(result[0].avatar_url);
});
