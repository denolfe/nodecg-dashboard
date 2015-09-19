var options = {
  useEasing : true,
  useGrouping : true,
  separator : ',',
  decimal : '.',
  prefix : '',
  suffix : ''
};

var twitchViewers = nodecg.Replicant('twitchViewers');
var twitchFollowers = nodecg.Replicant('twitchFollowers');

twitchViewers.on('change', function(oldValue, newValue) {
  if (oldValue === undefined) oldValue = 0;
  console.log('twitchViewers changed from '+ JSON.stringify(oldValue) +' to '+ JSON.stringify(newValue));
  var viewerCounter = new countUp("viewer-count", Number(oldValue), Number(newValue), 0, 2.5, options);
  viewerCounter.start();
  // $('#viewers').html('<small>' + formatNum(newValue) + '</small>');  
});

twitchFollowers.on('change', function(oldValue, newValue) {
  if (oldValue === undefined) oldValue = 0;
  console.log('twitchFollowers changed from '+ JSON.stringify(oldValue) +' to '+ JSON.stringify(newValue));
  // $('#followers').html('<small>' + formatNum(newValue) + '</small>');
  var followerCounter = new countUp("follower-count", Number(oldValue), Number(newValue), 0, 2.5, options);
  followerCounter.start();
});

// var oldViewers = 0;
// var oldFollowers = 0;

// $(document).ready(function() {

//   nodecg.sendMessage('refreshViewersRequest');
//   nodecg.sendMessage('refreshFollowersRequest');

//   nodecg.listenFor('updateViewers', function (data) {
//     if (oldViewers !== data.viewers) {
//       console.log('Viewer Count Change: ' + oldViewers + ' --> ' + data.viewers);
//       var viewerCounter = new countUp("viewer-count", oldViewers, data.viewers, 0, 2.5, options);
//       viewerCounter.start();
//       oldViewers = data.viewers;
//     }
//   });

//   nodecg.listenFor('updateFollowers', function (data) {
//     if (oldFollowers !== data.followers) {
//       //console.log('old: ' + oldFollowers + ' new: ' + data.followers);
//       var followerCounter = new countUp("follower-count", oldFollowers, data.followers, 0, 2.5, options);
//       followerCounter.start();
//       oldFollowers = data.followers;
//     }
//   });
// });