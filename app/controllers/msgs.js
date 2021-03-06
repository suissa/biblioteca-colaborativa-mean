var mongoose = require('mongoose')
  , async = require('async')
  , Msg = mongoose.model('Msg')
  , _ = require('underscore')
  , nodemailer = require('nodemailer');


/**
 * Find msg by id
 */

exports.msg = function(req, res, next, id){
  var User = mongoose.model('User')

  Msg.load(id, function (err, msg) {
    if (err) return next(err)
    if (!msg) return next(new Error('Failed to load msg ' + id))
    req.msg = msg
    next()
  })
}

exports.fromUser = function (req, res, next, id) {
  Msg.fromUser(id, function (err, msg) {
    if (err) return next(err)
    if (!msg) return next(new Error('Failed to load msgs form user ' + id))
    req.msg = msg
    next()
  })
}

/**
 * Create a msg
 */
exports.create = function (req, res) {
  var msg = new Msg(req.body)
  var transport = nodemailer.createTransport("sendmail");

  msg.from = req.user
  msg.save()
  console.log(msg._id);

    var mailOptions = {
        from: req.user.name + " ✔ <"+ req.user.email +">", // sender address
        to: 'ildinhalins@hotmail.com', // list of receivers
        subject: "Acervo Digital (comentário sobre livro) ✔", // Subject line
        text: msg.msg, // plaintext body
        html: "<b>Você recebeu um comentário de negociação sobre um de seus livros ✔</b><blockquote>"+ msg.msg +"</blockquote><p>Para interagir, acesse o menu mensagens na sua área de usuario no <a href='acervouniversitario.com.br'>Acervo Universitário</a></p>" // html body
    }
    transport.sendMail(mailOptions, function (err, response){
      console.log(err, response);
      res.jsonp(msg)
    })
    
  
  
}

/**
 * Update a msg
 */
exports.update = function(req, res){
  var msg = req.msg
  msg = _.extend(msg, req.body)

  msg.save(function(err) {
    res.jsonp(msg)
  })
}

/**
 * Delete a msg
 */
exports.destroy = function(req, res){
  var msg = req.msg
  msg.remove(function(err){
    if (err) {
    res.render('error', {status: 500});
  } else {      
    res.jsonp(msg);
  }
  })
}

/**
 * Show a msg
 */
exports.show = function(req, res){
  res.jsonp(req.msg);
}

/**
 * List of Msgs
 */
exports.all = function(req, res){
  Msg.find().sort('-created').populate('to').populate('from').populate('book').exec(function(err, msgs) {
    if (err) {
      res.render('error', {status: 500});
    } else {      
      res.jsonp(msgs);
    }
  });
}