import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import pool from '../databaseproduct';
import helpers from './helpers';
import jwt from 'jsonwebtoken';

let user1:any;

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username:any, password, done) => {
  let username1 = username.trim();
  let password1 = password.trim();
  const rows:any = await pool.promise().query('SELECT * FROM caja_usuarios WHERE username = ?', [username1])
                                  .then(rows => rows)
                                  .catch(err => console.log(err));
  if(rows[0][0] !== undefined && rows.length > 0){
    const user = rows[0][0];
    const validPassword:any = await helpers.matchPassword(password1, user.password)
    if(validPassword){
        const userData = {
          id: user.id,
          username: user.username,
          fullname: user.fullname
          // Agregar otros datos del usuario que desees
        };

        const verifyOptions = {
          message: 'Welcome ' + user.username,
          user: userData
        };
        req.user = user;
        console.log('Welcome ' + user.username);
        return done(null, user);

        console.log(user);
    } else {

      console.log('Incorrect password'); 
      return done(null, false, { message: '405' });
    }
  } else if (rows[0][0] === undefined) {

    console.log('The username does not exist');    
    return done(null, false, { message: '404' });
  }

  
}));

export default user1;



passport.use('local.signup', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    const { fullname } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser:any = await pool.promise().query('SELECT * FROM caja_usuarios WHERE username = ?', [username])
      .then(rows => rows)
      .catch(err => console.log(err));

    if (existingUser[0][0]) {
      console.log(existingUser[0][0]);
      return done(null, false, { message: 'El usuario ya existe. Por favor, elige otro nombre de usuario.' });
    }

    const newUser: any = {
      username,
      password,
      fullname
    };
    newUser.password = await helpers.encryptPassword(password);

    const result: any = await pool.promise().query('INSERT INTO caja_usuarios SET ?', [newUser])
      .then(result => result)
      .catch(err => console.log(err));

    newUser.id = result[0].insertId;
    return done(null, newUser);
  }
));


passport.serializeUser((user:any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(user:any, done) => {
    const rows:any = await pool.promise().query('SELECT * FROM caja_usuarios WHERE id = ?', [user.id])
                                    .then(rows => rows)
                                    .catch(err => console.log(err));
    done(null, rows[0])
})
