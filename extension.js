var express = require('express'),
  app = express();
var request = require('request');

module.exports = function (nodecg) {

  var updateViewerInterval = nodecg.bundleConfig.updateViewerInterval === undefined ? 15 : nodecg.bundleConfig.updateViewerInterval;
  var updateFollowerInterval = nodecg.bundleConfig.updateFollowerInterval === undefined ? 120 : nodecg.bundleConfig.updateFollowerInterval;
  var username = nodecg.bundleConfig.twitchUsername;
  var twitchViewers = nodecg.Replicant('twitchViewers', {persistent: false});
  var twitchFollowers = nodecg.Replicant('twitchFollowers');
  var twitchTitle = nodecg.Replicant('twitchTitle');
  var twitchStreaming = nodecg.Replicant('twitchStreaming');
  var twitchStarted = nodecg.Replicant('twitchStarted', {persistent: false});

  getViewers();
  getFollowers();
  setInterval(getViewers, updateViewerInterval * 1000);
  setInterval(getFollowers, updateFollowerInterval * 1000);

  function getViewers() {
    var url = 'https://api.twitch.tv/kraken/streams/' + username;
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var data = JSON.parse(body);
          if (data.stream === null) {
            twitchStreaming.value = false;
          } else {
            twitchStreaming.value = true;
            twitchViewers.value = data.stream.viewers;
            twitchStarted.value = data.stream.created_at;
          }
        } else {
          console.log(error);
          console.log(response.statusCode);
        }
    });
  }

  function getFollowers() {
    var url = 'https://api.twitch.tv/kraken/channels/' + username;
    request(url, function (error, response, body) {
      if (response !== undefined && !error && response.statusCode === 200) {
        var data = JSON.parse(body);
        twitchTitle.value = data.status;
        twitchFollowers.value = data.followers;
      } else {
        console.log(error);
        console.log(response.statusCode);
      }
    });
  } 

  nodecg.mount(app);
};
