import { Router } from 'express';
import bebidasCalientesVentasController from '../../../controllers/salesGlobalControler/bebidasCalientes/bebidasCalientesControler';


class BebidasCalientesSalesRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.post('/', bebidasCalientesVentasController.list);
        this.router.get('/:id', bebidasCalientesVentasController.getOne);
        this.router.post('/laps', bebidasCalientesVentasController.listLaps);
    }
}

const bebidasCalientesGlobalSalesRoutes = new BebidasCalientesSalesRoutes();
export default bebidasCalientesGlobalSalesRoutes.router;