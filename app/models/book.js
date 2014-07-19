/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 


/**
 * Book Schema
 */

var BookSchema = new Schema({
	created: {type : Date, default : Date.now},
	title: {type: String, default: '', trim : true},
  description: {type: String, default: '', trim : true},
  pages: {type: Number, default: '', trim : true},
  year: {type: Number, default: '', trim : true},
  price: {type: Number, default: 0.00},
  author: {type: String, default: 'sem autor'},
	isbn: {type: String, default: '', trim : true},
  user: {type : Schema.ObjectId, ref : 'User'},
  img: {type: String, default: 'http://placehold.it/300x200'},
  category: {type: String, default: ''},
  school: {type: String, default: ''},
  status: {type: String, default: ''},
  s:{type: String, default: ''},
  comments: [{}], //lista dos comentarios
  review: {} // pega a media de cada avaliacao
});

/**
 * Statics
 */

BookSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('user').exec(cb);
  }
}


mongoose.model('Book', BookSchema)