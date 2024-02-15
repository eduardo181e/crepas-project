import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken'




class CrepaDulceIngredienteComplementarioController {
    public async list(req: Request, res: Response): Promise<void> {

try{
    const token:any = req.headers['authorization'];
    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); 
    const sucursal = decodedToken.sucursal
    const adminId = decodedToken.adminId;
    const query = 'SELECT * FROM cdice WHERE sucursal_id = ? AND adminId = ?';
    const ingredientes: any = await pool.promise().query(query, [sucursal, adminId])
        .then(ingredientes => ingredientes[0])
        .catch(err => console.log(err));
    
    const ingredientes2:any = await pool.promise().query('SELECT * FROM cdic WHERE adminId = ?', [adminId])
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
        const query = 'SELECT * FROM cdic WHERE id = ?';
        const ingredientes: any = await pool.promise().query(query, [ingredienteId])
            .then(ingredientes => ingredientes[0])
            .catch(err => console.log(err));


        if (ingredientes.length > 0) {
            res.json(ingredientes);
        } else {
            res.status(404).json({ text: "El ingrediente no existe" });
        }
    }

    public async sales(req: Request, res: Response): Promise<void> {
            const { complementos }:any = req.body;
            console.log(complementos);
            complementos.forEach(async (element:any) => {
                const sale ={
                    product_id: element[0],
                    ventas: element[1]
                }
                console.log(sale);

            });
           /* const {sucursal_id, ventas, product_id} = req.body;
            const query = 'UPDATE cdicv SET ventas = ventas + ? WHERE sucursal_id = ? AND product_id = ?;';
            const venta:any = await pool.promise().query(query, [ventas, sucursal_id, product_id])*/
    }

}


const crepaDulceICController = new CrepaDulceIngredienteComplementarioController();
export default crepaDulceICController;