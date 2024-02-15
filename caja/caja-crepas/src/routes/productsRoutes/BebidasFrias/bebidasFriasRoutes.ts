import { Router } from 'express';

import bebidasFriasController from '../../../controllers/productsController/BebidasFrias/bebidasFriasController';


class BebidasFriasRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        // Ingrediente untablel de wafles
        this.router.get('/', bebidasFriasController.list); 
        this.router.get('/:id', bebidasFriasController.getOne);       
    }
}

const bebidasFriasRoutes = new BebidasFriasRoutes();
export default bebidasFriasRoutes.router;