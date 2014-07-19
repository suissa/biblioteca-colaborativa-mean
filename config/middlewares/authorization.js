
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
};


/*
 *  User authorizations routing middleware
 */

exports.user = {
    hasAuthorization : function (req, res, next) {
      if (req.profile.id != req.user.id) {
        return res.redirect('/users/'+req.profile.id)
      }
      next()
    }
}


/*
 *  Article authorizations routing middleware
 */

exports.book = {
    hasAuthorization : function (req, res, next) {
      if (req.book.user.id != req.user.id) {
        return res.redirect('/books/'+req.book.id)
      }
      next()
    }
}

/*
 *  Article authorizations routing middleware
 */

exports.school = {
    hasAuthorization : function (req, res, next) {
      if (req.book.user.id != req.user.id) {
        return res.redirect('/schools/'+req.book.id)
      }
      next()
    }
}

/*
 *  Article authorizations routing middleware
 */

exports.deal = {
    hasAuthorization : function (req, res, next) {
      if (req.deal.requested != req.user.id) {
        return res.redirect('/deals/'+req.deal.id)
      }
      next()
    }
}

/*
 *  Article authorizations routing middleware
 */

exports.msg = {
    hasAuthorization : function (req, res, next) {
      if (req.msg.to.id != req.user.id) {
        return res.redirect('/msg/'+req.msg.id)
      }
      next()
    }
}
