import {Request, Response} from 'express';
import pool from '../../../database';
import pool1 from '../../../databaseuser';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import { admin } from '../../../models/models';

class WaflesNieveController {
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
    const query = 'SELECT * FROM wn WHERE adminId = ?';
    const nieves: any = await pool.promise().query(query, [adminId])
      .then(nieves => nieves[0])
      .catch(err => console.log(err));

    res.json(nieves); }catch (error:any) {
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
    const nieveId = req.params.id; 
    const query = 'SELECT * FROM wn WHERE id = ? AND adminId = ?';
    const nieves: any = await pool.promise().query(query, [nieveId, adminId])
        .then(nieves => nieves[0])
        .catch(err => console.log(err));


    if (nieves.length > 0) {
        res.json(nieves);
    } else {
        res.status(404).json({ text: "La nieve no existe" });
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
      var nieveId:any;
      const nieve = req.body.nieve;
      await pool.promise().query('INSERT INTO wn SET ?', {nieve:nieve, inventario: req.body.inventario, adminId: adminId})
      .then((result:any) => {
          nieveId = result[0].insertId;
          res.json({ text: 'nieve guardada' });
      })
      .catch(err => {
          console.error('Error al guardar la nieve:', err);
          res.status(500).json({ error: 'Error al guardar la nieve' });
      });
    
      // Guardar registros de venas y existencias de nieves
      await pool1.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
      .then ((sucursales:any) => {
        sucursales[0].forEach(async (sucursal:any) => {
          const registro = {
            sucursal_id: sucursal.id,
            product_id: nieveId,
            nieve: nieve,
            cantidad: req.body.inventario,
            adminId: adminId
          }
          await pool.promise().query('INSERT INTO wne SET ?', [registro])
          .then(() => {
            console.log('registro de existencias guardado')
          })
          .catch(err => {
            console.log(err)
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
    const nieveId = req.params.id;
    const query = 'DELETE FROM wn WHERE id = ? AND adminId = ?';
    await pool.promise().query(query, [nieveId, adminId])
        .then(() => {
            res.json({ text: 'nieve eliminada' });
        })
        .catch(err => {
            console.error('Error al eliminar la nieve:', err);
            res.status(500).json({ error: 'Error al eliminar la nieve' });
        });
    // Eliminar registros de venas y existencias de nieves
    await pool.promise().query('DELETE FROM wne WHERE product_id = ? AND adminId', [nieveId, adminId])
    .then(() => {
      console.log('registro de existencias eliminado')
    })
    .catch(err => {
      console.log(err)
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
    const inventario = req.body.inventario;
    const nieveId = req.params.id;
    const query = 'SELECT * FROM wn WHERE id = ? AND adminId = ?';
    const nieves: any = await pool.promise().query(query, [nieveId, adminId])
        .then(nieves => nieves[0])
        .catch(err => console.log(err));
    if(nieves[0].inventario === parseInt(inventario)){        
      const query = 'UPDATE wn SET ? WHERE id = ? AND adminId = ?';
    await pool.promise().query(query, [{nieve:req.body.nieve}, nieveId, adminId])
        .then(() => {
            res.json({ message: 'nieve actualizada' });
        })
        .catch(err => {
            console.error('Error al actualizar la nieve:', err);
            res.status(500).json({ error: 'Error al actualizar la nieve' });
        });
      // Actualizar registros de venas y existencias de nieves
      await pool.promise().query('UPDATE wne SET ? WHERE product_id = ? AND adminId = ?', [{nieve:req.body.nieve}, nieveId, adminId])
      .then(() => {
        console.log('registro de existencias actualizado')
      })
      .catch(err => {
        console.log(err)
      })
    }else{
        const query = 'UPDATE wn SET ? WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [{nieve:req.body.nieve, inventario: inventario}, nieveId, adminId])
            .then(() => {
                res.json({ message: 'nieve actualizada' });
            })
            .catch(err => {
                console.error('Error al actualizar la nieve:', err);
                res.status(500).json({ error: 'Error al actualizar la nieve' });
            });
          // Actualizar registros de venas y existencias de nieves
          await pool.promise().query('UPDATE wne SET ? WHERE product_id = ? AND adminId = ?', [{nieve:req.body.nieve, cantidad: inventario, inventario: 0, existencia:0}, nieveId, adminId])
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


const waflesNController = new WaflesNieveController();
export default waflesNController;