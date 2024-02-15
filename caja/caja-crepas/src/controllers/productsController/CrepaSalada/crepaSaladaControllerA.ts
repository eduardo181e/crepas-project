import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken'
class CrepaSaladaAderesoController {
    public async list(req: Request, res: Response): Promise<void> {

        try{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); 
            const sucursal = decodedToken.sucursal
            const adminId = decodedToken.adminId;
            const query = 'SELECT * FROM csae WHERE sucursal_id = ? AND adminId = ?';
            const aderesos: any = await pool.promise().query(query, [sucursal, adminId])
                .then(aderesos => aderesos[0])
                .catch(err => console.log(err));
            
            const aderesos2:any = await pool.promise().query('SELECT * FROM csa WHERE adminId = ?', [adminId] )
            .then(aderesos2 => aderesos2[0])
            .catch(err => console.log(err));
        
            const existenciasId:any = {};
            aderesos.forEach((existencia:any) => {
                existenciasId[existencia.product_id] = existencia;
            });
        
            const resultado = aderesos2.map((adereso:any) => {
                const existencia = existenciasId[adereso.id] || { existencia: 0 };
                return {
                    id: existencia.product_id,
                    adereso: adereso.adereso,
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
        const aderesoId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM csa WHERE id = ?';
        const aderesos: any = await pool.promise().query(query, [aderesoId])
            .then(aderesos => aderesos[0])
            .catch(err => console.log(err));


        if (aderesos.length > 0) {
            res.json(aderesos);
        } else {
            res.status(404).json({ text: "El adereso no existe" });
        }
    }
}


const crepaSaladaAController = new CrepaSaladaAderesoController();
export default crepaSaladaAController;