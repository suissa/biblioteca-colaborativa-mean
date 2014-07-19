/*!
 * nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport')
  , logger = require('mean-logger')
  , Iconv  = require('iconv').Iconv;

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose')

// Bootstrap db connection
var db = mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// bootstrap passport config
require('./config/passport')(passport, config)

var app = express()

// express settings
require('./config/express')(app, config, passport)

// Bootstrap routes
require('./config/routes')(app, passport, auth)

// Start the app by listening on <port>
var port = process.env.PORT || 3001
app.listen(port)
console.log('Express app started on port '+port)

//Initializing logger 
logger.init(app, passport, mongoose)

// expose app
exports = module.exports = app

// var request = require('request'),
//     cheerio = require('cheerio')
//   , states = [
//     'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
//     'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'RN', 'RO', 'RR',
//     'RS', 'RJ', 'SC', 'SE', 'SP', 'TO'
//   ];

/*  request('http://www.fucape.br/simula-igc-cpc/_ret_tbl_igc.asp?nivel=brasil', function(error, response, body) {
    // Hand the HTML response off to Cheerio and assign that to
    //  a local $ variable to provide familiar jQuery syntax.
    var iconv = new Iconv('ISO-8859-1', 'UTF-8')
    var $ = cheerio.load(iconv.convert(body));
    var box = null;
    // Exactly the same code that we used in the browser before:
    var i = 0;
    $('#box_geral .box_padding table tr').each(function(){
      $(this).map(function(){
          console.log($(this).find('td').eq(1).html())
          /*var School = mongoose.model('School');
          var school = new School();
          school.name = $(this).find('td').eq(1).html() + '(' + $(this).find('td').eq(2).html() + ')';
          school.sign = $(this).find('td').eq(2).html();
          school.state = $(this).find('td').eq(3).html();

          school.save(function(err){
            console.log(err);
          });
      });
      /*if ($(this + ' td').eq(13).html() != null && $(this + ' td').eq(14).html() != null) {
        var School = mongoose.model('School');
        var school = new School();
        school.name = $(this + ' td').eq(13).html();
        school.sign = $(this + ' td').eq(14).html();
        school.state = $(this + ' td').eq(15).html();

        school.save(function(err){
          console.log(err);
        });
      }
        //$(this + ' td').eq(13).html());
    })
  });*/

