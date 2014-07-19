var monckoose = require('monckoose')
  , mocks
  , books
  , schools;

books = [
  { 
  	created: Date.now, 
  	title: 'book1', 
  	pages: 300, 
  	year: 1968, 
  	insb: "A#UH*#1233", 
  	_id: '51605fe1779ade6334000009', 
  	user: '51605fe1779ade633400002',
  	__v: 0
  },
  { 
  	created: Date.now, 
  	title: 'book2', 
  	pages: 400, 
  	year: 2010, 
  	insb: "A#UH*#656533", 
  	_id: '51605fe1779ade6334000008', 
  	user: '51605fe1779ade633400002',
  	__v: 0
  },
  { 
  	created: Date.now, 
  	title: 'book3', 
  	pages: 300, 
  	year: 1450, 
  	insb: "A#UH*#12434", 
  	_id: '51605fe1779ade6334000007', 
  	user: '51605fe1779ade633400001',
  	__v: 0
  },

];

schools = [
  {
  	_id: '51604fe1779ade6334000007',
  	created: Date.now,
	name: "school1",
	address: {
	    street: "street1",
	    zipcode: "18460000",
	    city: "itararé",
	    state: "SP",
	    country: "brazil"
  	},
  	__v: 0
  }, 
  {
  	_id: '51604fe1779ade6334000008',
  	created: Date.now,
	name: "school2",
	address: {
	    street: "street2",
	    zipcode: "18460000",
	    city: "itararé",
	    state: "SP",
	    country: "brazil"
  	},
  	__v: 0
  }, 
  {
  	_id: '51604fe1779ade6334000009',
  	created: Date.now,
	name: "school3",
	address: {
	    street: "street3",
	    zipcode: "18460000",
	    city: "itararé",
	    state: "SP",
	    country: "brazil"
  	},
  	__v: 0
  }
];

mocks = {
  books: new monckoose.MonckooseCollection(books),
  schools: new monckoose.MonckooseCollection(schools)
};

module.exports = exports = mocks;