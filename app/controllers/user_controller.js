import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import UserModel from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

//eslint-disable-next-line
export const signup = (req, res, next) => {
  // console.log('in signup req email,pass is');
  // console.log(req.body.email);
  // console.log(req.body.password);

  const email = req.body.username;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password || !username) {
    return res.status(422).send('You must provide email, username, and password');
  }

  UserModel.findOne({ email })
  //eslint-disable-next-line
    .then((returnedUser) => {
      if (returnedUser) {
        console.log('user exists');
        return res.status(422).send('That user already exists!');
      } else {
        const newUser = new UserModel();
        newUser.email = email;
        newUser.password = password;
        newUser.username = username;
        newUser.save()
          .then((result) => {
            res.send({ token: tokenForUser(newUser) });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((err) => {
      res.json({ err });
    });
};
