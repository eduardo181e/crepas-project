import { Router } from 'express';
import bebidasCalientesVentasController from '../../../controllers/salesControler/bebidasCalientes/bebidasCalientesControler';


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

const bebidasCalientesSalesRoutes = new BebidasCalientesSalesRoutes();
export default bebidasCalientesSalesRoutes.router;