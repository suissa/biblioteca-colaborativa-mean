//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/books', { templateUrl: 'views/books/list.html' }).
  when('/books/create', { templateUrl: 'views/books/create.html' }).
	when('/books/search', { templateUrl: 'views/books/search.html' }).
	when('/books/:bookId/edit', { templateUrl: 'views/books/edit.html' }).
	when('/books/:bookId', { templateUrl: 'views/books/view.html' }).
	when('/', { templateUrl: 'views/index.html' }).
  when('/account', { templateUrl: 'views/user/me.html' }).
  when('/account/books', { templateUrl: 'views/user/books.html' }).
  when('/account/msgs', { templateUrl: 'views/user/msgs.html' }).
  when('/account/deals', { templateUrl: 'views/user/deals.html' }).
  when('/account/recommended', { templateUrl: 'views/user/recommended.html' }).
  when('/deals', { templateUrl: 'views/deals/list.html' }).
  when('/deals/create/:bookId', { templateUrl: 'views/deals/create.html' }).
  when('/deals/:dealId/edit', { templateUrl: 'views/deals/edit.html' }).
  when('/deals/:dealId', { templateUrl: 'views/deals/view.html' }).
  when('/about', { templateUrl: 'views/about.html' }).
  when('/how-it-works', { templateUrl: 'views/hiw.html' }).
  when('/tracking', { templateUrl: 'views/soon.html' }).
  when('/config', { templateUrl: 'views/soon.html' }).
	otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);