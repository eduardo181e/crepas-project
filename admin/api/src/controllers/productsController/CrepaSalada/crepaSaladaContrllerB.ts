import {Request, Response} from 'express';
import pool from '../../../database';
import pool1 from '../../../databaseuser';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import { admin } from '../../../models/models';
import { botana } from './modelo';

class CrepaSaladaBotanaController {
    
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
        const query = 'SELECT * FROM csb WHERE adminId = ?';
        const botanas: any = await pool.promise().query(query, [adminId])
          .then(botanas => botanas[0])
          .catch(err => console.log(err));
    
        res.json(botanas); }catch (error:any) {
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
        const botanaId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM csb WHERE id = ? AND adminId = ?';
        const botanas: any = await pool.promise().query(query, [botanaId, adminId])
            .then(botanas => botanas[0])
            .catch(err => console.log(err));


        if (botanas.length > 0) {
            res.json(botanas);
        } else {
            res.status(404).json({ text: "La botana no existe" });
        } }catch (error:any) {
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
            res.status(401).json({message: 'Unauthorized'})
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
        var botanaId:any;
        const botana = {
            botana: req.body.botana,
            precio: req.body.precio,
            inventario: req.body.inventario,
            adminId: adminId
        }
          await pool.promise().query('INSERT INTO csb SET ?', [botana])
          .then((result:any) => {
            botanaId = result[0].insertId;
              res.json({ text: 'botana guardada' });
          })
          .catch(err => {
              console.error('Error al guardar la botana:', err);
              res.status(500).json({ error: 'Error al guardar la botana' });
          });
        // Crear registro de ventas y existencias
          await pool1.promise().query('SELECT * FROM sucursales AND adminId = ?', [adminId])
          .then((sucursales:any) => {
            sucursales[0].forEach(async (sucursal:any) => {
              const registro = {
                sucursal_id: sucursal.id,
                product_id: botanaId,
                botana: botana.botana,
                cantidad: botana.inventario,
                adminId: adminId
              }
              await pool.promise().query('INSERT INTO csbe SET ?', [registro])
              .then(() => {
                console.log('registro de existencias guardado')
              })
              .catch(err => {
                console.error('Error al guardar el registro de existencias:', err);
              });
            })
          })}catch (error:any) {
            if (error instanceof TokenExpiredError) {
              res.status(401).json({ message: 'Token expired' });
            } else {
              res.status(401).json({ message: 'Unknown Error' });
            }
          }}
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
        const botanaId = req.params.id; // ID del juego a eliminar
        const query = 'DELETE FROM csb WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [botanaId, adminId])
            .then(() => {
                res.json({ text: 'botana eliminada' });
            })
            .catch(err => {
                console.error('Error al eliminar la botana:', err);
                res.status(500).json({ error: 'Error al eliminar la botana' });
            });
          // Eliminar registro de existencias y ventas
          await pool.promise().query('DELETE FROM csbe WHERE product_id = ? AND adminId', [botanaId, adminId])
          .then(() => {
            console.log('registro de existencias eliminado')
          })
          .catch(err => {
            console.error('Error al eliminar el registro de existencias:', err);
          }); }catch (error:any) {
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
        const inventario = req.body.inventario;
        const botanaId = req.params.id; // ID del juego a actualizar
        const botana: botana = {
            botana: req.body.botana,
            precio: req.body.precio
        }
        const query = 'SELECT * FROM csb WHERE id = ? AND adminId = ?';
        const botanas: any = await pool.promise().query(query, [botanaId, adminId])
            .then(botanas => botanas[0])
            .catch(err => console.log(err)); 
            if(botanas[0].inventario === parseInt(inventario)){
        const query = 'UPDATE csb SET ? WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [botana, botanaId, adminId])
            .then(() => {
                res.json({ message: 'botana actualizada' });
            })
            .catch(err => {
                console.error('Error al actualizar la botana:', err);
                res.status(500).json({ error: 'Error al actualizar la botana' });
            });
          // Actualizar registro de existencias y ventas
          await pool.promise().query('UPDATE csbe SET ? WHERE product_id = ? AND adminId = ?', [{botana: botana.botana}, botanaId, adminId])
          .then(() => {
            console.log('registro de existencias actualizado')
          })
          .catch(err => {
            console.error('Error al actualizar el registro de existencias:', err);
          });}else{
            botana.inventario = parseInt(inventario);
            const query = 'UPDATE csb SET ? WHERE id = ? AND adminId = ?';
            await pool.promise().query(query, [botana, botanaId, adminId])
                .then(() => {
                    res.json({ message: 'botana actualizada' });
                })
                .catch(err => {
                    console.error('Error al actualizar la botana:', err);
                    res.status(500).json({ error: 'Error al actualizar la botana' });
                });
              // Actualizar registro de existencias y ventas
              await pool.promise().query('UPDATE csbe SET ? WHERE product_id = ? AND adminId = ?', [{botana: botana.botana, cantidad: parseInt(inventario), inventario: 0, existencia: 0}, botanaId, adminId])
              .then(() => {
                console.log('registro de existencias actualizado')
              })
              .catch(err => {
                console.error('Error al actualizar el registro de existencias:', err);
              });
          }}catch (error:any) {
              if (error instanceof TokenExpiredError) {
                res.status(401).json({ message: 'Token expired' });
              } else {
                res.status(401).json({ message: 'Unknown Error' });
              }
            }
        }
    }
}


const crepaSaladaBController = new CrepaSaladaBotanaController();
export default crepaSaladaBController;