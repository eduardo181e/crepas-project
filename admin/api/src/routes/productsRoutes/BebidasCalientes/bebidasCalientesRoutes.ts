import { Router } from 'express';

import bebidasCalientesController from '../../../controllers/productsController/BebidasCalientes/bebidasCalientesControler';


class BebidasCalientesRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        // Ingrediente untablel de wafles
        this.router.get('/', bebidasCalientesController.list); 
        this.router.get('/:id', bebidasCalientesController.getOne);       
        this.router.post('/',  bebidasCalientesController.create);
        this.router.delete('/:id', bebidasCalientesController.delete);
        this.router.put('/:id', bebidasCalientesController.update);
    }
}

const bebidasCalientesRoutes = new BebidasCalientesRoutes();
export default bebidasCalientesRoutes.router;