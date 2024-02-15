import {Request, Response} from 'express';
import pool from '../../../database';
import jwt from 'jsonwebtoken'


class CrepaDulceHarinaController {
    public async list(req: Request, res: Response): Promise<void> {
      try{
      const token:any = req.headers['authorization'];
      console.log(token);
      const tokenWithoutBearer = token.replace('Bearer ', '');
      
  
      const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
      console.log(decodedToken);
      const sucursal = decodedToken.sucursal
      const adminId = decodedToken.adminId;
      const query = 'SELECT * FROM cdthe WHERE sucursal_id = ? AND adminId = ?';
      const harinas: any = await pool.promise().query(query, [sucursal, adminId])
        .then(harinas => harinas[0])
        .catch(err => console.log(err));
  

      const harinas2:any = await pool.promise().query('SELECT * FROM cdth WHERE adminId = ?', [adminId])
      .then(harinas2 => harinas2[0])
      .catch(err => console.log(err));


      const existenciasPorHarina:any = {};
      harinas.forEach((existencia:any) => {
        existenciasPorHarina[existencia.product_id] = existencia;
        console.log(existenciasPorHarina);
      });

      // Combinar los datos
      const resultado = harinas2.map((harina:any) => {
        const existencia = existenciasPorHarina[harina.id] || { existencia: 0 };
        console.log(existencia);
        return {
          id: existencia.product_id,
          harina: harina.harina,
          existencia: existencia.existencia,
          cantidad: existencia.cantidad,
          inventario: existencia.inventario,
        };
      });
      
      res.json(resultado);
    }catch (error) {
        console.log(error);
        // Maneja cualquier error y envía una respuesta de error si es necesario
        res.status(500).json({ error: 'Ocurrió un error interno' });
    }
      }     
    

    public async getOne(req: Request, res: Response){
        const harinaId = req.params.id; 
        const query = 'SELECT * FROM cdth WHERE id = ?';
        const harinas: any = await pool.promise().query(query, [harinaId])
            .then(harinas => harinas[0])
            .catch(err => console.log(err));


        if (harinas.length > 0) {
            res.json(harinas);
        } else {
            res.status(404).json({ text: "La harina no existe" });
        }
    }



}


const crepaDulceHController = new CrepaDulceHarinaController();
export default crepaDulceHController;