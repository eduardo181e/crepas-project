import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken';

class CrepaSaladaPreciosController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const token:any = req.headers['authorization'];
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); 
        const adminId = decodedToken.adminId;
        const query = 'SELECT * FROM csp WHERE adminId = ?';
        const precios: any = await pool.promise().query(query, [adminId])
          .then(precios => precios[0])
          .catch(err => console.log(err));
    
        res.json(precios);
        
    }

    public async getOne(req: Request, res: Response){
        const precioId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM csp WHERE id = ?';
        const precios: any = await pool.promise().query(query, [precioId])
            .then(precios => precios[0])
            .catch(err => console.log(err));


        if (precios.length > 0) {
            res.json(precios);
        } else {
            res.status(404).json({ text: "el precio no existe" });
        }
    }

}


const crepaSaladaPController = new CrepaSaladaPreciosController();
export default crepaSaladaPController;