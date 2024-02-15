import {Request, Response} from 'express';
import pool from '../../../database';
import pool1 from '../../../databaseuser';
import jwt, {TokenExpiredError} from 'jsonwebtoken'

class CrepaDulceHarinaController {
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
        const query = 'SELECT * FROM cdth WHERE adminId = ?';
        const harinas: any = await pool.promise().query(query, [adminId])
          .then(harinas => harinas[0])
          .catch(err => console.log(err));
    
        res.json(harinas);      }catch (error:any) {
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
        const harinaId = req.params.id; 
        const query = 'SELECT * FROM cdth WHERE id = ? AND adminId = ?';
        const harinas: any = await pool.promise().query(query, [harinaId, adminId])
            .then(harinas => harinas[0])
            .catch(err => console.log(err));


        if (harinas.length > 0) {
            res.json(harinas);
        } else {
            res.status(404).json({ text: "La harina no existe" });
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
      } else {
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
          var harinaId:any;
          const harina = req.body.harina;
          await pool.promise().query('INSERT INTO cdth SET ?', {harina:harina, inventario: req.body.inventario, adminId: adminId})
          .then((result:any) => {
              harinaId = result[0].insertId;
              res.json({ text: 'harina guardada' });
          })
          .catch(err => {
              console.error('Error al guardar la harina:', err);
              res.status(500).json({ error: 'Error al guardar la harina' });
          });
          await pool1.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
          .then ((sucursales:any) => {
            sucursales[0].forEach(async (sucursal:any) => {

              const registro = {
                sucursal_id: sucursal.id,
                product_id: harinaId,
                harina: harina, 
                cantidad: req.body.inventario,
                adminId: adminId
              }
              console.log(registro)
              await pool.promise().query('INSERT INTO cdthe SET ?', [registro])
              .then(() => {
                console.log('registro de existencias guardado')
              })
              .catch(err => {
                console.log(err)
              })
            })
          })
          .catch(err => {console.log(err)})
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
      } else {
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
          const harinaId = req.params.id; // ID de la harina a eliminar
          const query = 'DELETE FROM cdth WHERE id = ? AND adminId = ?';
          await pool.promise().query(query, [harinaId, adminId])
              .then(() => {
                  res.json({ text: 'harina eliminada' });
              })
              .catch(err => {
                  console.error('Error al eliminar la harina:', err);
                  res.status(500).json({ error: 'Error al eliminar la harina' });
              });

          // Eliminar harina ventas y existencias
          await pool.promise().query('DELETE FROM cdthe WHERE product_id = ? AND adminId = ?', [harinaId, adminId])
          .then(() => {
            console.log('registro de existencias eliminado')
          })
          .catch(err => {
            console.error('Error al eliminar el registro de existencias:', err);
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
      } else {
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
          const harinaId = req.params.id; // ID de la harina a actualizar
          const query1 = 'SELECT * FROM cdth WHERE id = ? AND adminId = ?';
          const ingrediente: any = await pool.promise().query(query1, [harinaId, adminId])
              .then(bebidas => bebidas[0])
              .catch(err => console.log(err));
              if(parseInt(inventario) === ingrediente[0].inventario){
          const query = 'UPDATE cdth SET ? WHERE id = ? AND adminId = ?';
          await pool.promise().query(query, [{harina:req.body.harina}, harinaId, adminId])
              .then(() => {
                  res.json({ message: 'harina actualizada' });
              })
              .catch(err => {
                  console.error('Error al actualizar la harina:', err);
                  res.status(500).json({ error: 'Error al actualizar la harina' });
              });

          // Update harina ventas y existencias

          await pool.promise().query('UPDATE cdthe SET ? WHERE product_id = ? AND adminId = ?', [{harina: req.body.harina}, harinaId, adminId])
          .then(() => {
            console.log('registro de existencias actualizado')
          })
          .catch(err => {
            console.log(err)
          })
              }else{
                const query = 'UPDATE cdth SET ? WHERE id = ? AND adminId = ?';
                await pool.promise().query(query, [{harina:req.body.harina, inventario: parseInt(inventario)}, harinaId, adminId])
                    .then(() => {
                        res.json({ message: 'harina actualizada' });
                    })
                    .catch(err => {
                        console.error('Error al actualizar la harina:', err);
                        res.status(500).json({ error: 'Error al actualizar la harina' });
                    });
      
                // Update harina ventas y existencias
      
                await pool.promise().query('UPDATE cdthe SET ? WHERE product_id = ? AND adminId = ?', [{harina: req.body.harina, cantidad: parseInt(inventario),inventario: 0, existencia: 0}, harinaId, adminId])
                .then(() => {
                  console.log('registro de existencias actualizado')
                })
                .catch(err => {
                  console.log(err)
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


const crepaDulceHController = new CrepaDulceHarinaController();
export default crepaDulceHController;