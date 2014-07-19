/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema

/**
 * Deal Schema
 */

var DealSchema = new Schema({
  created: {type : Date, default : Date.now},
  requester: {type : Schema.ObjectId, ref : 'User'},
  requested: {type : Schema.ObjectId, ref : 'User'},
  book: {type : Schema.ObjectId, ref : 'Book'},
  comments: [{ 
    comment: {type : String, default: ''},
    user: {type : String, default: 'Anonimo'}
  }],
  status: {type: String, default: ''}
});

/**
 * Statics
 */

DealSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('requester').populate('requested').populate('book').exec(cb);
  }
}

mongoose.model('Deal', DealSchema)