import { Router } from 'express';

import waflesIUController from '../../../controllers/productsController/Wafles/waflesControllerIU';
import waflesICController from '../../../controllers/productsController/Wafles/waflesControllerIC';
import waflesNController from '../../../controllers/productsController/Wafles/waflesControllerN';
import waflesPController from '../../../controllers/productsController/Wafles/waflesControllerP';

class WaflesRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        // Ingrediente untablel de wafles
        this.router.get('/IU/', waflesIUController.list); 
        this.router.get('/IU/:id', waflesIUController.getOne);       
        this.router.post('/IU/',  waflesIUController.create);
        this.router.delete('/IU/:id', waflesIUController.delete);
        this.router.put('/IU/:id', waflesIUController.update);
        // Ingrediente complementario de wafles
        this.router.get('/IC/', waflesICController.list); 
        this.router.get('/IC/:id', waflesICController.getOne);       
        this.router.post('/IC/',  waflesICController.create);
        this.router.delete('/IC/:id', waflesICController.delete);
        this.router.put('/IC/:id', waflesICController.update);
        // Nieve Wafles
        this.router.get('/N/', waflesNController.list); 
        this.router.get('/N/:id', waflesNController.getOne);       
        this.router.post('/N/',  waflesNController.create);
        this.router.delete('/N/:id', waflesNController.delete);
        this.router.put('/N/:id', waflesNController.update);
        // Precio Wafles
        this.router.get('/P/', waflesPController.list); 
        this.router.get('/P/:id', waflesPController.getOne);       
        this.router.post('/P/',  waflesPController.create);
        this.router.delete('/P/:id', waflesPController.delete);
        this.router.put('/P/:id', waflesPController.update);
    }
}

const waflesRoutes = new WaflesRoutes();
export default waflesRoutes.router;