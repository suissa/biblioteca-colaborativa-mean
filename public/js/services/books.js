//Articles service used for articles REST endpoint
window.app.factory("Book", function($resource){
	return $resource('books/:bookId', {bookId:'@_id'}, {update: {method: 'PUT'}});
});