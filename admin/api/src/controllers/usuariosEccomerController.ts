import {Request, Response} from 'express';
import helpers from '../lib/helpers';
import pool from '../databaseuser';
import jwt from 'jsonwebtoken'
import { admin } from '../models/models';

class EccomerController {


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
            const fullname = decodedToken.fullname
            if(fullname === admin){
        const query = 'SELECT * FROM usuarios';
        const bebidas: any = await pool.promise().query(query)
          .then(bebidas => bebidas[0])
          .catch(err => console.log(err));
    
        res.json(bebidas);}else{
            res.status(200).json({message: 'Unauthorized'})
        } 
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
            const fullname = decodedToken.fullname
            if(fullname === admin){
        const userId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        const user: any = await pool.promise().query(query, [userId])
            .then(user => user[0])
            .catch(err => console.log(err));


        if (user.length > 0) {
            res.json(user);
        } else {
            res.status(404).json({ text: "el usuario no existe" });
        }}else{
            res.status(200).json({message: 'Unauthorized'})
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
            const fullname = decodedToken.fullname
            if(fullname === admin){
        const { password } = req.body;
        const NewUserCaja: any = {
            username: req.body.username,
            password,
            fullname: req.body.fullname
        }
        NewUserCaja.password = await helpers.encryptPassword(password);

        await pool.promise().query('INSERT INTO usuarios SET ?', [NewUserCaja])
            .then(() => {
                res.json({text : "Usuarios Guardado"})
        })
            .catch(err => {
                console.log("Error al guardar el usuario: ", err);
                res.status(500).json({text : "Error al guardar el usuario"});
            });}else{
                res.status(200).json({message: 'Unauthorized'})
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
            const fullname = decodedToken.fullname
            if(fullname === admin){
        const userId = req.params.id; // ID del juego a actualizar
        const { password } = req.body;
        const NewUserCaja: any = {
            username: req.body.username,
            password,
            fullname: req.body.fullname
        }
        NewUserCaja.password = await helpers.encryptPassword(password);
        const query = 'UPDATE usuarios SET ? WHERE id = ?';
        await pool.promise().query(query, [NewUserCaja, userId])
            .then(() => {
                res.json({ message: 'Usuario actualizado' });
            })
            .catch(err => {
                console.error('Error al actualizar el usuario:', err);
                res.status(500).json({ error: 'Error al actualizar el usuario' });
            })}else{
                res.status(200).json({message: 'Unauthorized'})
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
            const fullname = decodedToken.fullname
            if(fullname === admin){
        const userId = req.params.id; // ID del juego a eliminar
        const query = 'DELETE FROM usuarios WHERE id = ?';
        await pool.promise().query(query, [userId])
            .then(() => {
                res.json({ text: 'Usuario eliminado' });
            })
            .catch(err => {
                console.error('Error al eliminar el usuario:', err);
                res.status(500).json({ error: 'Error al eliminar el usuario' });
            })}else{
                res.status(200).json({message: 'Unauthorized'})
            }
        }
    }
}

const eccomerController = new EccomerController();
export default eccomerController