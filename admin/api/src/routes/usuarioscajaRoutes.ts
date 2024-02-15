import { Router } from 'express';

import cajaController from '../controllers/usuariosCajaController';

class CajaRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.delete('/usuarios/:id', cajaController.delete)
        this.router.put('/usuarios/:id', cajaController.update);
        this.router.get('/usuarios/:id', cajaController.getOne);
        this.router.get('/usuarios', cajaController.list);
        this.router.post('/new', cajaController.create);
    }
}

const cajaRoutes = new CajaRoutes();
export default cajaRoutes.router;