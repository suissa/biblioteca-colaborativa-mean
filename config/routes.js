
var async = require('async')
  , fs = require('fs')
  , path = require('path')
  , activator = require('activator');



module.exports = function (app, passport, auth) {

  // user routes
  var users = require('../app/controllers/users')

  // user activator
  activator.init({
    user: users.user
  })

  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Usuário ou Senha Inválidos'}), users.session)
  app.get('/users/me', users.me)
  app.post('/users/:userId', auth.requiresLogin,  users.update)
  app.get('/account', auth.requiresLogin, users.me)
  app.get('/users/:userId', users.show)
  app.put('/users/:userId', users.showUpdated)
  app.post("/passwordreset", activator.createPasswordReset);
  app.put("/passwordreset/:userId", activator.completePasswordReset);

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'user_about_me'], failureRedirect: '/signin' }), users.signin)
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signin' }), users.authCallback)
  app.get('/auth/github', passport.authenticate('github', { failureRedirect: '/signin' }), users.signin)
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/signin' }), users.authCallback)
  app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/signin' }), users.signin)
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/signin' }), users.authCallback)
  app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/signin', scope: 'https://www.google.com/m8/feeds' }), users.signin)
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signin', scope: 'https://www.google.com/m8/feeds' }), users.authCallback)

  app.param('userId', users.user)

  var books = require('../app/controllers/books')  
  app.get('/books', books.all)
  app.post('/books', auth.requiresLogin, books.create)
  app.get('/books/:bookId', books.show)
  app.put('/books/:bookId', auth.requiresLogin, auth.book.hasAuthorization, books.update)
  app.del('/books/:bookId', auth.requiresLogin, auth.book.hasAuthorization, books.destroy)

  app.param('bookId', books.book)

  var msgs = require('../app/controllers/msgs')  
  app.get('/msgs', msgs.all)
  app.post('/msgs', auth.requiresLogin, msgs.create)
  app.get('/msgs/:msgId', msgs.show)
  app.put('/msgs/:msgId', auth.requiresLogin, auth.msg.hasAuthorization, msgs.update)
  app.del('/msgs/:msgId', auth.requiresLogin, auth.msg.hasAuthorization, msgs.destroy)

  app.param('msgId', msgs.msg)

  var schools = require('../app/controllers/schools')  
  app.get('/schools', schools.all)
  app.post('/schools', auth.requiresLogin, schools.create)
  app.get('/schools/:schoolId', schools.show)
  app.put('/schools/:schoolId', auth.requiresLogin, auth.school.hasAuthorization, schools.update)
  app.del('/schools/:schoolId', auth.requiresLogin, auth.school.hasAuthorization, schools.destroy)

  app.param('bookId', books.book)

  var deals = require('../app/controllers/deals')  
  app.get('/deals', auth.requiresLogin, deals.all)
  app.post('/deals', auth.requiresLogin, deals.create)
  app.get('/deals/:dealId', auth.requiresLogin, deals.show)
  app.put('/deals/:dealId', auth.requiresLogin, auth.deal.hasAuthorization, deals.update)
  app.del('/deals/:dealId', auth.requiresLogin, auth.deal.hasAuthorization, deals.destroy)

  app.param('dealId', deals.deal)

  // home route
  var index = require('../app/controllers/index')
  app.get('/', index.render)

  app.post('/upload', function(req, res) {
    var image =  req.files.image;
    var newImageLocation = path.join(__dirname, '../public/resources/images', image.name);
    
    fs.readFile(image.path, function(err, data) {
        fs.writeFile(newImageLocation, data, function(err) {
            res.json(200, { 
                src: 'resources/images/' + image.name,
                size: image.size
            });
        });
    });
  });

}
