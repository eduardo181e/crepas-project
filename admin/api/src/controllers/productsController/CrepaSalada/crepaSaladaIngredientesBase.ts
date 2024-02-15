import {Request, Response} from 'express';
import pool from '../../../database';
import pool1 from '../../../databaseuser';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
class CrepaSaladaIngredienteBaseController {
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
        const query = 'SELECT * FROM csib WHERE adminId = ?';
        const ingredientes: any = await pool.promise().query(query, [adminId])
          .then(ingredientes => ingredientes[0])
          .catch(err => console.log(err));
    
        res.json(ingredientes);}catch (error:any) {
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
        const ingredienteId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM csib WHERE id = ? AND adminId = ?';
        const ingredientes: any = await pool.promise().query(query, [ingredienteId, adminId])
            .then(ingredientes => ingredientes[0])
            .catch(err => console.log(err));


        if (ingredientes.length > 0) {
            res.json(ingredientes); // No uses return aquí
        } else {
            res.status(404).json({ text: "El ingrediente no existe" });
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
          var ingredienteId:any;
          const ingrediente_base = req.body.ingrediente_base;
          await pool.promise().query('INSERT INTO csib SET ?', {ingrediente_base:ingrediente_base, inventario: parseInt(req.body.inventario), adminId: adminId})
          .then((result:any) => {
              ingredienteId = result[0].insertId;
              res.json({ text: 'Ingrediente guardado' });
          })
          .catch(err => {
              console.error('Error al guardar el ingrediente:', err);
              res.status(500).json({ error: 'Error al guardar el ingrediente' });
          });
          
          await pool1.promise().query('SELECT * FROM sucursales AND adminId = ?', [adminId])
          .then((sucursales:any) => {
            sucursales[0].forEach(async (sucursal:any) => {
              const registro = {
                product_id: ingredienteId,
                sucursal_id: sucursal.id,
                ingrediente_base: ingrediente_base,
                cantidad: parseInt(req.body.inventario),
                adminId: adminId
              }

              await pool.promise().query('INSERT INTO csibe SET ?', [registro])
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
        const ingredienteId = req.params.id; // ID del juego a eliminar
        const query = 'DELETE FROM csib WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [ingredienteId, adminId])
            .then(() => {
                res.json({ text: 'Ingrediente eliminado' });
            })
            .catch(err => {
                console.error('Error al eliminar el ingrediente:', err);
                res.status(500).json({ error: 'Error al eliminar el ingrediente' });
            });
          // Eliminar registro de existencias y ventas

          await pool.promise().query('DELETE FROM csibe WHERE product_id = ? AND adminId = ?', [ingredienteId, adminId])
          .then(() => {
            console.log('registro de existencias eliminado')
          })
          .catch(err => {
            console.error('Error al eliminar el registro de existencias:', err);
          })}catch (error:any) {
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
        const ingredienteId = req.params.id; 
        const query = 'SELECT * FROM csib WHERE id = ? AND adminId = ?';
        const ingredienteBase:any = await pool.promise().query(query, [ingredienteId, adminId])
            .then(ingredienteBase => ingredienteBase[0])
            .catch(err => console.log(err));
        if(ingredienteBase[0].inventario === parseInt(inventario)){
        const query = 'UPDATE csib SET ? WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [{ingrediente_base:req.body.ingrediente_base}, ingredienteId, adminId])
            .then(() => {
                res.json({ message: 'Ingrediente actualizado' });
            })
            .catch(err => {
                console.error('Error al actualizar el ingrediente:', err);
                res.status(500).json({ error: 'Error al actualizar el ingrediente' });
            });
          // Actualizar registro de existencias y ventas
          await pool.promise().query('UPDATE csibe SET ? WHERE product_id = ? AND adminId = ?', [{ingrediente_base:req.body.ingrediente_base}, ingredienteId, adminId])
          .then(() => {
            console.log('registro de existencias actualizado')
          })
          .catch(err => {
            console.error('Error al actualizar el registro de existencias:', err);
          })     
        }else{
          const query = 'UPDATE csib SET ? WHERE id = ? AND adminId = ?';
          await pool.promise().query(query, [{ingrediente_base:req.body.ingrediente_base, inventario: parseInt(inventario)}, ingredienteId, adminId])
              .then(() => {
                  res.json({ message: 'Ingrediente actualizado' });
              })
              .catch(err => {
                  console.error('Error al actualizar el ingrediente:', err);
                  res.status(500).json({ error: 'Error al actualizar el ingrediente' });
              });
            // Actualizar registro de existencias y ventas
            await pool.promise().query('UPDATE csibe SET ? WHERE product_id = ? AND adminId = ?', [{ingrediente_base:req.body.ingrediente_base, cantidad: parseInt(inventario), inventario: 0, existencia: 0}, ingredienteId, adminId])
            .then(() => {
              console.log('registro de existencias actualizado')
            })
            .catch(err => {
              console.error('Error al actualizar el registro de existencias:', err);
            })     
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


const crepaSaladaIBController = new CrepaSaladaIngredienteBaseController();
export default crepaSaladaIBController;