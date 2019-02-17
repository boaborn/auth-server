const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Setup options for JWT Strategy
const jwtOptions = {}

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.subdomains, function(err, user){
    if (err) { return done(err, false) }
    if (user) {
      done(null, user) // found user in database
    } else {
      done(null, false) //not found
    }
  })
});

// Tell passport to use this strategy
