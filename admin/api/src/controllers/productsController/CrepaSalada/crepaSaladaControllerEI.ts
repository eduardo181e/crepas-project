import {Request, Response} from 'express';
import pool from '../../../database';
import pool1 from '../../../databaseuser';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import { admin } from '../../../models/models';

class CrepaSaladaEnsaladaIndividualController {
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

        const query = 'SELECT * FROM csei WHERE adminId = ?';
        const ensaladas: any = await pool.promise().query(query, [adminId])
          .then(ensaladas => ensaladas[0])
          .catch(err => console.log(err));
    
        res.json(ensaladas);   }catch (error:any) {
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
        const ensaladaId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM csei WHERE id = ? AND adminId = ?';
        const ensaladas: any = await pool.promise().query(query, [ensaladaId, adminId])
            .then(ensaladas => ensaladas[0])
            .catch(err => console.log(err));


        if (ensaladas.length > 0) {
            res.json(ensaladas);
        } else {
            res.status(404).json({ text: "La ensalada no existe" });
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

            var ensaladaId:any;
          const Ensalada = {
            ensalada_ind: req.body.ensalada_ind.trim(),
            descripcion: req.body.descripcion.trim(),
            inventario: req.body.inventario,
            adminId: adminId
        }
          await pool.promise().query('INSERT INTO csei SET ?', [Ensalada])
          .then((result:any) => {
              ensaladaId = result[0].insertId;
              res.json({ text: 'ensalada guardada' });
          })
          .catch(err => {
              console.error('Error al guardar la ensalada:', err);
              res.status(500).json({ error: 'Error al guardar la ensalada' });
          });

          // Crear registro de ventas y existencias
          await pool1.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
          .then((sucursales:any) => {
            sucursales[0].forEach(async (sucursal:any) => {
              const registro = {
                sucursal_id: sucursal.id,
                product_id: ensaladaId,
                ensalada_ind: Ensalada.ensalada_ind,
                descripcion: Ensalada.descripcion,
                cantidad: Ensalada.inventario,
                adminId: adminId
              }
              console.log(registro)
              await pool.promise().query('INSERT INTO cseie SET ?', [registro])
              .then(() => {
                console.log('registro de existencias guardado')
              })
              .catch(err => {
                console.error('Error al guardar el registro de existencias:', err);
              })
            })
          })}catch (error:any) {
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

        const ensaladaId = req.params.id; // ID del juego a eliminar
        const query = 'DELETE FROM csei WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [ensaladaId, adminId])
            .then(() => {
                res.json({ text: 'ensalada eliminada' });
            })
            .catch(err => {
                console.error('Error al eliminar la ensalada:', err);
                res.status(500).json({ error: 'Error al eliminar la ensalada' });
            });
          // Eliminar registro de existencias y ventas
          await pool.promise().query('DELETE FROM cseie WHERE product_id = ? AND adminId = ?', [ensaladaId, adminId]) 
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
        const ensaladaId = req.params.id; // ID del juego a actualizar
        const Ensalada:any = {
            ensalada_ind: req.body.ensalada_ind.trim(),
            descripcion: req.body.descripcion.trim(),
            inventario: inventario
        }
        const query = 'SELECT * FROM csei WHERE id = ? AND adminId = ?';
        const ensalada: any = await pool.promise().query(query, [ensaladaId, adminId])
            .then(ensalada => ensalada[0])  
            .catch(err => console.log(err));
        if(parseInt(inventario) === ensalada[0].inventario){
          delete Ensalada.inventario;
        const query = 'UPDATE csei SET ? WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [Ensalada, ensaladaId, adminId])
            .then(() => {
                res.json({ message: 'ensalada actualizada' });
            })
            .catch(err => {
                console.error('Error al actualizar la ensalada:', err);
                res.status(500).json({ error: 'Error al actualizar la ensalada' });
            });
            delete Ensalada.inventario;
          // Actualizar registro de existencias y ventas
          await pool.promise().query('UPDATE cseie SET ? WHERE product_id = ? AND adminId = ?', [Ensalada, ensaladaId, adminId])
          .then(() => {
            console.log('registro de existencias actualizado')
          })
          .catch(err => {
            console.error('Error al actualizar el registro de existencias:', err);
          });

        }else{
          const query = 'UPDATE csei SET ? WHERE id = ? AND adminId = ?';
          await pool.promise().query(query, [Ensalada, ensaladaId, adminId])
              .then(() => {
                  res.json({ message: 'ensalada actualizada' });
              })
              .catch(err => {
                  console.error('Error al actualizar la ensalada:', err);
                  res.status(500).json({ error: 'Error al actualizar la ensalada' });
              });
              delete Ensalada.inventario;
              Ensalada.cantidad = parseInt(inventario)
              Ensalada.inventario = 0;
              Ensalada.existencia = 0
            // Actualizar registro de existencias y ventas
            await pool.promise().query('UPDATE cseie SET ? WHERE product_id = ? AND adminId = ?', [Ensalada, ensaladaId, adminId])
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


const crepaSaladaEIController = new CrepaSaladaEnsaladaIndividualController();
export default crepaSaladaEIController;