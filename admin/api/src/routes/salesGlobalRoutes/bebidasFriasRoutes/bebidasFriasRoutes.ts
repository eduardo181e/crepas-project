import { Router } from 'express';
import bebidasFriasVentasController from '../../../controllers/salesGlobalControler/bebidasFrias/bebidasCalientesControler';



class BebidasFriasSalesRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.post('/', bebidasFriasVentasController.list);
        this.router.get('/:id', bebidasFriasVentasController.getOne);
        this.router.post('/laps', bebidasFriasVentasController.listLaps);
    }
}

const bebidasFriasGlobalSalesRoutes = new BebidasFriasSalesRoutes();
export default bebidasFriasGlobalSalesRoutes.router;