import { Router } from 'express';


import crepaDulceHController from '../../../controllers/productsController/CrepaDulce/crepaDulceControllerH';
import crepaDulceIUController from '../../../controllers/productsController/CrepaDulce/crepaDulceControllerIU';
import crepaDulceICController from '../../../controllers/productsController/CrepaDulce/crepaDulceContrllerIC';
import crepaDulceNController from '../../../controllers/productsController/CrepaDulce/crepaDulceControllerN';
import crepaDulcePController from '../../../controllers/productsController/CrepaDulce/crepaDulceControllerP';
import crepaDulceDController from '../../../controllers/productsController/CrepaDulce/crepaDulceControllerD';

class CrepaDulceRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        // Harina de crepa dulce
        this.router.get('/H/', crepaDulceHController.list); 
        this.router.get('/H/:id', crepaDulceHController.getOne);      
        // Ingredientes untables crepa dulce
        this.router.get('/IU/', crepaDulceIUController.list); 
        this.router.get('/IU/:id', crepaDulceIUController.getOne);       
        // Ingrediente complemetario crepa dulce
        this.router.get('/IC/', crepaDulceICController.list); 
        this.router.get('/IC/:id', crepaDulceICController.getOne);   
        this.router.post('/IC/sales/', crepaDulceICController.sales); 
        // Nieve Crepa Dulce
        this.router.get('/N/', crepaDulceNController.list);      
        // Decoracion Crepa Dulce
        this.router.get('/D/', crepaDulceDController.list);      
        // Precios Crepa Dulce
        this.router.get('/P/', crepaDulcePController.list); 
        this.router.get('/P/:id', crepaDulcePController.getOne);       
    }
}

const crepaDulceRoutes = new CrepaDulceRoutes();
export default crepaDulceRoutes.router;