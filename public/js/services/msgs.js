//Articles service used for articles REST endpoint
window.app.factory("Msg", function($resource){
  return $resource('msgs/:msgId', {msgId: '@_id'}, {update: {method: 'PUT'}});
});