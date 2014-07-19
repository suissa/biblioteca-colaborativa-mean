
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://localhost/mean-dev',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'AU - Acervo Universitário'
    },
    facebook: {
      clientID: "562813410464860",
      clientSecret: "8037f07da4891f2ba7ff7eec7d650bbc",
      callbackURL: "http://acervouniversitario.com.br/auth/facebook/callback"
    },
    twitter: {
      clientID: "c7eebRFNCTQF3d95X7Lc9g",
      clientSecret: "iX0ozcLGVZ5qtkwwUYt3DnKrBTF0jjPsCfx6JB9k3U",
      callbackURL: "http://acervouniversitario.com.br/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
  },
  test: {
    db: 'mongodb://localhost/mean-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'MEAN - A Modern Stack - Test'
    },
    facebook: {
      clientID: "562813410464860",
      clientSecret: "8037f07da4891f2ba7ff7eec7d650bbc",
      callbackURL: "http://acervouniversitario.com.br/auth/facebook/callback"
    },
    twitter: {
      clientID: "c7eebRFNCTQF3d95X7Lc9g",
      clientSecret: "iX0ozcLGVZ5qtkwwUYt3DnKrBTF0jjPsCfx6JB9k3U",
      callbackURL: "http://acervouniversitario.com.br/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback"
    }
  },
  production: {
    db: 'mongodb://localhost/mean',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'MEAN - A Modern Stack - Production'
    },
    facebook: {
      clientID: "562813410464860",
      clientSecret: "8037f07da4891f2ba7ff7eec7d650bbc",
      callbackURL: "http://acervouniversitario.com.br/auth/facebook/callback"
    },
    twitter: {
      clientID: "c7eebRFNCTQF3d95X7Lc9g",
      clientSecret: "iX0ozcLGVZ5qtkwwUYt3DnKrBTF0jjPsCfx6JB9k3U",
      callbackURL: "http://acervouniversitario.com.br/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback"
    }
  }
}


