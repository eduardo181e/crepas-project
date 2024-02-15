import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken'
class CrepaSaladaEnsaladaIndividualController {
    public async list(req: Request, res: Response): Promise<void> {
        try{const token:any = req.headers['authorization'];
        console.log(token);
        const tokenWithoutBearer = token.replace('Bearer ', '');
        
    
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
        console.log(decodedToken);
        const sucursal_id = decodedToken.sucursal
        const adminId = decodedToken.adminId;
        const query = 'SELECT * FROM cseie WHERE sucursal_id = ? AND adminId = ?';;    
        const ensaladas: any = await pool.promise().query(query, [sucursal_id, adminId])
          .then(ensaladas => ensaladas[0])
          .catch(err => console.log(err));
  
        const ensaladas2:any = await pool.promise().query('SELECT * FROM csei WHERE adminId = ?', [adminId]  )
        .then(ensaladas2 => ensaladas2[0])
        .catch(err => console.log(err));
  
        const existenciaPorProductId:any = {};
        ensaladas.forEach((ensalada:any) => {
          existenciaPorProductId[ensalada.product_id] = ensalada;
        });
  
        // Combinar los datos
        const resultado:any = [];
        ensaladas2.forEach((ensalada:any) => {
          const existencia = existenciaPorProductId[ensalada.id] || { existencia: 0 };
          resultado.push({
            product_id: ensalada.id,
            ensalada_ind: ensalada.ensalada_ind,
            descripcion: ensalada.descripcion,
            existencia: existencia.existencia,
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
        const ensaladaId = req.params.id; // ID del juego solicitado
        const query = 'SELECT * FROM csei WHERE id = ?';
        const ensaladas: any = await pool.promise().query(query, [ensaladaId])
            .then(ensaladas => ensaladas[0])
            .catch(err => console.log(err));


        if (ensaladas.length > 0) {
            res.json(ensaladas);
        } else {
            res.status(404).json({ text: "La ensalada no existe" });
        }
    }


}


const crepaSaladaEIController = new CrepaSaladaEnsaladaIndividualController();
export default crepaSaladaEIController;