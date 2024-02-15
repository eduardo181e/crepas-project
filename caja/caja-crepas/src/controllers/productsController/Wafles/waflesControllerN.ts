import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken'
class WaflesNieveController {
    public async list(req: Request, res: Response): Promise<void> {
        try{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); 
            const sucursal = decodedToken.sucursal
            const adminId = decodedToken.adminId;
            const query = 'SELECT * FROM wne WHERE sucursal_id = ? AND adminId = ?';
            const nieve: any = await pool.promise().query(query, [sucursal, adminId])
                .then(nieve => nieve[0])
                .catch(err => console.log(err));
            
            const nieve2:any = await pool.promise().query('SELECT * FROM wn WHERE adminId = ?', [adminId] )
            .then(nieve2 => nieve2[0])
            .catch(err => console.log(err));
        
            const existenciasId:any = {};
            nieve.forEach((existencia:any) => {
                existenciasId[existencia.product_id] = existencia;
            });
        
            const resultado = nieve2.map((nieve:any) => {
                const existencia = existenciasId[nieve.id] || { existencia: 0 };
                return {
                    id: existencia.product_id,
                    nieve: nieve.nieve,
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
        const nieveId = req.params.id; 
        const query = 'SELECT * FROM wn WHERE id = ?';
        const nieves: any = await pool.promise().query(query, [nieveId])
            .then(nieves => nieves[0])
            .catch(err => console.log(err));


        if (nieves.length > 0) {
            res.json(nieves);
        } else {
            res.status(404).json({ text: "La nieve no existe" });
        }
    }

}


const waflesNController = new WaflesNieveController();
export default waflesNController;