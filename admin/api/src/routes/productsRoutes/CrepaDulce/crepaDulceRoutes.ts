import { Router } from 'express';


import crepaDulceHController from '../../../controllers/productsController/CrepaDulce/crepaDulceControllerH';
import crepaDulceIUController from '../../../controllers/productsController/CrepaDulce/crepaDulceControllerIU';
import crepaDulceICController from '../../../controllers/productsController/CrepaDulce/crepaDulceContrllerIC';
import crepaDulceNController from '../../../controllers/productsController/CrepaDulce/crepaDulceControllerN';
import crepaDulcePController from '../../../controllers/productsController/CrepaDulce/crepaDulceControllerP';

class CrepaDulceRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        // Harina de crepa dulce
        this.router.get('/H/', crepaDulceHController.list); 
        this.router.get('/H/:id', crepaDulceHController.getOne);       
        this.router.post('/H/',  crepaDulceHController.create);
        this.router.delete('/H/:id', crepaDulceHController.delete);
        this.router.put('/H/:id', crepaDulceHController.update);
        // Ingredientes untables crepa dulce
        this.router.get('/IU/', crepaDulceIUController.list); 
        this.router.get('/IU/:id', crepaDulceIUController.getOne);       
        this.router.post('/IU/',  crepaDulceIUController.create);
        this.router.delete('/IU/:id', crepaDulceIUController.delete);
        this.router.put('/IU/:id', crepaDulceIUController.update);
        // Ingrediente complemetario crepa dulce
        this.router.get('/IC/', crepaDulceICController.list); 
        this.router.get('/IC/:id', crepaDulceICController.getOne);       
        this.router.post('/IC/',  crepaDulceICController.create);
        this.router.delete('/IC/:id', crepaDulceICController.delete);
        this.router.put('/IC/:id', crepaDulceICController.update);
        // Nieve Crepa Dulce
        this.router.get('/N/', crepaDulceNController.list); 
        this.router.get('/N/:id', crepaDulceNController.getOne);       
        this.router.post('/N/',  crepaDulceNController.create);
        this.router.delete('/N/:id', crepaDulceNController.delete);
        this.router.put('/N/:id', crepaDulceNController.update);
        // Precios Crepa Dulce
        this.router.get('/P/', crepaDulcePController.list); 
        this.router.get('/P/:id', crepaDulcePController.getOne);       
        this.router.post('/P/',  crepaDulcePController.create);
        this.router.delete('/P/:id', crepaDulcePController.delete);
        this.router.put('/P/:id', crepaDulcePController.update);
    }
}

const crepaDulceRoutes = new CrepaDulceRoutes();
export default crepaDulceRoutes.router;