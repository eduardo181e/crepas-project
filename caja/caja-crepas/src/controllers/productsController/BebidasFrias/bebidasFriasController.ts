import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken';

class BebidasFriasController {
    public async list(req: Request, res: Response): Promise<void> {
        try{const token:any = req.headers['authorization'];
        console.log(token);
        const tokenWithoutBearer = token.replace('Bearer ', '');
        
    
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
        console.log(decodedToken);
        const sucursal_id = decodedToken.sucursal
        const adminId = decodedToken.adminId;
        const query = 'SELECT * FROM bfe WHERE sucursal_id = ? AND adminId = ?';    
        const bebidas: any = await pool.promise().query(query, [sucursal_id, adminId])
          .then(bebidas => bebidas[0])
          .catch(err => console.log(err));
  
        const bebidas2:any = await pool.promise().query('SELECT * FROM bf WHERE adminId = ?', [adminId] )
        .then(bebidas2 => bebidas2[0])
        .catch(err => console.log(err));
  
        const existenciaPorProductId:any = {};
        bebidas.forEach((bebida:any) => {
          existenciaPorProductId[bebida.product_id] = bebida;
        });
  
        // Combinar los datos
        const resultado:any = [];
        bebidas2.forEach((bebida:any) => {
          const existencia = existenciaPorProductId[bebida.id] || { existencia: 0 };
          resultado.push({
            product_id: bebida.id,
            bebida: bebida.bebida,
            descripcion: bebida.descripcion,
            existencia: existencia.existencia,
            precio: bebida.precio,
            cantidad: existencia.cantidad,
            inventario: existencia.inventario,
          });
        });
  
        res.json(resultado);}
        catch (error) {
          console.log(error);
          // Maneja cualquier error y envía una respuesta de error si es necesario
          res.status(500).json({ error: 'Ocurrió un error interno' });
        }
  
  }

    public async getOne(req: Request, res: Response){
      const token:any = req.headers['authorization'];
        console.log(token);
        const tokenWithoutBearer = token.replace('Bearer ', '');
        
    
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
        console.log(decodedToken);
        const adminId = decodedToken.adminId;
        const bebidaId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM bf WHERE id = ? AND adminId = ?';
        const bebidas: any = await pool.promise().query(query, [bebidaId, adminId])
            .then(bebidas => bebidas[0])
            .catch(err => console.log(err));


        if (bebidas.length > 0) {
            res.json(bebidas);
        } else {
            res.status(404).json({ text: "la bebida no existe" });
        } 
    }

    public async listStock(req: Request, res: Response): Promise<void> {
        const  {sucursal_id} = req.body;
        const query = 'SELECT * FROM bfe WHERE sucursal_id = ?';    
        const bebidas: any = await pool.promise().query(query, [sucursal_id])
          .then(bebidas => bebidas[0])
          .catch(err => console.log(err));
    
        res.json(bebidas);
      }

      public async sales(req: Request, res: Response): Promise<void> {

        const {sucursal_id, ventas, product_id} = req.body;
        const query = 'UPDATE bfv SET ventas = ventas + ? WHERE sucursal_id = ? AND product_id = ?;';
        const venta:any = await pool.promise().query(query, [ventas, sucursal_id, product_id])
        .then((venta:any) => {
            res.json({text: 'Venta registrada'})
            venta[0]
        })
        .catch(err => {
            res.json({text: 'Error al registrar la venta'})
            console.log(err)
        });
      }
}


const bebidasFriasController = new BebidasFriasController();
export default bebidasFriasController;