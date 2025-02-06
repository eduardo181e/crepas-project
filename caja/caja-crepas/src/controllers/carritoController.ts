import {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import pool from '../databaseproduct';
class CarritoController {

    index  (req: Request, res: Response) {
        res.json({ text: 'API is ready'});
    } 

    public async agregar (req: Request, res: Response): Promise<void>{
        const token:any = req.headers['authorization'];
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro');
        const userId = decodedToken.id
        const adminId = decodedToken.adminId
        const { orden } = req.body;
        const orden1 = JSON.stringify(orden)
        const Orden:any = {
            orden: orden1,
            nombre: req.body.nombre,
            precio: req.body.precio,
            total: req.body.precio,
            userId: userId,
            adminId: adminId
        }

          await pool.promise().query('INSERT INTO carrito_caja SET ?', [Orden])
          .then((res1) => {
              res.json({ text: 'Orden guardada'});
          })
          .catch(err => {
              console.error('Error al guardar la orden:', err);
              res.status(500).json({ error: 'Error al guardar la orden' });
          });
    }

    public async view (req:Request, res: Response){
        const token:any = req.headers['authorization'];
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro');
        const userId = decodedToken.id
        const adminId = decodedToken.adminId
        const query = 'SELECT * FROM carrito_caja WHERE userId = ? AND adminId = ?';
        const bebidas: any = await pool.promise().query(query, [userId, adminId])
          .then(bebidas => bebidas[0])
          .catch(err => console.log(err));
    
        res.json(bebidas);
    }

    public async viewOne(req: Request, res: Response){
        const token:any = req.headers['authorization'];
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro');
        const userId = decodedToken.id
        const id = req.params.id
        const adminId = decodedToken.adminId
        const query = 'SELECT * FROM carrito_caja WHERE id = ? AND userId = ? AND adminId = ?';
        const bebidas: any = await pool.promise().query(query,[id, userId, adminId])
          .then(bebidas => bebidas[0])
          .catch(err => console.log(err));
    
        res.json(bebidas);
    }

     public async delete (req: Request, res: Response){
        const token:any = req.headers['authorization'];
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro');
        const userId = decodedToken.id
        const productId =  req.params.id;
        const adminId = decodedToken.adminId
        const query = 'DELETE FROM carrito_caja WHERE id = ? AND userId = ? AND adminId = ?';
        const bebidas: any = await pool.promise().query(query, [productId, userId, adminId])
        .then(() => {
            res.json({text: 'Orden Elinada'})
        })
        .catch(err => {
            console.error('Error al elimanr la orden', err);
            res.status(200).json({error: 'Error al eliminar la orden'})
        })
     }

     public async updateMesa (req: Request, res: Response){
        const token:any = req.headers['authorization'];
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro');
        const userId = decodedToken.id;
        const adminId = decodedToken.adminId
        const mesa = req.body.mesa
        const query = 'UPDATE carrito_caja SET mesa = ? WHERE userId = ? AND adminId = ?';
        const bebidas: any = await pool.promise().query(query, [mesa, userId, adminId])
        .then(() => {
            res.json({text: 'Mesa actualizada'})
        })
        .catch(err => {
            console.error('Error al actualizar la orden', err);
            res.status(200).json({error: 'Error al actualizar la orden'})
        })
     }

     public async deleteAll (req: Request, res: Response){
        const token:any = req.headers['authorization'];
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro');
        const userId = decodedToken.id
        const adminId = decodedToken.adminId
        const query = 'DELETE FROM carrito_caja WHERE userId = ? AND adminId = ?';
        const bebidas: any = await pool.promise().query(query, [userId, adminId])
        .then(() => {
            res.json({text: 'Carrito vacio'})
        })
        .catch(err => {
            console.error('Error al vaciar el carrito', err);
            res.status(200).json({error: 'Error al vaciar el carrito'})
        })
     }

     public async update (req: Request, res: Response): Promise<void>{
        const token:any = req.headers['authorization'];
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro');
        const userId = decodedToken.id
        const ordenId = req.params.id;
        const adminId = decodedToken.adminId
        const { orden } = req.body;
        orden.precio = req.body.precio
        const orden1 = JSON.stringify(orden)
        const Orden:any = {
            orden: orden1,
            nombre: req.body.nombre,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            total: req.body.total
        }

          await pool.promise().query('UPDATE carrito_caja SET ? WHERE id = ? AND userId = ? AND adminId = ?', [Orden, ordenId, userId, adminId])
          .then(() => {
              res.json({ text: 'Orden actualizada' });
          })
          .catch(err => {
              console.error('Error al actualizar la orden:', err);
              res.status(500).json({ error: 'Error al actualizae la orden' });
          });
    }

    public async getFactura(req: Request, res: Response){
        const id = req.params.id
        const query = 'SELECT * FROM factura_caja WHERE id = ?';
        const ventas: any = await pool.promise().query(query, [id])
          .then(ventas => ventas[0])
          .catch(err => console.log(err));
  
        res.json(ventas);
    }

}

export const carritoController = new CarritoController();
