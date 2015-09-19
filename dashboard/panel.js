var uptimeTickerStarted = false;

var twitchViewers = nodecg.Replicant('twitchViewers');
var twitchFollowers = nodecg.Replicant('twitchFollowers');
var twitchTitle = nodecg.Replicant('twitchTitle');
var twitchStreaming = nodecg.Replicant('twitchStreaming');
var twitchStarted = nodecg.Replicant('twitchStarted');

$(document).ready(function () {
  $('.nodecg-dashboard .panel-title').text(nodecg.bundleConfig.twitchUsername);
});

twitchViewers.on('change', function(oldValue, newValue) {
  if (newValue === undefined) {
    $('#viewers').html('<small><i>Offline</i></small>');
    return
  }
  console.log('twitchViewers changed from '+ JSON.stringify(oldValue) +' to '+ JSON.stringify(newValue));
  $('#viewers').html('<small>' + formatNum(newValue) + '</small>');  
});

twitchFollowers.on('change', function(oldValue, newValue) {
  console.log('twitchFollowers changed from '+ JSON.stringify(oldValue) +' to '+ JSON.stringify(newValue));
  $('#followers').html('<small>' + formatNum(newValue) + '</small>');
});

twitchTitle.on('change', function(oldValue, newValue) {
  console.log('twitchTitle changed from '+JSON.stringify(oldValue) +' to '+ JSON.stringify(newValue));
  $('#stream-title').html(newValue);
})

twitchStarted.on('change', function(oldValue, newValue) {
  if (newValue === undefined) {
    $('#uptime-ticker').html('00:00:00')
    return
  }
  console.log('twitchStarted changed from '+JSON.stringify(oldValue) +' to '+ JSON.stringify(newValue));
  var start = new Date(newValue);
  if (uptimeTickerStarted === false) {
    var stopwatchStart = Date.now() - start;
    $('#uptime-ticker').stopwatch({startTime: stopwatchStart}).stopwatch('start');
    uptimeTickerStarted = true;
  }
})

function formatNum(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}