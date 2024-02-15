import { Router } from 'express';
import waflesCanastaController from '../../controllers/productsController/waffleCanasta/waffleCanastaController';
import waflesCanastaICController from '../../controllers/productsController/waffleCanasta/waflesControllerIC';
import waflesCanastaIUController from '../../controllers/productsController/waffleCanasta/waflesControllerIU';
import waflesCanastaNController from '../../controllers/productsController/waffleCanasta/waflesControllerN';


class WaflesCanastaRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        // Ingredientes untables
        this.router.get('/IU/', waflesCanastaIUController.list);
        this.router.get('/IU/:id', waflesCanastaIUController.getOne);
        // Ingredientes complementarios
        this.router.get('/IC/', waflesCanastaICController.list);
        this.router.get('/IC/:id', waflesCanastaICController.getOne);
        // Nieves
        this.router.get('/N/', waflesCanastaNController.list);
        this.router.get('/N/:id', waflesCanastaNController.getOne);
        // Precios
        this.router.get('/P/', waflesCanastaController.list); 
        this.router.get('/P/:id', waflesCanastaController.getOne);       
    }
}

const waflesCanastaRoutes = new WaflesCanastaRoutes();
export default waflesCanastaRoutes.router;