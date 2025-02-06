import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken'
class WaflesdecoracionController {
    public async list(req: Request, res: Response): Promise<void> {
        try{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); 
            const sucursal = decodedToken.sucursal
            const adminId = decodedToken.adminId;
            const query = 'SELECT * FROM wde WHERE sucursal_id = ? AND adminId = ?';
            const decoracion: any = await pool.promise().query(query, [sucursal, adminId])
                .then(decoracion => decoracion[0])
                .catch(err => console.log(err));
            
            const decoracion2:any = await pool.promise().query('SELECT * FROM wd WHERE adminId = ?', [adminId] )
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

    public async getOne(req: Request, res: Response){
        const decoracionId = req.params.id; 
        const query = 'SELECT * FROM wd WHERE id = ?';
        const decoracions: any = await pool.promise().query(query, [decoracionId])
            .then(decoracions => decoracions[0])
            .catch(err => console.log(err));


        if (decoracions.length > 0) {
            res.json(decoracions);
        } else {
            res.status(404).json({ text: "La decoracion no existe" });
        }
    }

}


const waflesDController = new WaflesdecoracionController();
export default waflesDController;