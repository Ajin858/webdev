const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const user =  mongoose.model('user');//one argument means fetching data an two means data input
passport  .serializeUser((user,done)=>{
  done(null, user.id);
});

passport.deserializeUser((id,done)=>{
  user.findById(id).then(user =>{
    done(null, user);
  });
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy : true
  },
  (accessToken,refreshToken,profile,done) => {
     user.findOne({googleId: profile.id})
      .then((existingUser)=>{
        if(existingUser){
          // we already have a record with the given profile id
          done(null, existingUser);
        } else{
          //we don't have a user record with this id. Make a new record!
          new user({googleID: profile.id})
             .save()
             .then(user => done(null,user));
        }
      });// console.log('accessToken',accessToken);
        // console.log('refresh Token',refreshToken);
        // console.log('profile',profile);
    }
  )
);