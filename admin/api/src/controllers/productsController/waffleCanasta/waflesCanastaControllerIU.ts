import {Request, Response} from 'express';
import pool from '../../../database';
import pool1 from '../../../databaseuser';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import { admin } from '../../../models/models';

class WaflesCanastaIngredienteUntableController {
    
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
    const query = 'SELECT * FROM wciu WHERE adminId = ?';
    const ingredientes: any = await pool.promise().query(query, [adminId])  
      .then(ingredientes => ingredientes[0])
      .catch(err => console.log(err));

    res.json(ingredientes); 
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
    const ingredienteId = req.params.id; // ID del juego solicitado
    const query = 'SELECT * FROM wciu WHERE id = ? AND adminId = ?';
    const ingredientes: any = await pool.promise().query(query, [ingredienteId, adminId])
        .then(ingredientes => ingredientes[0])
        .catch(err => console.log(err));


    if (ingredientes.length > 0) {
        res.json(ingredientes);
    } else {
        res.status(404).json({ text: "El ingrediente no existe" });
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
      var ingredienteId:any;
      const ingrediente = req.body.ingrediente_unt;
      await pool.promise().query('INSERT INTO wciu SET ?', {ingrediente_unt:ingrediente, inventario: req.body.inventario, adminId: adminId})
      .then((result:any) => {
        ingredienteId = result[0].insertId;
          res.json({ text: 'Ingrediente guardado' });
      })
      .catch(err => {
          console.error('Error al guardar el ingrediente:', err);
          res.status(500).json({ error: 'Error al guardar el ingrediente' });
      });
    // Crear ingredientes untables ventas y existencias
    await pool1.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
    .then ((sucursales:any) => {
      sucursales[0].forEach(async (sucursal:any) => {

        const registro = {
          sucursal_id: sucursal.id,
          product_id: ingredienteId,
          ingrediente_unt: ingrediente,
          cantidad: req.body.inventario,
          adminId: adminId
        }
        console.log(registro)
        await pool.promise().query('INSERT INTO wciue SET ?', [registro])
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
    const query = 'DELETE FROM wciu WHERE id = ? AND adminId = ?';
    await pool.promise().query(query, [ingredienteId, adminId])
        .then(() => {
            res.json({ text: 'Ingrediente eliminado' });
        })
        .catch(err => {
            console.error('Error al eliminar el ingrediente:', err);
            res.status(500).json({ error: 'Error al eliminar el ingrediente' });
        });
    // Eliminar ingredientes untables ventas y existencias
    await pool.promise().query('DELETE FROM wciue WHERE product_id = ? AND adminId = ?', [ingredienteId, adminId])
    .then(() => {
      console.log('registro de existencias eliminado')
    })
    .catch(err => {
      console.log(err)
    })   }catch (error:any) {
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
      const ingredienteId = req.params.id; // ID del ingrediente a actualizar
      const query = 'SELECT * FROM wciu WHERE id = ? AND adminId = ?';
      const ingredientes: any = await pool.promise().query(query, [ingredienteId, adminId])
        .then(ingredientes => ingredientes[0])
        .catch(err => console.log(err));
      
      if (ingredientes[0].inventario === parseInt(inventario)){
      const query = 'UPDATE wciu SET ? WHERE id = ? AND  adminId = ?';
      await pool.promise().query(query, [{ingrediente_unt:req.body.ingrediente_unt}, ingredienteId, adminId])
          .then(() => {
              res.json({ message: 'Ingrediente actualizado' });
          })
          .catch(err => {
              console.error('Error al actualizar el ingrediente:', err);
              res.status(500).json({ error: 'Error al actualizar el ingrediente' });
          });

      // Update ingredientes untables ventas y existencias

      await pool.promise().query('UPDATE wciue SET ? WHERE product_id = ? AND adminId = ?', [{ingrediente_unt: req.body.ingrediente_unt}, ingredienteId, adminId])
      .then(() => {
        console.log('registro de existencias actualizado')
      })
      .catch(err => {
        console.log(err)
      })        
      }else {
        const query = 'UPDATE wciu SET ? WHERE id = ? AND adminId = ?';
        await pool.promise().query(query, [{ingrediente_unt:req.body.ingrediente_unt, inventario: inventario}, ingredienteId, adminId])
            .then(() => {
                res.json({ message: 'Ingrediente actualizado' });
            })
            .catch(err => {
                console.error('Error al actualizar el ingrediente:', err);
                res.status(500).json({ error: 'Error al actualizar el ingrediente' });
            });

        // Update ingredientes untables ventas y existencias

        await pool.promise().query('UPDATE wciue SET ? WHERE product_id = ? AND adminId = ?', [{ingrediente_unt: req.body.ingrediente_unt, cantidad: inventario, inventario: 0, existencia: 0}, ingredienteId, adminId])
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


const waflesCanastaIUController = new WaflesCanastaIngredienteUntableController();
export default waflesCanastaIUController;