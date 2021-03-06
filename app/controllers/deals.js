var mongoose = require('mongoose')
  , async = require('async')
  , Deal = mongoose.model('Deal')
  , _ = require('underscore')


/**
 * Find deal by id
 */

exports.deal = function(req, res, next, id){
  var User = mongoose.model('User')
  
  Deal.load(id, function (err, deal) {
    if (err) return next(err)
    if (!deal) return next(new Error('Failed to load deal ' + id))
    req.deal = deal
    next()
  })
}

/**
 * Create a deal
 */
exports.create = function (req, res) {
  var deal = new Deal(req.body)
  deal.user = req.user
  deal.save()
  res.jsonp(deal)
}

/**
 * Update a deal
 */
exports.update = function(req, res){
  var deal = req.deal
  deal = _.extend(deal, req.body)

  deal.save(function(err) {
    res.jsonp(deal)
  })
}

/**
 * Delete a deal
 */
exports.destroy = function(req, res){
  var deal = req.deal
  deal.remove(function(err){
    if (err) {
    res.render('error', {status: 500});
  } else {      
    res.jsonp(deal);
  }
  })
}

/**
 * Show a deal
 */
exports.show = function(req, res){
  res.jsonp(req.deal);
}

/**
 * List of Deals
 */
exports.all = function(req, res){
  Deal.find().sort('-created').populate('user').populate('book').exec(function(err, deals) {
    if (err) {
      res.render('error', {status: 500});
    } else {      
        res.jsonp(deals);
    }
  });
}