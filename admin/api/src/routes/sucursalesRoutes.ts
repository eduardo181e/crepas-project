import { Router } from 'express';

import { sucursalesController } from '../controllers/sucusalesController';

class SucursalesRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.post('/add', sucursalesController.agregar);
        this.router.put('/edit/:id', sucursalesController.update);
        this.router.delete('/delete/:id', sucursalesController.delete);
        this.router.get('/get', sucursalesController.view);
        this.router.get('/getOne/:id', sucursalesController.viewOne);
        this.router.get('/estados', sucursalesController.estados);
        this.router.get('/paises', sucursalesController.paises);
    }
}

const sucursalesRoutes = new SucursalesRoutes();
export default sucursalesRoutes.router;