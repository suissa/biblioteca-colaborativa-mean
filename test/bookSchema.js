var Schema = require('mongoose').Schema

module.exports = exports = new Schema({
	created: {type : Date, default : Date.now},
	title: {type: String, default: '', trim : true},
  	pages: {type: Number, default: '', trim : true},
  	year: {type: Number, default: '', trim : true},
	isbn: {type: String, default: '', trim : true},
  	user: {type : Schema.ObjectId, ref : 'User'}
})