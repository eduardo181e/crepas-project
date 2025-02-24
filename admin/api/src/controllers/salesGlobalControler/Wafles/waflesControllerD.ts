import {Request, Response} from 'express';
import pool from '../../../database';
import jwt, {TokenExpiredError} from 'jsonwebtoken'



class WaffleDecoracionVentasController {
    // Lista all invoice in current time

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
            const { fecha } = req.body;
            const query = 'SELECT * FROM wdv WHERE DATE(created_at) = ? AND adminId = ?';
            const ventas: any = await pool.promise().query(query, [fecha, adminId])
              .then(ventas => ventas[0])
              .catch(err => console.log(err));
  
      res.json(ventas);}catch (error:any) {
        if (error instanceof TokenExpiredError) {
          res.status(401).json({ message: 'Token expired' });
        } else {
          res.status(401).json({ message: 'Unknown Error' });
        }
      }
  }       
}

      // list date range invoice

    public async listLaps(req: Request, res: Response): Promise<void> {
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
              const { fechaInicio, fechaFin } = req.body;
              const query = 'SELECT * FROM wdv WHERE DATE(created_at) BETWEEN ? AND ? AND adminId = ?';
              const ventas: any = await pool.promise().query(query, [fechaInicio, fechaFin, adminId])
                .then(ventas => ventas[0])
                .catch(err => console.log(err));
    
        res.json(ventas);}catch (error:any) {
          if (error instanceof TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
          } else {
            res.status(401).json({ message: 'Unknown Error' });
          }
        }
    }       
}

 // List one invoice

 public async getOne(req: Request, res: Response): Promise<any> {
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
      const id = req.params.id
      const query = 'SELECT * FROM wdv WHERE id = ? AND adminId = ?';
      const ventas: any = await pool.promise().query(query, [id, adminId])
        .then(ventas => ventas[0])
        .catch(err => console.log(err));

res.json(ventas);}catch (error:any) {
  if (error instanceof TokenExpiredError) {
    res.status(401).json({ message: 'Token expired' });
  } else {
    res.status(401).json({ message: 'Unknown Error' });
  }
}
 }
}
}


const waffleDVController = new WaffleDecoracionVentasController();
export default waffleDVController;