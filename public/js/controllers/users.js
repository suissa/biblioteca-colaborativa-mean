function UsersController($scope, $routeParams, $http, Book, Global, School, User) {
  $scope.bookList = [];
  $scope.global = Global;
  $scope.schools = [];

  $scope.me = function (query) {
    Book.query(query, function (books){
      angular.forEach(books, function(v, i){
        v.user._id == Global.user._id ? this.push(v) : '';
      }, $scope.bookList)
    })

    School.query(query, function (schools) {
      $scope.schools = schools;
    });
  }

  $scope.books = function () {
    Book.get({ user: Global.user._id }, function (books){
      $scope.bookList = books;
    })
  }

  $scope.remove = function (book) {
    book.$remove();
    for (var i in $scope.bookList) {

      if ($scope.bookList[i] == book) {
        $scope.bookList.splice(i, 1)
      }
    }

    //$location.path('books/');
  };

  $scope.create = function (image) {
    var formData = new FormData();
    formData.append('image', image.file, image.file.name);
    var _user = null;

    User.get({userId: Global.user._id}, function (user){
      $http.post('upload', formData, {
          headers: { 'Content-Type': false },
          transformRequest: angular.identity
      }).success(function(result) {
          $scope.uploadedImgSrc = result.src;
          user.img = result.src;
          Global.user.img = result.src;
          $scope.global.user.img = result.src
          user.$update(function (user){
            $scope.global.user = user;
          });
      });
    })
    //upload da imagem
    /*$http.post('upload', formData, {
        headers: { 'Content-Type': false },
        transformRequest: angular.identity
    }).success(function(result) {
        $scope.uploadedImgSrc = result.src;
        book.img = result.src;

        book.$save(function (response) {
          $location.path("books/" + response._id);
        });
    });*/
  }
}