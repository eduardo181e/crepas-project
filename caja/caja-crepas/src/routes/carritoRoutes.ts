import { Router } from 'express';

import { carritoController } from '../controllers/carritoController';

class CarritoRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.get('/', carritoController.index);
        this.router.post('/add', carritoController.agregar);
        this.router.get('/view', carritoController.view);
        this.router.delete('/delete/:id', carritoController.delete);
        this.router.get('/one/:id', carritoController.viewOne);
        this.router.put('/edit/:id', carritoController.update);
        this.router.get('/factura/:id', carritoController.getFactura);
        this.router.delete('/deleteAll', carritoController.deleteAll);
    }
}

const carritoRoutes = new CarritoRoutes();
export default carritoRoutes.router;