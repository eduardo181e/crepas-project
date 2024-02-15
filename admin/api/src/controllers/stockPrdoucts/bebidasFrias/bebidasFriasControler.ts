import {Request, Response} from 'express';
import pool from '../../../database';
import jwt ,{ TokenExpiredError } from 'jsonwebtoken';
class BebidasFriasExistenciasController {
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
          console.log(req.body.sucursal_id)  
    const sucursalId = req.body.sucursal_id;
    const query = 'SELECT * FROM bfe WHERE sucursal_id = ? AND adminId = ?';
    const bebidas: any = await pool.promise().query(query, [sucursalId, adminId])
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
    const sucursalId = req.body.sucursal_id;
    const bebidaId = req.params.id; // ID del juego solicitado
    const query = 'SELECT * FROM bfe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
    const bebidas: any = await pool.promise().query(query, [bebidaId, sucursalId, adminId])
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

public async update(req: Request, res: Response){
    if(req.headers['authorization'] === undefined){
        res.status(401).json({message: 'Unauthorized'})
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
    const sucursalId = parseInt(req.body.sucursal_id);
    const bebidaId = parseInt(req.params.id);
    console.log(req.body)
    if(req.body.cantidad === 0){
    const updateBebida = parseInt(req.body.existencia);
    console.log(updateBebida)
    console.log(bebidaId)
    console.log(sucursalId)
    await pool.promise().query('UPDATE bfe SET existencia = ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?', [updateBebida, bebidaId, sucursalId, adminId])
    .then( updtae => {
        console.log(updtae)
        res.json({message: 'El stock fue actualizado'})
    })
    .catch(err => res.json({'Error al actualizar el stock:':err}));
  }else if(req.body.cantidad === 1){
    const updateBebida = parseInt(req.body.existencia);
    const inventario = parseInt(req.body.inventario);
    console.log(updateBebida)
    console.log(bebidaId)
    console.log(sucursalId)
    await pool.promise().query('UPDATE bfe SET existencia = ?, inventario = ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?', [updateBebida, inventario, bebidaId, sucursalId, adminId])
    .then( updtae => {
        console.log(updtae)
        res.json({message: 'El stock fue actualizado'})
    })
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


const bebidasFriasExistenciasController = new BebidasFriasExistenciasController();
export default bebidasFriasExistenciasController;