//Articles service used for articles REST endpoint
window.app.factory("School", function($resource){
  return $resource('schools/:schoolId', {schoolId:'@_id'}, {update: {method: 'PUT'}});
});