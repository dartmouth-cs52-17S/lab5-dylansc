// lets import some stuff
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';


// and import User
import UserModel from '../models/user_model';

dotenv.config({ silent: true });


// options for local strategy, we'll use email AS the username
// not have separate ones
const localOptions = { usernameField: 'email' };

// options for jwt strategy
// we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};


const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  console.log('in locallogin');
  console.log(email);
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  //eslint-disable-next-line
  UserModel.findOne({ email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        done(err);
      } else if (!isMatch) {
        done(null, false);
      } else {
        done(null, user);
      }
    });
  });
});

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log('in jwtlogin payload is');
  console.log(payload);
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  UserModel.findById(payload.sub, (err, user) => {
    if (err) {
      console.log('in err');
      console.log(err);
      done(err, false);
    } else if (user) {
      console.log('in user');
      console.log(user);
      done(null, user);
    } else {
      console.log('in done');
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);


export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });
