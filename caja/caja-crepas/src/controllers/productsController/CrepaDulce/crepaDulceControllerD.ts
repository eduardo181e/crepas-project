import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken'


class CrepaDulcedecoracionController {
    public async list(req: Request, res: Response): Promise<void> {
        try{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); 
            const sucursal = decodedToken.sucursal
            const adminId = decodedToken.adminId;
            const query = 'SELECT * FROM cdde WHERE sucursal_id = ? AND adminId = ?';
            const decoracion: any = await pool.promise().query(query, [sucursal, adminId])
                .then(decoracion => decoracion[0])
                .catch(err => console.log(err));
            
            const decoracion2:any = await pool.promise().query('SELECT * FROM cdd WHERE adminId = ?', [adminId] )
            .then(decoracion2 => decoracion2[0])
            .catch(err => console.log(err));
        
            const existenciasId:any = {};
            decoracion.forEach((existencia:any) => {
                existenciasId[existencia.product_id] = existencia;
            });
        
            const resultado = decoracion2.map((decoracion:any) => {
                const existencia = existenciasId[decoracion.id] || { existencia: 0 };
                return {
                    id: existencia.product_id,
                    decoracion: decoracion.decoracion,
                    existencia: existencia.existencia,
                    cantidad: existencia.cantidad,
                    inventario: existencia.inventario,
                };
            })
        
            res.json(resultado);
        }catch (error) {
            console.log(error);
            // Maneja cualquier error y envía una respuesta de error si es necesario
            res.status(500).json({ error: 'Ocurrió un error interno' });
        }
    }
}


const crepaDulceDController = new CrepaDulcedecoracionController();
export default crepaDulceDController;