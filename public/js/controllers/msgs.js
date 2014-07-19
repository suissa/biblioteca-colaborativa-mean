function MsgsController($rootScope, $scope, $routeParams, Book, Global, Msg) {
  $scope.msgs = [];
  $scope.umsgs = [];
  $scope.msg = {};
  $scope.global = Global;
  $scope.custom = true;
  $scope.info = 0;

  $scope.toggleCustom = function() {
      $scope.custom = $scope.custom === false ? true: false;
  };

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

  $scope.msgs = function (query) {
    Msg.query(query, function (msgs){
      $scope.msgs = msgs;
      $scope.umsgs = msgs;
    })
  }

  $scope.markAsRead = function(id) {
    Msg.get({ msgId: id }, function (msg) {
      msg.read = 1;

      
      for (var i in $scope.msgs) {
        if ($scope.msgs[i]._id == msg._id) {
          $scope.msgs.splice(i, 1)
        }
      }
      $scope.umsgs.push(msg);
      msg.$update();
    });
  }

  $scope.markAsUnread = function(id) {
    Msg.get({ msgId: id }, function (msg) {
      msg.read = 0;

      
      for (var i in $scope.umsgs) {

        if ($scope.umsgs[i]._id == msg._id) {
          $scope.umsgs.splice(i, 1)
        }
      }
      $scope.msgs.push(msg);
      msg.$update();
    });
  }

  $scope.reply = function (_msg, comment) {
    var msg = new Msg({
      msg: comment,
      from: Global.user._id,
      to: _msg.from._id,
      book: _msg.book._id
    })

    msg.$save(function(){
  
      $scope.info = 'Mensagem respondida !';
      $scope.toggle = false;
    })

  }

  $scope.remove = function (msg) {
    msg.$remove();
    for (var i in $scope.msgs) {

      if ($scope.msgs[i] == msg) {
        $scope.msgs.splice(i, 1)
      }
    }

    //$location.path('msgs/');
  };
}