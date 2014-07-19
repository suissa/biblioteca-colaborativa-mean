function DealsController ($scope, $routeParams, $location, Deal, Global, Book, Msg) {
  $scope.deals = [];
  $scope.comm = [];
  $scope.deal = {};
  $scope.book = {};
  $scope.reserved = '';
  $scope.post_msg = 0;

  $scope.create = function (id) {

    Book.get({ bookId: id }, function (book) {
      $scope.book = book;
    });

    var deal = new Deal(
      { 
        requester: Global.user,
        requested: book.user._id,
        status: 'Em Andamento'
      }
    );

    deal.$save(function (response) {
      $location.path("books/");
    });
  };

  $scope.remove = function (deal) {
    

    Book.get({ bookId: deal.book._id }, function (book) {
      book.status = '';

      book.$update(function(){
        deal.$remove();
      })
    })

    for (var i in $scope.deals) {
      if ($scope.deals[i] == deal) {
        $scope.deals.splice(i, 1)
      }
    }

    $location.path('deals/');
  };

  $scope.update = function () {
    var deal = $scope.deal;
    if (!deal.updated) {
      deal.updated = [];
    }
    deal.updated.push(new Date().getTime());

    deal.$update(function () {
      $location.path('deals/' + deal._id);
      $scope.comm = deal.comments;
    });
  };

  $scope.commentDeal = function () {
    var comment = this.comment;
    var user = Global.user.name;

    Deal.get({ dealId: $routeParams.dealId }, function (deal) {
      deal.comments.push({comment: comment, user: user})

      var msg = new Msg({
        msg: comment,
        to: deal.requested._id,
        from: Global.user._id,
        book: deal.book._id
      })

      msg.$save(function(){
        Book.get({bookId: deal.book._id}, function(book){
          book.s = 'r';
          book.$update();
        })
        $scope.post_msg='Comentário enviado com sucesso. Em breve o usuário retornará uma mensagem!';
      });

      deal.$update(function () {
        $location.path('deals/' + deal._id);
      });
    }); 
  }

  $scope.close = function (deal) {
    Book.get({ bookId: deal.book._id }, function (book) {
      book.s = 's';

      book.$update(function(){
        $scope.reserved = 'Negociação Fechada';
      })
    })
  }

  $scope.find = function (query) {
    Deal.query(query, function (deals) {
      angular.forEach(deals, function(v, i){
        v.requested._id == Global.user._id ? this.push(v) : '';
      }, $scope.deals);
    });
  };

  $scope.findOne = function () {
    Deal.get({ dealId: $routeParams.dealId }, function (deal) {
      $scope.deal = deal;
      $scope.comm = deal.comments;
    });
  };
}