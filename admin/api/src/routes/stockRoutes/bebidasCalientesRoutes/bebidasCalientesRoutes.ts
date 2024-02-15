import { Router } from 'express';
import bebidasCalientesExistenciasController from '../../../controllers/stockPrdoucts/bebidasCalientes/bebidasCalientesControler';


class BebidasCalientesStockRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.post('/', bebidasCalientesExistenciasController.list);
        this.router.post('/:id', bebidasCalientesExistenciasController.getOne);
        this.router.put('/:id', bebidasCalientesExistenciasController.update);
    }
}

const bebidasCalientesStockRoutes = new BebidasCalientesStockRoutes();
export default bebidasCalientesStockRoutes.router;