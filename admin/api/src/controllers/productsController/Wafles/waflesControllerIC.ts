import {Request, Response} from 'express';
import pool from '../../../database';
import pool1 from '../../../databaseuser';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import { admin } from '../../../models/models';

class WaflesIngredienteComplementarioController {
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
    const query = 'SELECT * FROM wic WHERE adminId = ?';
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
    const query = 'SELECT * FROM wic WHERE id = ? AND adminId = ?';
    const ingredientes: any = await pool.promise().query(query, [ingredienteId, adminId])
        .then(ingredientes => ingredientes[0])
        .catch(err => console.log(err));
          

    if (ingredientes.length > 0) {
        res.json(ingredientes);
    } else {
        res.status(404).json({ text: "El ingrediente no existe" });
    }   }catch (error:any) {
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
      const ingrediente = req.body.ingrediente_com.trim();
      const tipo = req.body.tipo;
      await pool.promise().query('INSERT INTO wic SET ?', {ingrediente_com:ingrediente, tipo:tipo, inventario: req.body.inventario, adminId: adminId})
      .then((result:any) => {
        console.log(result[0]);
          ingredienteId = result[0].insertId;
          res.json({ text: 'Ingrediente guardado' });
      })
      .catch(err => {
          console.error('Error al guardar el ingrediente:', err);
          res.status(500).json({ error: 'Error al guardar el ingrediente' });
      });
      // Crear ventas y existencias de ingredientes complementarios
      await pool1.promise().query('SELECT * FROM sucursales WHERE adminId = ?')
      .then((sucursales:any) => {
        sucursales[0].forEach(async (sucursal:any) => {
          const registro = {
            sucursal_id: sucursal.id,
            product_id: ingredienteId,
            ingrediente_com: ingrediente,
            cantidad: req.body.inventario,
            adminId: adminId
          }
          await pool.promise().query('INSERT INTO wice SET ?', [registro])
          .then(() => {
            console.log('registro de existencias guardado')
          })
          .catch(err => {
            console.error('Error al guardar el registro de existencias:', err);
          })
        })
      })
      .catch(err => {
        console.error('Error al obtener las sucursales:', err);
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
    const ingredienteId = req.params.id; // ID del juego a eliminar
    const query = 'DELETE FROM wic WHERE id = ? AND adminId = ?';
    await pool.promise().query(query, [ingredienteId, adminId])
        .then(() => {
            res.json({ text: 'Ingrediente eliminado' });
        })
        .catch(err => {
            console.error('Error al eliminar el ingrediente:', err);
            res.status(500).json({ error: 'Error al eliminar el ingrediente' });
        });
    await pool.promise().query('DELETE FROM wice WHERE product_id = ? AND adminId = ?', [ingredienteId, adminId])
    .then(() => {
      console.log('registro de existencias eliminado')
    })
    .catch(err => {
      console.error('Error al eliminar el registro de existencias:', err);
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
          const ingredienteId = req.params.id; // ID del juego a actualizar
          const ingrediente1 = {ingrediente_com:req.body.ingrediente_com.trim(), tipo: req.body.tipo, inventario: req.body.inventario}
          const query1 = 'SELECT * FROM wic WHERE id = ? AND adminId = ?';
          const ingrediente: any = await pool.promise().query(query1, [ingredienteId, adminId])
              .then(bebidas => bebidas[0])
              .catch(err => console.log(err));
          delete ingrediente[0].id;
          if(parseInt(ingrediente1.inventario) === ingrediente[0].inventario){
    delete ingrediente1.inventario;
    const query = 'UPDATE wic SET ? WHERE id = ? AND adminId = ?';
    await pool.promise().query(query, [ingrediente1, ingredienteId, adminId])
        .then(() => {
            res.json({ message: 'Ingrediente actualizado' });
        })
        .catch(err => {
            console.error('Error al actualizar el ingrediente:', err);
            res.status(500).json({ error: 'Error al actualizar el ingrediente' });
        });
      // Actualizar ventas y existencias de ingredientes complementarios
          const registro = {
            product_id: ingredienteId,
            ingrediente_com: req.body.ingrediente_com.trim()
          }
          await pool.promise().query('UPDATE wice SET ? WHERE product_id = ? AND adminId = ?', [registro, ingredienteId, adminId])
          .then(() => {
            console.log('registro de existencias actualizado')
          })
          .catch(err => {
            console.error('Error al actualizar el registro de existencias:', err);
          })
          }else{
            const query = 'UPDATE wic SET ? WHERE id = ? AND adminId = ?';
            await pool.promise().query(query, [ingrediente1, ingredienteId, adminId])
                .then(() => {
                    res.json({ message: 'Ingrediente actualizado' });
                })
                .catch(err => {
                    console.error('Error al actualizar el ingrediente:', err);
                    res.status(500).json({ error: 'Error al actualizar el ingrediente' });
                });
              // Actualizar ventas y existencias de ingredientes complementarios
                  const registro: any = {
                    product_id: ingredienteId,
                    ingrediente_com: req.body.ingrediente_com.trim(),
                    cantidad: ingrediente1.inventario,
                    inventario: 0,
                    existencia: 0,
                    adminId: adminId
                  }
                  await pool.promise().query('UPDATE wice SET ? WHERE product_id = ? AND adminId = ?', [registro, ingredienteId, adminId])
                  .then(() => {
                    console.log('registro de existencias actualizado')
                  })
                  .catch(err => {
                    console.error('Error al actualizar el registro de existencias:', err);
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


const waflesICController = new WaflesIngredienteComplementarioController();
export default waflesICController;