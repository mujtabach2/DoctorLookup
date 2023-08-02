import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UsersDAO from "./dao/usersDao.js";

export default function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    console.log('User:', user);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      console.error('Error comparing passwords:', e);
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}
