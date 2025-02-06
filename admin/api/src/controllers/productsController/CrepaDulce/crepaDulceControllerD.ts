import {Request, Response} from 'express';
import pool from '../../../database';
import jwt, {TokenExpiredError} from 'jsonwebtoken'

class CrepaDulcedecoracionController {
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
        const query = 'SELECT * FROM cdd WHERE adminId = ?';
        const decoraciones: any = await pool.promise().query(query, [adminId])
          .then(decoraciones => decoraciones[0])
          .catch(err => console.log(err));
    
        res.json(decoraciones); }catch (error:any) {
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
        const decoracionId = req.params.id; 
        const query = 'SELECT * FROM cdd WHERE id = ? AND adminId = ?';
        const decoraciones: any = await pool.promise().query(query, [decoracionId, adminId])
            .then(decoraciones => decoraciones[0])
            .catch(err => console.log(err));


        if (decoraciones.length > 0) {
            res.json(decoraciones);
        } else {
            res.status(404).json({ text: "La decoracion no existe" });
        } }catch (error:any) {
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
        const decoracionId = req.params.id;
        const query = 'SELECT * FROM cdd WHERE id = ? AND adminId = ?';
        const decoraciones: any = await pool.promise().query(query, [decoracionId, adminId])
            .then(decoraciones => decoraciones[0])
            .catch(err => console.log(err));
        if(decoraciones[0].inventario === parseInt(inventario)){        
          const query = 'UPDATE cdd SET ? WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [{decoracion:req.body.decoracion}, decoracionId, adminId])
            .then(() => {
                res.json({ message: 'decoracion actualizada' });
            })
            .catch(err => {
                console.error('Error al actualizar la decoracion:', err);
                res.status(500).json({ error: 'Error al actualizar la decoracion' });
            });
          // Actualizar registros de venas y existencias de decoraciones
          await pool.promise().query('UPDATE cdde SET ? WHERE product_id = ? AND adminId = ?', [{decoracion:req.body.decoracion}, decoracionId, adminId])
          .then(() => {
            console.log('registro de existencias actualizado')
          })
          .catch(err => {
            console.log(err)
          })
        }else{
            const query = 'UPDATE cdd SET ? WHERE id = ? AND adminId = ?';
            await pool.promise().query(query, [{decoracion:req.body.decoracion, inventario: inventario}, decoracionId, adminId])
                .then(() => {
                    res.json({ message: 'decoracion actualizada' });
                })
                .catch(err => {
                    console.error('Error al actualizar la decoracion:', err);
                    res.status(500).json({ error: 'Error al actualizar la decoracion' });
                });
              // Actualizar registros de venas y existencias de decoraciones
              await pool.promise().query('UPDATE cdde SET ? WHERE product_id = ? AND adminId = ?', [{decoracion:req.body.decoracion, cantidad: inventario, inventario: 0, existencia:0}, decoracionId, adminId])
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


const crepaDulceDController = new CrepaDulcedecoracionController();
export default crepaDulceDController;