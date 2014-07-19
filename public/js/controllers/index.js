function IndexController($scope, $rootScope, $location, Book, Deal, Global){
	$scope.books = []
  $scope.book = {}
  $scope.global = Global;
  $scope.global.books = [];

  $scope.index = function (query) {
    Book.query(query, function (books) {
      angular.forEach(books, function(v, i){
        if (v.s == '') {

          $scope.books.push(v);
          $scope.global.books.push(v);
        }
      }, $scope.books);
        
    });

    console.log($scope.global);
  }  

  $scope.create = function(id){
    var deal = null;
    if (Global.user != null) {
      Book.get({ bookId: id }, function (book) {
        $scope.book = book;
          deal = new Deal(
            { 
              requester: Global.user._id,
              requested: book.user._id,
              book: book._id,
              status: 'Em Andamento'
            }
          );

          deal.$save(function (response) {
            $location.path("deals/" + response._id);
          });
      });
    } else {
      $location.path("/");
    }
  
  }

 

}