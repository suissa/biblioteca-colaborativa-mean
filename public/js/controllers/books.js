function BooksController($scope, $http, $routeParams, $location, Book, School, Global) {
	$scope.books = [];
	$scope.schools = [];
	$scope.book = {};
	$scope.image_src = '';
	$scope.global = Global;
	$scope.global.books = Global.books;
  $scope.c = true;
  $scope.apo = 12;
  $scope.arte = 0;
  $scope.ce = 0;
  $scope.ch = 0;
  $scope.direito = 0;
  $scope.d = 0;
  $scope.eng = 0;
  $scope.fil = 0;
  $scope.inf = 0;
  $scope.neg = 0;
  $scope.out = 0;
  $scope.sau = 0;
  $scope.message = 0;

  $scope.toggleCat = function () {
    $scope.c = !$scope.c;
  }

  $scope.loadCategories = function () {

  }

	$scope.create = function (image) {
		var book = new Book(
			{ 
				title: this.title,
				pages: this.pages,
				year: this.year,
				description: this.description,
				price: this.price,
				author: this.author,
				category: this.category,
				img: this.img,
        school: this.school,
				status: this.status
			}
		);

		var formData = new FormData();
    formData.append('image', image.file, image.file.name);

    //upload da imagem
    $http.post('upload', formData, {
        headers: { 'Content-Type': false },
        transformRequest: angular.identity
    }).success(function(result) {
        $scope.uploadedImgSrc = result.src;
        book.img = result.src;

        book.$save(function (response) {
					$scope.message = 'Livro cadastrado com sucesso!';
				});
    });

    this.title = "";
		this.pages = 0;
		this.year = 0;
		this.description = '';
		this.price = 0.00;
		this.author = '';
		this.img = '';

		
	};

	$scope.remove = function (book) {
		book.$remove();
		for (var i in $scope.books) {

			if ($scope.books[i] == book) {
				$scope.books.splice(i, 1)
			}
		}

		//$location.path('books/');
	};

	$scope.update = function () {
		var book = $scope.book;
		if (!book.updated) {
			book.updated = [];
		}
		book.updated.push(new Date().getTime());

		book.$update(function () {
			$location.path('books/' + book._id);
		});
	};

	$scope.find = function (query) {
		Book.query(query, function (books) {
      angular.forEach(books, function(v, i){
        console.log(v.s);
        if (v.s == '') {

          $scope.books.push(v);
          $scope.global.push(v);
        }
      }, $scope.books);
  			
		});
	};

	$scope.search = function (query) {
		Book.query(query, function (books) {
			angular.forEach(books, function(v, i){
        v.category == $routeParams.q ? this.push(v) : '';
      }, $scope.books);
		});
	}

	$scope.recommended = function (school) {
    Book.query(school, function (books) {
      $scope.recommendedBooks = books;
    });
    
  }

	$scope.mainSearch = function (query) {
    console.log(this);
    var q = this.q;
    Book.query(query, function (books) {
      Global.books = [];
      angular.forEach(books, function(v, i){
        console.log(v.title.toLowerCase(), q, v.title.toLowerCase().match(q))
      	if (v.title.toLowerCase().match(q))
      		this.push(v);

      }, Global.books);

      console.log(Global.books)

    });
    $scope.global.books = Global.books;
  }


	$scope.findOne = function () {
		Book.get({ bookId: $routeParams.bookId }, function (book) {
			$scope.book = book;
		});
	};

	$scope.loadSchools = function (query) {
		School.query(query, function (schools) {
			$scope.schools = schools;
		});
	}

}

