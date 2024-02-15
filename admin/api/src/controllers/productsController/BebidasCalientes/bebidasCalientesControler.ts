import {Request, Response} from 'express';
import pool from '../../../database';
import pool1 from '../../../databaseuser';
import jwt, {TokenExpiredError} from 'jsonwebtoken';


class BebidasCalientesController {
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
        const query = 'SELECT * FROM bc WHERE adminId = ?';
        const bebidas: any = await pool.promise().query(query, [adminId])
          .then(bebidas => bebidas[0])
          .catch(err => console.log(err));
    
        res.json(bebidas);    
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
        const bebidaId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM bc WHERE id = ? AND adminId = ?';
        const bebidas: any = await pool.promise().query(query, [bebidaId, adminId])
            .then(bebidas => bebidas[0])
            .catch(err => console.log(err));


        if (bebidas.length > 0) {
            res.json(bebidas);
        } else {
            res.status(404).json({ text: "la bebida no existe" });
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
            var bebidaId:any;
        const bebida = {
            bebida: req.body.bebida.trim(),
            descripcion: req.body.descripcion.trim(),
            precio: req.body.precio,
            inventario: req.body.inventario,
            adminId: adminId
        }
          await pool.promise().query('INSERT INTO bc SET ?', [bebida])
          .then((result:any) => {
            bebidaId = result[0].insertId;
              res.json({ text: 'Bebida guardada' });
          })
          .catch(err => {
              console.error('Error al guardar la bebida:', err);
              res.status(500).json({ error: 'Error al guardar la bebida' });
          });
        // Crear registros de ventas y existencias
        await pool1.promise().query('SELECT * FROM sucursales WHERE adminId = ?',[adminId])
        .then((sucursales:any) => {
          sucursales[0].forEach(async (sucursal:any) => {
            const registro = {
              product_id: bebidaId,
              sucursal_id: sucursal.id,
              bebida: bebida.bebida,
              descripcion: bebida.descripcion,
              cantidad: bebida.inventario,
              adminId: adminId
            }
            await pool.promise().query('INSERT INTO bce SET ?', [registro])
            .then(() => {
              console.log('Registro de existencias creado');
            })
            .catch(err => {
              console.error('Error al crear el registro:', err);
            })
          })
        })
        }catch (error:any) {
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
        const bebidaId = req.params.id; // ID del juego a eliminar
        const query = 'DELETE FROM bc WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [bebidaId, adminId])
            .then(() => {
                res.json({ text: 'Bebida eliminada' });
            })
            .catch(err => {
                console.error('Error al eliminar la bebida:', err);
                res.status(500).json({ error: 'Error al eliminar la bebida' });
            });
          // Eliminar registros de ventas y existencias
          await pool.promise().query('DELETE FROM bce WHERE product_id = ? AND adminId = ?', [bebidaId, adminId])
          .then(() => {
            console.log('Registro de existencias eliminado');
          })
          .catch(err => {
            console.error('Error al eliminar el registro:', err);
          })
          }catch (error:any) {
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
        const bebidaId = req.params.id; // ID del juego a actualizar
        const bebida = {
            bebida: req.body.bebida.trim(),
            descripcion: req.body.descripcion.trim(),
            precio: req.body.precio,
            inventario: req.body.inventario
        }


        const query1 = 'SELECT * FROM bc WHERE id = ? AND adminId = ?';
        const bebidas: any = await pool.promise().query(query1, [bebidaId, adminId])
            .then(bebidas => bebidas[0])
            .catch(err => console.log(err));
        delete bebidas[0].id;
        if(parseInt(bebida.inventario) === bebidas[0].inventario){
          console.log(bebida);
          const query = 'UPDATE bc SET ? WHERE id = ? AND adminId = ?';
          await pool.promise().query(query, [bebida, bebidaId, adminId])
              .then(() => {
                  res.json({ message: 'Bebida actualizada' });
              })
              .catch(err => {
                  console.error('Error al actualizar la bebida:', err);
                  res.status(500).json({ error: 'Error al actualizar la bebida' });
              });
            
              // Actualizar registros de ventas y existencias
              await pool.promise().query('UPDATE bce SET ? WHERE product_id = ? AND adminId = ?', [{bebida: bebida.bebida, descripcion: bebida.descripcion}, bebidaId, adminId])
              .then(() => {
                console.log('Registro de existencias actualizado');
              })
              .catch(err => {
                console.error('Error al actualizar el registro:', err);
              })
        }else{
            const bebidax = {
              cantidad: bebida.inventario,
              inventario: 0,
              existencia: 0
            }
            const query = 'UPDATE bc SET ? WHERE id = ?';
            await pool.promise().query(query, [bebida, bebidaId])
                .then(() => {
                    res.json({ message: 'Bebida actualizada' });
                })
                .catch(err => {
                    console.error('Error al actualizar la bebida:', err);
                    res.status(500).json({ error: 'Error al actualizar la bebida' });
                });
              
                // Actualizar registros de ventas y existencias
                await pool.promise().query('UPDATE bce SET ? WHERE product_id = ? AND adminId = ?', [{bebida: bebida.bebida, descripcion: bebida.descripcion, cantidad: bebidax.cantidad, existencia: bebidax.existencia, inventario: bebidax.inventario}, bebidaId, adminId])
                .then(() => {
                  console.log('Registro de existencias actualizado');
                })
                .catch(err => {
                  console.error('Error al actualizar el registro:', err);
                })
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
}


const bebidasCalientesController = new BebidasCalientesController();
export default bebidasCalientesController;