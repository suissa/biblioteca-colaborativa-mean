//Articles service used for articles REST endpoint
window.app.factory("Deal", function($resource){
  return $resource('deals/:dealId', {dealId:'@_id'}, {update: {method: 'PUT'}});
});