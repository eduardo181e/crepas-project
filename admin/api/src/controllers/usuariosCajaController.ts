import {Request, Response} from 'express';
import helpers from '../lib/helpers';
import pool from '../databaseuser';
import jwt from'jsonwebtoken';
import { admin } from '../models/models';

class CajaController {


    public async list (req: Request, res: Response) {
        if(req.headers['authorization'] === undefined){
            res.status(200).json({message: 'Unauthorized'})
          }else{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            
            if (!tokenWithoutBearer) {
              res.status(401).json({ message: 'Unauthorized' });
            }
        
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
            if (!decodedToken) {
              res.status(401).json({ message: 'Invalid token' });
            }
            const adminId = decodedToken.id;
        const query = 'SELECT * FROM caja_usuarios WHERE adminId = ?';
        const bebidas: any = await pool.promise().query(query, [adminId])
          .then(bebidas => bebidas[0])
          .catch(err => console.log(err));
    
        res.json(bebidas);
    }
}
    
    public async getOne(req: Request, res: Response){
        if(req.headers['authorization'] === undefined){
            res.status(200).json({message: 'Unauthorized'})
          }else{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            
            if (!tokenWithoutBearer) {
              res.status(401).json({ message: 'Unauthorized' });
            }
        
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
            if (!decodedToken) {
              res.status(401).json({ message: 'Invalid token' });
            }
            const adminId = decodedToken.id;
        const userId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM caja_usuarios WHERE id = ? AND adminId = ?';
        const user: any = await pool.promise().query(query, [userId, adminId])
            .then(user => user[0])
            .catch(err => console.log(err));


        if (user.length > 0) {
            res.json(user);
        } else {
            res.status(404).json({ text: "el usuario no existe" });
        }
    }
    }

