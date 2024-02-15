import {Request, Response} from 'express';
import passport from 'passport';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import pool from '../database';
import helpers from '../lib/helpers';


class AuthenticationContoller {

  public signin(req: Request, res: Response, next: any) {
    passport.authenticate('local.signin', (err: Error, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor' });
      }
      if (!user) {
        return res.status(401).json({ message: info.message }); // Envía el mensaje de error personalizado
      }
      // Si la autenticación es exitosa, generas el token y lo envías
      const userData = { id: user.id, username: user.username, fullname: user.fullname, lang : user.lang, password: user.password };
      const token = jwt.sign(userData, 'secreto-seguro', { expiresIn: '1h' });
      res.status(200).json({ token: token });
    })(req, res, next); // Llamada a passport.authenticate
  }

    public signin1(req: Request, res: Response){

    }

    public signup  (req: Request, res: Response, next: any) {
      passport.authenticate('local.signup', (err: Error, user: any, info: any) => {
        if (err) {
          return res.status(500).json({ message: 'Error en el servidor' });
        }
        if (!user) {
          return res.status(401).json({ message: info.message }); // Envía el mensaje de error personalizado
        }
        // Si la autenticación es exitosa, generas el token y lo envías
        const userData = { id: user.id, username: user.username, fullname: user.fullname, lang : user.lang, password: user.password  };
        const token = jwt.sign(userData, 'secreto-seguro', { expiresIn: '1h' });
        res.status(200).json({ token: token });
      })(req, res, next); // Llamada a passport.authenticate
    }


    public profile (req: Request, res: Response) {
      if(req.headers['authorization'] === undefined){
        res.status(405).json({message: 'Unauthorized'})
      }else{

      const token:any = req.headers['authorization'];
      const tokenWithoutBearer = token.replace('Bearer ', '');
      
      if (!tokenWithoutBearer) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const decodedToken = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
      if (!decodedToken) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      const userProfile = decodedToken; // Esto debería contener los datos del usuario del token
  
      res.json(userProfile);
    }
  }


  public async changePassword(req: Request, res: Response) {
    if(req.headers['authorization'] === undefined){
      res.status(405).json({message: 'Unauthorized'})
    }else{
      const token:any = req.headers['authorization'];
      const tokenWithoutBearer = token.replace('Bearer ', '');
      
      if (!tokenWithoutBearer) {
        res.status(401).json({ message: 'Unauthorized' });
      }
      try{
      const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
      if (!decodedToken) {
        res.status(401).json({ message: 'Invalid token' });
      }
      const now = Math.floor(Date.now() / 1000); 
      const timeRemaining = decodedToken.exp - now;
      if (timeRemaining <= 0) {
        throw new Error('El token ya expiró');
      } else {
    const username = decodedToken.username
    const password = req.body.oldPassword
    const newPassword = req.body.newPassword
    
    
    const rows:any = await pool.promise().query('SELECT * FROM crepas_admin WHERE username = ?', [username.trim()])
    .then(rows => rows)
    .catch(err => console.log(err));
if(rows[0][0] !== undefined && rows.length > 0){
const user = rows[0][0];
const validPassword:any = await helpers.matchPassword(password.trim(), user.password)
if(validPassword){

const newPassword1 = await helpers.encryptPassword(newPassword.trim());
await pool.promise().query('UPDATE crepas_admin SET password = ? WHERE username = ?', [newPassword1, username.trim()])
.then(() =>{
  const userData = { id: user.id, username: user.username, fullname: user.fullname, lang : user.lang, password: newPassword1  };
  const newToken = jwt.sign(userData, 'secreto-seguro', { expiresIn: timeRemaining });
  res.status(200).json({ message: 'Password change successfully', token:  newToken});
})
.catch(err => {
  res.status(500).json({ message: '406' })
  console.log(err)});


} else {
res.status(500).json({ message: '405' });
}        
      }
}
}catch (error:any) {
  if (error instanceof TokenExpiredError) {
    res.status(401).json({ message: 'Token expired' });
  } else {
    res.status(401).json({ message: 'Unknown Error' });
  }
}   
}
  }

  public async changeUsername(req: Request, res: Response) {
    if(req.headers['authorization'] === undefined){
      res.status(405).json({message: 'Unauthorized'})
    }else{
      const token:any = req.headers['authorization'];
      const tokenWithoutBearer = token.replace('Bearer ', '');
      
      if (!tokenWithoutBearer) {
        res.status(401).json({ message: 'Unauthorized' });
      }
      try{
      const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
      if (!decodedToken) {
        res.status(401).json({ message: 'Invalid token' });
      }
      const now = Math.floor(Date.now() / 1000); 
      const timeRemaining = decodedToken.exp - now;
      if (timeRemaining <= 0) {
        throw new Error('El token ya expiró');
      } else {
    const username = decodedToken.username
    const password = decodedToken.password
    const fullname = req.body.fullname
    const newUsername = req.body.newUsername
    const rows1:any = await pool.promise().query('SELECT * FROM crepas_admin WHERE username = ?', [newUsername.trim()])
    .then(rows => rows)
    .catch(err => console.log(err));
    if (rows1[0][0]) {
      res.status(500).json({ message: '407' });
    }else{
    const rows:any = await pool.promise().query('SELECT * FROM crepas_admin WHERE username = ?', [username.trim()])
    .then(rows => rows)
    .catch(err => console.log(err));
if(rows[0][0] !== undefined && rows.length > 0){
const user = rows[0][0];
if(user.password === password){
  const existingUser:any = await pool.promise().query('SELECT * FROM crepas_admin WHERE username = ?', [newUsername.trim()])
  .then(rows => rows)
  .catch(err => console.log(err));
  if (existingUser[0][0]) {

  }
await pool.promise().query('UPDATE crepas_admin SET username = ?, fullname = ? WHERE username = ?', [newUsername.trim(), fullname.trim(), username])
.then(() =>{
  const userData = { id: user.id, username: newUsername, fullname: fullname, lang : user.lang, password: user.password  };
  const newToken = jwt.sign(userData, 'secreto-seguro', { expiresIn: timeRemaining });
  res.status(200).json({ message: 'Username change successfully', token:  newToken});
})
.catch(err => {
  res.status(500).json({ message: '406' })
  console.log(err)});


} else {
res.status(500).json({ message: '405' });
}}
  }      
    }
}catch (error:any) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
    } else {
      console.log(error)
      res.status(401).json({ message: 'Unknown Error' });
    }
  }  }}

  public async changeLanguage(req: Request, res: Response) {
    if(req.headers['authorization'] === undefined){
      res.status(405).json({message: 'Unauthorized'})
    }else{
      const token:any = req.headers['authorization'];
      const tokenWithoutBearer = token.replace('Bearer ', '');
      
      if (!tokenWithoutBearer) {
        res.status(401).json({ message: 'Unauthorized' });
      }
      try{
      const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
      console.log(decodedToken)
      if (!decodedToken) {
        res.status(401).json({ message: 'Invalid token' });
      }
      const now = Math.floor(Date.now() / 1000); 
      const timeRemaining = decodedToken.exp - now;
      if (timeRemaining <= 0) {
        res.status(401).json({ message: 'Token expired' });
      } else {
    const username = decodedToken.username
    const password = decodedToken.password
    const newLang = req.body.newLang
    const rows:any = await pool.promise().query('SELECT * FROM crepas_admin WHERE username = ?', [username.trim()])
    .then(rows => rows)
    .catch(err => console.log(err));
if(rows[0][0] !== undefined && rows.length > 0){
const user = rows[0][0];
if(user.password === password){
await pool.promise().query('UPDATE crepas_admin SET lang = ? WHERE username = ?', [newLang.trim(), username.trim()])
.then(() =>{
  const userData = { id: user.id, username: user.username, fullname: user.fullname, lang : newLang, password: user.password  };
  const newToken = jwt.sign(userData, 'secreto-seguro', { expiresIn: timeRemaining });
  res.status(200).json({ message: 'Language change successfully', token:  newToken});
})
.catch(err => {
  res.status(500).json({ message: '406' })
  console.log(err)});


} else {
res.status(500).json({ message: '405' });
}}
  }}catch (error:any) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
    } else {
      console.log(error)
      res.status(401).json({ message: 'Unknown Error' });
    }
  }  }}

    public logout (req: Request, res: Response) {
      
    req.logOut; // Esta función de Passport.js eliminará la sesión del usuario
    res.send('logout');
    }



    



}

const authenticationController = new AuthenticationContoller();
export default authenticationController;