var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

// console.log('Welcome to the GitHub Avatar Downloader!');
var repo = process.argv.slice(2)[1]
var owner = process.argv.slice(2)[0]

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var body = JSON.parse(body)

    cb(err, body);
  });
  }

  getRepoContributors(repo, owner, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);

    result.forEach(function(element) {
    var url = element["avatar_url"]
    var login = element["login"]
    var filePath = `avatars/${login}.jpg`
    downloadImageByURL(url, filePath)

  })
  });

//download image by URL
  function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
  }
