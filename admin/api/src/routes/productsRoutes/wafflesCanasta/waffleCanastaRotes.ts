import { Router } from 'express';
import waflesCanastaController from '../../../controllers/productsController/waffleCanasta/waffleCanastaController';
import waflesCanastaIUController from '../../../controllers/productsController/waffleCanasta/waflesCanastaControllerIU';
import waflesCanastaICController from '../../../controllers/productsController/waffleCanasta/waflesCanastaControllerIC';
import waflesCanastaNController from '../../../controllers/productsController/waffleCanasta/waflesCanastaControllerN';
class WaflesCanastaRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        // Ingrediente untablel de wafles
        this.router.get('/IU/', waflesCanastaIUController.list); 
        this.router.get('/IU/:id', waflesCanastaIUController.getOne);       
        this.router.post('/IU/',  waflesCanastaIUController.create);
        this.router.delete('/IU/:id', waflesCanastaIUController.delete);
        this.router.put('/IU/:id', waflesCanastaIUController.update);
        // Ingrediente complementario de wafles
        this.router.get('/IC/', waflesCanastaICController.list); 
        this.router.get('/IC/:id', waflesCanastaICController.getOne);       
        this.router.post('/IC/',  waflesCanastaICController.create);
        this.router.delete('/IC/:id', waflesCanastaICController.delete);
        this.router.put('/IC/:id', waflesCanastaICController.update);
        // Nieve Wafles
        this.router.get('/N/', waflesCanastaNController.list); 
        this.router.get('/N/:id', waflesCanastaNController.getOne);       
        this.router.post('/N/',  waflesCanastaNController.create);
        this.router.delete('/N/:id', waflesCanastaNController.delete);
        this.router.put('/N/:id', waflesCanastaNController.update);
        // Precios
        this.router.get('/P/', waflesCanastaController.list); 
        this.router.get('/P/:id', waflesCanastaController.getOne);       
        this.router.post('/P/',  waflesCanastaController.create);
        this.router.delete('/P/:id', waflesCanastaController.delete);
        this.router.put('/P/:id', waflesCanastaController.update);
    }
}

const waflesCanastaRoutes = new WaflesCanastaRoutes();
export default waflesCanastaRoutes.router;