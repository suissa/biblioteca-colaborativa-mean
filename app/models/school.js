/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema

/**
 * School Schema
 */

var SchoolSchema = new Schema({
	created: {type : Date, default : Date.now},
	name: {type: String, default: '', trim : true},
  sign: {type: String, default: '', trim : true},
  state: {type: String, default: '', trim : true},
	address: {
    street: { type: String, default: '', trim: true },
    zipcode: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    state: { type: String, default: '', trim: true },
    country: { type: String, default: '', trim: true }
  }
});

/**
 * Statics
 */

SchoolSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
}


mongoose.model('School', SchoolSchema)