import {Request, Response} from 'express';
import pool from '../../../database';
import jwt, {TokenExpiredError} from 'jsonwebtoken';

class CrepaSaladaPreciosController {
    
    public async list(req: Request, res: Response): Promise<void> {
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
            const adminId = decodedToken.id
        const query = 'SELECT * FROM csp WHERE adminId = ?';
        const precios: any = await pool.promise().query(query, [adminId])
          .then(precios => precios[0])
          .catch(err => console.log(err));
    
        res.json(precios);
      }catch (error:any) {
        if (error instanceof TokenExpiredError) {
          res.status(401).json({ message: 'Token expired' });
        } else {
          res.status(401).json({ message: 'Unknown Error' });
        }
      } 
    }
        
    }

    public async getOne(req: Request, res: Response){
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
            const adminId = decodedToken.id
        const precioId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM csp WHERE id = ? AND adminId = ?';
        const precios: any = await pool.promise().query(query, [precioId, adminId])
            .then(precios => precios[0])
            .catch(err => console.log(err));


        if (precios.length > 0) {
            res.json(precios);
        } else {
            res.status(404).json({ text: "el precio no existe" });
        }}catch (error:any) {
          if (error instanceof TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
          } else {
            res.status(401).json({ message: 'Unknown Error' });
          }
        }
    }
    }

    public async create(req: Request, res: Response): Promise<void> {
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
            const adminId = decodedToken.id
        const precio = {
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            adminId: adminId
        }
          await pool.promise().query('INSERT INTO csp SET ?', [precio])
          .then(() => {
              res.json({ text: 'precio guardada' });
          })
          .catch(err => {
              console.error('Error al guardar el precio:', err);
              res.status(500).json({ error: 'Error al guardar el precio' });
          });}catch (error:any) {
            if (error instanceof TokenExpiredError) {
              res.status(401).json({ message: 'Token expired' });
            } else {
              res.status(401).json({ message: 'Unknown Error' });
            }
          }
        }
    }

    public async delete(req: Request, res: Response){
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
            const adminId = decodedToken.id
        const precioId = req.params.id; // ID del juego a eliminar
        const query = 'DELETE FROM csp WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [precioId,adminId])
            .then(() => {
                res.json({ text: 'precio eliminado' });
            })
            .catch(err => {
                console.error('Error al eliminar el precio:', err);
                res.status(500).json({ error: 'Error al eliminar el precio' });
            });}catch (error:any) {
              if (error instanceof TokenExpiredError) {
                res.status(401).json({ message: 'Token expired' });
              } else {
                res.status(401).json({ message: 'Unknown Error' });
              }
            }
        }
    }

    public async update(req: Request, res: Response){
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
            const adminId = decodedToken.id
        const precioId = req.params.id; // ID del juego a actualizar
        const precio = {
            descripcion: req.body.descripcion,
            precio: req.body.precio
        }
        const query = 'UPDATE csp SET ? WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [precio, precioId, adminId])
            .then(() => {
                res.json({ message: 'precio actualizado' });
            })
            .catch(err => {
                console.error('Error al actualizar el precio:', err);
                res.status(500).json({ error: 'Error al actualizar el precio' });
            });}catch (error:any) {
              if (error instanceof TokenExpiredError) {
                res.status(401).json({ message: 'Token expired' });
              } else {
                res.status(401).json({ message: 'Unknown Error' });
              }
            }
        }
    }
}


const crepaSaladaPController = new CrepaSaladaPreciosController();
export default crepaSaladaPController;