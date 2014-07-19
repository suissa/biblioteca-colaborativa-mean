/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema

/**
 * Msg Schema
 */

var MsgSchema = new Schema({
  created: {type : Date, default : Date.now},
  from: {type: Schema.ObjectId, ref: 'User'},
  msg: {type: String, default: ''},
  to: {type: Schema.ObjectId, ref: 'User'},
  read: {type: Number, default: 0},
  book: {type: Schema.ObjectId, ref: 'Book'}
});

/**
 * Statics
 */

MsgSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('from').populate('to').populate('book').exec(cb);
  },
  fromUser :  function(id, cb) {
    this.findOne({ 'to.id' : id }).populate('from').populate('to').populate('book').exec(cb);
  }
}


mongoose.model('Msg', MsgSchema)