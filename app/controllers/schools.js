var mongoose = require('mongoose')
  , async = require('async')
  , School = mongoose.model('School')
  , _ = require('underscore')


/**
 * Find school by id
 */

exports.school = function(req, res, next, id){
  var User = mongoose.model('User')

  School.load(id, function (err, school) {
    if (err) return next(err)
    if (!school) return next(new Error('Failed to load school ' + id))
    req.school = school
    next()
  })
}

/**
 * Create a school
 */
exports.create = function (req, res) {
  var school = new School(req.body)
  school.user = req.user
  school.save()
  res.jsonp(school)
}

/**
 * Update a school
 */
exports.update = function(req, res){
  var school = req.school
  school = _.extend(school, req.body)

  school.save(function(err) {
    res.jsonp(school)
  })
}

/**
 * Delete a school
 */
exports.destroy = function(req, res){
  var school = req.school
  school.remove(function(err){
    if (err) {
    res.render('error', {status: 500});
  } else {      
    res.jsonp(school);
  }
  })
}

/**
 * Show a school
 */
exports.show = function(req, res){
  res.jsonp(req.school);
}

/**
 * List of Schools
 */
exports.all = function(req, res){
  School.find().sort('-created').populate('user').exec(function(err, schools) {
    if (err) {
      res.render('error', {status: 500});
    } else {      
      res.jsonp(schools);
    }
  });
}