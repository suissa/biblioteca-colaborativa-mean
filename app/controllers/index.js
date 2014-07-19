/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , async = require('async')
  , _ = require('underscore')


exports.render = function(req, res){
  if (req.user) {
    res.render('index_login', {
      user: req.user ? JSON.stringify(req.user) : "null",
      msgs: req.user.msgs ? req.user.msgs : 0
    })
  } else {
    res.render('index', {})
  }
    
} 