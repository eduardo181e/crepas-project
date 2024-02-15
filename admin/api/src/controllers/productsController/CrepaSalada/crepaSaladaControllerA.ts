import {Request, Response} from 'express';
import pool from '../../../database';
import pool1 from '../../../databaseuser';
import jwt, {TokenExpiredError} from 'jsonwebtoken';

class CrepaSaladaAderesoController {
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
        const query = 'SELECT * FROM csa WHERE adminId = ?';
        const aderesos: any = await pool.promise().query(query, [adminId])
          .then(aderesos => aderesos[0])
          .catch(err => console.log(err));
    
        res.json(aderesos); }catch (error:any) {
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
        const aderesoId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM csa WHERE id = ? AND adminId = ?';
        const aderesos: any = await pool.promise().query(query, [aderesoId, adminId])
            .then(aderesos => aderesos[0])
            .catch(err => console.log(err));


        if (aderesos.length > 0) {
            res.json(aderesos);
        } else {
            res.status(404).json({ text: "El adereso no existe" });
        }}catch (error:any) {
          if (error instanceof TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
          } else {
            res.status(401).json({ message: 'Unknown Error' });
          }
        }}
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
          var aderesoId:any;
          const adereso = req.body.adereso;
          await pool.promise().query('INSERT INTO csa SET ?', {adereso:adereso, inventario: req.body.inventario, adminId: adminId})
          .then((result:any) => {
              aderesoId = result[0].insertId;
              res.json({ text: 'adereso guardado' });
          })
          .catch(err => {
              console.error('Error al guardar el adereso:', err);
              res.status(500).json({ error: 'Error al guardar el adereso' });
          });
          await pool1.promise().query('SELECT * FROM sucursales AND adminId = ?', [adminId])
          .then ((sucursales:any) => {
            sucursales[0].forEach(async (sucursal:any) => {

              const registro = {
                sucursal_id: sucursal.id,
                product_id: aderesoId,
                adereso: adereso,
                cantidad: req.body.inventario,
                adminId: adminId
              }
              console.log(registro)
              await pool.promise().query('INSERT INTO csae SET ?', [registro])
              .then(() => {
                console.log('registro de existencias guardado')
              })
              .catch(err => {
                console.log(err)
              })
            })
          })
          .catch(err => {console.log(err)})}catch (error:any) {
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

        const aderesoId = req.params.id; // ID del juego a eliminar
        const query = 'DELETE FROM csa WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [aderesoId, adminId])
            .then(() => {
                res.json({ text: 'adereso eliminado' });
            })
            .catch(err => {
                console.error('Error al eliminar el adereso:', err);
                res.status(500).json({ error: 'Error al eliminar el adereso' });
            });

            // Eliminar adereso ventas y existencias
        await pool.promise().query('DELETE FROM csae WHERE product_id = ? AND adminId = ?', [aderesoId, adminId])
        .then(() => {
          console.log('registro de existencias eliminado')
        })
        .catch(err => {
          console.log(err)
        }) }catch (error:any) {
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
        const aderesoId = req.params.id; // ID del juego a actualizar
        const query = 'SELECT * FROM csa WHERE id = ? AND adminId = ?';
        const aderesos: any = await pool.promise().query(query, [aderesoId, adminId])
            .then(aderesos => aderesos[0])
            .catch(err => console.log(err));
        if(parseInt(inventario) === aderesos[0].inventario){
        const query = 'UPDATE csa SET ? WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [{adereso:req.body.adereso.trim()}, aderesoId, adminId])
            .then(() => {
                res.json({ message: 'adereso actualizado' });
            })
            .catch(err => {
                console.error('Error al actualizar el adereso:', err);
                res.status(500).json({ error: 'Error al actualizar el adereso' });
            });

            // Update adereso ventas y existencias

                await pool.promise().query('UPDATE csae SET ? WHERE product_id = ? AND adminId = ?', [{adereso: req.body.adereso.trim()}, aderesoId, adminId])
                .then(() => {
                  console.log('registro de existencias actualizado')
                })
                .catch(err => {
                  console.log(err)
                })
  

        }else{
          const query = 'UPDATE csa SET ? WHERE id = ? AND adminId = ?';
          await pool.promise().query(query, [{adereso:req.body.adereso.trim(), inventario: parseInt(inventario)}, aderesoId, adminId])
              .then(() => {
                  res.json({ message: 'adereso actualizado' });
              })
              .catch(err => {
                  console.error('Error al actualizar el adereso:', err);
                  res.status(500).json({ error: 'Error al actualizar el adereso' });
              });
  
              // Update adereso ventas y existencias
  
                  await pool.promise().query('UPDATE csae SET ? WHERE product_id = ? AND adminId = ?', [{adereso: req.body.adereso.trim(), cantidad: parseInt(inventario), inventario: 0, existencia: 0}, aderesoId, adminId])
                  .then(() => {
                    console.log('registro de existencias actualizado')
                  })
                  .catch(err => {
                    console.log(err)
                  })
        } }catch (error:any) {
              if (error instanceof TokenExpiredError) {
                res.status(401).json({ message: 'Token expired' });
              } else {
                res.status(401).json({ message: 'Unknown Error' });
              }
            }
        }
    }
}


const crepaSaladaAController = new CrepaSaladaAderesoController();
export default crepaSaladaAController;