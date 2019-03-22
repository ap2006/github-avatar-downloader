var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };
//download image by URL
  function downloadImageByURL(url, filePath) {
    request.get(url)
    .pipe(fs.createWriteStream(filePath));
  }
  console.log(downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg"));

//request parse data
  request(options, function(err, res, body) {
    // console.log('result:', JSON.parse(body));
    cb(err, JSON.parse(body));
  });
}


getRepoContributors("ap2006", "tweeter", function(err, result) {
  // console.log("Errors:", err);
  console.log(result);
  result.forEach(function(element) {
    console.log('USER---------', element.avatar_url);
  })
});
