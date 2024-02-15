import { Router } from 'express';

import eccomerController from '../controllers/usuariosEccomerController';

class EccomerRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.delete('/usuarios/:id', eccomerController.delete)
        this.router.put('/usuarios/:id', eccomerController.update);
        this.router.get('/usuarios/:id', eccomerController.getOne);
        this.router.get('/usuarios', eccomerController.list);
        this.router.post('/new', eccomerController.create);
    }
}

const eccomerRoutes = new EccomerRoutes();
export default eccomerRoutes.router;