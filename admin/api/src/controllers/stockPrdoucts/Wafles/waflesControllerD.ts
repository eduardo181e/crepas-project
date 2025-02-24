import {Request, Response} from 'express';
import pool from '../../../database';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
class WaffleDecoracionExistenciasController {
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
    const sucursal_id = req.body.sucursal_id;
    const query = 'SELECT * FROM wde WHERE sucursal_id = ? AND adminId = ?';
    const ingredientes: any = await pool.promise().query(query, [sucursal_id, adminId])
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
const sucursalId = req.body.sucursal_id;
const decoracionId = req.params.id; // ID del juego solicitado
const query = 'SELECT * FROM wde WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
const bebidas: any = await pool.promise().query(query, [decoracionId, sucursalId, adminId])
    .then(bebidas => bebidas[0])
    .catch(err => console.log(err));


if (bebidas.length > 0) {
    res.json(bebidas);
} else {
    res.status(404).json({ text: "la decoracion no existe" });
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
      if(req.body.cantidad === 0){
const sucursalId = req.body.sucursal_id;
const decoracionId = req.params.id;
const updatedecoracion = req.body.existencia;
await pool.promise().query('UPDATE wde SET existencia = ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?', [updatedecoracion, decoracionId, sucursalId, adminId])
.then(() => res.json({ message: 'El stock fue actualizado' }))
.catch(err => res.json({'Error al actualizar el stock:':err}));
      }else if(req.body.cantidad === 1){
        const sucursalId = req.body.sucursal_id;
        const decoracionId = req.params.id;
        const updatedecoracion = req.body.existencia;
        const inventario = req.body.inventario;
        await pool.promise().query('UPDATE wde SET existencia = ?, inventario = ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?', [updatedecoracion, inventario, decoracionId, sucursalId, adminId])
        .then(() => res.json({ message: 'El stock fue actualizado' }))
        .catch(err => res.json({'Error al actualizar el stock:':err}));
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


const waffleDEController = new WaffleDecoracionExistenciasController();
export default waffleDEController;