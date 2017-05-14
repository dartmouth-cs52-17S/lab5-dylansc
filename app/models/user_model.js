import mongoose, { Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';

// create a PostSchema with a title field
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, unique: true, lowercase: true },
  password: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.set('toJSON', {
  virtuals: true,
});

//eslint-disable-next-line
UserSchema.pre('save', function beforeyYourModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;
  if (!user.isModified('password')) return next();

//eslint-disable-next-line
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    } else {
      bcryptjs.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        return next();
      });
    }
  });
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // return callback(null, comparisonResult) for success
  // or callback(error) in the error case
  bcryptjs.compare(candidatePassword, this.password, (err, res) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, res);
    }
  });
};


// create PostModel class from schema
const UserModel = mongoose.model('User', UserSchema);


export default UserModel;
