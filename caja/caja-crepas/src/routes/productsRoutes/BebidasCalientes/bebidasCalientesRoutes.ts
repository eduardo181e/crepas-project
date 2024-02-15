import { Router } from 'express';

import bebidasCalientesController from '../../../controllers/productsController/BebidasCalientes/bebidasCalientesControler';


class BebidasCalientesRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.get('/', bebidasCalientesController.list); 
        this.router.get('/C/:id', bebidasCalientesController.getOne);  
        this.router.get('/Cstock', bebidasCalientesController.listStock);
        this.router.post('/sales', bebidasCalientesController.sales);
    }
}

const bebidasCalientesRoutes = new BebidasCalientesRoutes();
export default bebidasCalientesRoutes.router;