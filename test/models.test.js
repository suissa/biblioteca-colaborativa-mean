require('monckoose')

var vows = require('vows')
  , assert = require('assert')
  , path = require('path')
  , dbOptions = {
      mocks: require(path.join(__dirname, 'mocks')),
      debug: false
  }
  , mongoose = require('mongoose')
  , bookSchema = require('./bookSchema')
  , schoolSchema = require('./schoolSchema')
  , Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/mocks', dbOptions);
var Book = mongoose.model('Book', bookSchema)
var School = mongoose.model('School', schoolSchema)

vows.describe('Testando Models').addBatch({

    'Books' : {
        topic: new (Book),
        'a book': function (topic) {
            assert.isObject(topic)
        },
        'saving a book': function () {
          var saved = null;

          var book = new Book({
            title: "book-test"
          });

          book.title = 'book-test';
          book.pages = 347;
          book.year = 1002;
          book.isbn = 'EGYEGYHBHNJNM';
          book.user = Schema.ObjectId('51605fe1779ade633400002');

          book.save(function (err, book) {
            saved = (err) ? 1 : 0;
            this.callback;
          }); 

          assert.isTrue(saved);
        },
        'book with title book1 exists': function () {
            var title = '';
            Book.findOne({title : 'book1'}, function (err, model) {
                title = model.title;
            })

            assert.equal(title, 'book1');
        }
    },
    'Schools': {
        topic: new (School),
        'a school': function (topic) {
            assert.isObject(topic)
        },
        'school with name school1 exists': function () {
            var name = '';
            School.findOne({name : 'school1'}, function (err, model) {
                name = model.name;
            })

            assert.equal(name, 'school1');
        }
    }
}).export(module);