    public async create (req: Request, res: Response) {
        if(req.headers['authorization'] === undefined){
            res.status(200).json({message: 'Unauthorized'})
          }else{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            
            if (!tokenWithoutBearer) {
              res.status(401).json({ message: 'Unauthorized' });
            }
        
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
            if (!decodedToken) {
              res.status(401).json({ message: 'Invalid token' });
            }
            const adminId = decodedToken.id;
        var { password } = req.body;
        password = password.trim();
        const NewUserCaja: any = {
            username: req.body.username.trim(),
            password,
            fullname: req.body.fullname.trim(),
            numero_caja: req.body.numero_caja,
            sucursal_id: req.body.sucursal_id,
            adminId: adminId
        }
        const existingUser:any = await pool.promise().query('SELECT * FROM caja_usuarios WHERE username = ?', [NewUserCaja.username])
        .then(rows => rows)
        .catch(err => console.log(err));
  
      if (existingUser[0][0]) {
        console.log(existingUser[0][0]);
        res.status(500).json({text : "El nombre de usuario ya existe, por favor elija otro"})
      }else{
        NewUserCaja.password = await helpers.encryptPassword(password);

        await pool.promise().query('INSERT INTO caja_usuarios SET ?', [NewUserCaja])
            .then(() => {
                res.json({text : "Usuarios Guardado"})
        })
            .catch(err => {
                console.log("Error al guardar el usuario: ", err);
                res.status(500).json({text : "Error al guardar el usuario"});
            });        
      }

        }
    }
    public async update (req: Request, res: Response){
        if(req.headers['authorization'] === undefined){
            res.status(200).json({message: 'Unauthorized'})
          }else{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            
            if (!tokenWithoutBearer) {
              res.status(401).json({ message: 'Unauthorized' });
            }
        
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
            if (!decodedToken) {
              res.status(401).json({ message: 'Invalid token' });
            }
            const adminId = decodedToken.id;
        const userId = req.params.id;
        var { password } = req.body;
        password = password.trim();
        const NewUserCaja: any = {
            username: req.body.username.trim(),
            password,
            fullname: req.body.fullname.trim(),
            numero_caja: req.body.numero_caja,
            sucursal_id: req.body.sucursal_id
        }
        const existingUser1:any = await pool.promise().query('SELECT * FROM caja_usuarios WHERE username = ?', [NewUserCaja.username])
        .then(rows => rows)
        .catch(err => console.log(err));
        const existingUser:any = await pool.promise().query('SELECT * FROM caja_usuarios WHERE id = ? AND adminId = ?', [userId, adminId])
        .then(rows => rows)
        .catch(err => console.log(err));
        console.log(existingUser);
        if (!existingUser1[0][0]) {
            if (existingUser[0][0].password !== password) {
              NewUserCaja.password = await helpers.encryptPassword(password);
              const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
              await pool.promise().query(query, [NewUserCaja, userId, adminId])
                  .then(() => {
                      res.json({ message: 'Usuario actualizado' });
                  })
                  .catch(err => {
                      console.error('Error al actualizar el usuario:', err);
                      res.status(500).json({ error: 'Error al actualizar el usuario' });
                  })
            }else{
              const NewUserCaja1: any = {
                username: req.body.username.trim(),
                fullname: req.body.fullname.trim(),
                numero_caja: req.body.numero_caja,
                sucursal_id: req.body.sucursal_id
            }
              const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
              await pool.promise().query(query, [NewUserCaja1, userId, adminId])
                  .then(() => {
                      res.json({ message: 'Usuario actualizado' });
                  })
                  .catch(err => {
                      console.error('Error al actualizar el usuario:', err);
                      res.status(500).json({ error: 'Error al actualizar el usuario' });
                  })
            }    
          
          }else{
            if (existingUser[0][0].username === NewUserCaja.username) {
              if (existingUser[0][0].password !== password) {
                NewUserCaja.password = await helpers.encryptPassword(password);
                const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                await pool.promise().query(query, [NewUserCaja, userId, adminId])
                    .then(() => {
                        res.json({ message: 'Usuario actualizado' });
                    })
                    .catch(err => {
                        console.error('Error al actualizar el usuario:', err);
                        res.status(500).json({ error: 'Error al actualizar el usuario' });
                    })
              }else{
                const NewUserCaja1: any = {
                  username: req.body.username.trim(),
                  fullname: req.body.fullname.trim(),
                  numero_caja: req.body.numero_caja,
                  sucursal_id: req.body.sucursal_id
              }
                const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                await pool.promise().query(query, [NewUserCaja1, userId, adminId])
                    .then(() => {
                        res.json({ message: 'Usuario actualizado' });
                    })
                    .catch(err => {
                        console.error('Error al actualizar el usuario:', err);
                        res.status(500).json({ error: 'Error al actualizar el usuario' });
                    })
              }  
            }else{
              if(existingUser1[0][0]){
                res.status(500).json({text : "El nombre de usuario ya existe, por favor elija otro"})     
              }else{
                if (existingUser[0][0].password !== password) {
                  NewUserCaja.password = await helpers.encryptPassword(password);
                  const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                  await pool.promise().query(query, [NewUserCaja, userId, adminId])
                      .then(() => {
                          res.json({ message: 'Usuario actualizado' });
                      })
                      .catch(err => {
                          console.error('Error al actualizar el usuario:', err);
                          res.status(500).json({ error: 'Error al actualizar el usuario' });
                      })
                }else{
                  const NewUserCaja1: any = {
                    username: req.body.username.trim(),
                    fullname: req.body.fullname.trim(),
                    numero_caja: req.body.numero_caja,
                    sucursal_id: req.body.sucursal_id
                }
                  const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                  await pool.promise().query(query, [NewUserCaja1, userId, adminId])
                      .then(() => {
                          res.json({ message: 'Usuario actualizado' });
                      })
                      .catch(err => {
                          console.error('Error al actualizar el usuario:', err);
                          res.status(500).json({ error: 'Error al actualizar el usuario' });
                      })
                }  
              }
            }
            
          }
        }
    }
    public async delete (req: Request, res: Response){
        if(req.headers['authorization'] === undefined){
            res.status(200).json({message: 'Unauthorized'})
          }else{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            
            if (!tokenWithoutBearer) {
              res.status(401).json({ message: 'Unauthorized' });
            }
        
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
            if (!decodedToken) {
              res.status(401).json({ message: 'Invalid token' });
            }
            const adminId = decodedToken.id;
        const userId = req.params.id; // ID del juego a eliminar
        const query = 'DELETE FROM caja_usuarios WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [userId, adminId])
            .then(() => {
                res.json({ text: 'Usuario eliminado' });
            })
            .catch(err => {
                console.error('Error al eliminar el usuario:', err);
                res.status(500).json({ error: 'Error al eliminar el usuario' });
            })
        }
    }
}

const cajaController = new CajaController();
export default cajaController