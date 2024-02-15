import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken'
class CrepaSaladaBotanaController {
    
    public async list(req: Request, res: Response): Promise<void> {
        try{const token:any = req.headers['authorization'];
        console.log(token);
        const tokenWithoutBearer = token.replace('Bearer ', '');
        
    
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
        console.log(decodedToken);
        const sucursal_id = decodedToken.sucursal
        const adminId = decodedToken.adminId;
        const query = 'SELECT * FROM csbe WHERE sucursal_id = ? AND adminId = ?';    
        const botanas: any = await pool.promise().query(query, [sucursal_id, adminId])
          .then(botanas => botanas[0])
          .catch(err => console.log(err));
  
        const botanas2:any = await pool.promise().query('SELECT * FROM csb WHERE adminId = ?', [adminId] )
        .then(botanas2 => botanas2[0])
        .catch(err => console.log(err));
  
        const existenciaPorProductId:any = {};
        botanas.forEach((botana:any) => {
          existenciaPorProductId[botana.product_id] = botana;
        });
  
        // Combinar los datos
        const resultado:any = [];
        botanas2.forEach((botana:any) => {
          const existencia = existenciaPorProductId[botana.id] || { existencia: 0 };
          resultado.push({
            product_id: botana.id,
            botana: botana.botana,
            descripcion: botana.descripcion,
            existencia: existencia.existencia,
            precio: botana.precio,
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

        const botanaId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM csb WHERE id = ?';
        const botanas: any = await pool.promise().query(query, [botanaId])
            .then(botanas => botanas[0])
            .catch(err => console.log(err));


        if (botanas.length > 0) {
            res.json(botanas);
        } else {
            res.status(404).json({ text: "La botana no existe" });
        }
    }
}


const crepaSaladaBController = new CrepaSaladaBotanaController();
export default crepaSaladaBController;