import { Router } from 'express';

import { facturaCajaController } from '../../controllers/facturasControllers/facturaCajaControllers';

class FacturasCajaRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.post('/', facturaCajaController.list);
        this.router.get('/:id/', facturaCajaController.getOne);
        this.router.post('/laps/', facturaCajaController.listLaps);
        this.router.post('/all/', facturaCajaController.allList);
        this.router.post('/allLaps/', facturaCajaController.lapsListAll);
    }
}

const facturasCajaRoutes = new FacturasCajaRoutes();
export default facturasCajaRoutes.router;