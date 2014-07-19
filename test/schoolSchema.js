module.exports = exports = {
	created: {type : Date, default : Date.now},
	name: {type: String, default: '', trim : true},
	address: {
    street: { type: String, default: '', trim: true },
    zipcode: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    state: { type: String, default: '', trim: true },
    country: { type: String, default: '', trim: true }
  }
}