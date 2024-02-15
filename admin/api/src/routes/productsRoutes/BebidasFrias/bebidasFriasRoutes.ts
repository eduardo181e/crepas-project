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
        this.router.post('/',  bebidasFriasController.create);
        this.router.delete('/:id', bebidasFriasController.delete);
        this.router.put('/:id', bebidasFriasController.update);
    }
}

const bebidasFriasRoutes = new BebidasFriasRoutes();
export default bebidasFriasRoutes.router;