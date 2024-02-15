import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken';


class WaflesCanastaIngredienteComplementarioController {
    public async list(req: Request, res: Response): Promise<void> {

        try{
            const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); 
            const sucursal = decodedToken.sucursal
            const adminId = decodedToken.adminId;
            const query = 'SELECT * FROM wcice WHERE sucursal_id = ? AND adminId = ?';
            const ingredientes: any = await pool.promise().query(query, [sucursal, adminId])
                .then(ingredientes => ingredientes[0])
                .catch(err => console.log(err));
            
            const ingredientes2:any = await pool.promise().query('SELECT * FROM wcic WHERE adminId = ?', [adminId] )
            .then(ingredientes2 => ingredientes2[0])
            .catch(err => console.log(err));
        
            const existenciasId:any = {};
            ingredientes.forEach((existencia:any) => {
                existenciasId[existencia.product_id] = existencia;
            });
        
            const resultado = ingredientes2.map((ingrediente:any) => {
                const existencia = existenciasId[ingrediente.id] || { existencia: 0 };
                return {
                    id: existencia.product_id,
                    ingrediente_com: ingrediente.ingrediente_com,
                    existencia: existencia.existencia,
                    cantidad: existencia.cantidad,
                    inventario: existencia.inventario,
                    tipo: ingrediente.tipo,
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
        const ingredienteId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM wcic WHERE id = ?';
        const ingredientes: any = await pool.promise().query(query, [ingredienteId])
            .then(ingredientes => ingredientes[0])
            .catch(err => console.log(err));


        if (ingredientes.length > 0) {
            res.json(ingredientes);
        } else {
            res.status(404).json({ text: "El ingrediente no existe" });
        }
    }

}


const waflesCanastaICController = new WaflesCanastaIngredienteComplementarioController();
export default waflesCanastaICController;