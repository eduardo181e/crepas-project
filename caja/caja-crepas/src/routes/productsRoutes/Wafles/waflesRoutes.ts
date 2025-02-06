import { Router } from 'express';

import waflesIUController from '../../../controllers/productsController/Wafles/waflesControllerIU';
import waflesICController from '../../../controllers/productsController/Wafles/waflesControllerIC';
import waflesNController from '../../../controllers/productsController/Wafles/waflesControllerN';
import waflesDController from '../../../controllers/productsController/Wafles/waflesControllerD';
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
        // Ingrediente complementario de wafles
        this.router.get('/IC/', waflesICController.list); 
        this.router.get('/IC/:id', waflesICController.getOne);       
        // Nieve Wafles
        this.router.get('/N/', waflesNController.list); 
        this.router.get('/N/:id', waflesNController.getOne);   
        // Decoracion Wafles
        this.router.get('/D/', waflesDController.list); 
        this.router.get('/D/:id', waflesDController.getOne);       
        // Precio Wafles
        this.router.get('/P/', waflesPController.list); 
        this.router.get('/P/:id', waflesPController.getOne);       
    }
}

const waflesRoutes = new WaflesRoutes();
export default waflesRoutes.router;