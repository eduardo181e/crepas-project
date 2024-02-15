import { Router } from 'express';
import bebidasFriasExistenciasController from '../../../controllers/stockPrdoucts/bebidasFrias/bebidasFriasControler';


class BebidasFriasStockRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.post('/', bebidasFriasExistenciasController.list);
        this.router.post('/:id', bebidasFriasExistenciasController.getOne);
        this.router.put('/:id', bebidasFriasExistenciasController.update);
    }
}

const bebidasFriasStockRoutes = new BebidasFriasStockRoutes();
export default bebidasFriasStockRoutes.router;