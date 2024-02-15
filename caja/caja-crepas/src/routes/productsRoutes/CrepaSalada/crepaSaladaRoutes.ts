import { Router } from 'express';

import crepaSaladaIPController from '../../../controllers/productsController/CrepaSalada/crepaSaladaControllerIP';
import crepaSaladaAController from '../../../controllers/productsController/CrepaSalada/crepaSaladaControllerA';
import crepaSaladaEIController from '../../../controllers/productsController/CrepaSalada/crepaSaladaControllerEI';
import crepaSaladaBController from '../../../controllers/productsController/CrepaSalada/crepaSaladaContrllerB';
import crepaSaladaPController from '../../../controllers/productsController/CrepaSalada/crepaSaladaControllerP';
import crepaSaladaIBController from '../../../controllers/productsController/CrepaSalada/crepaSaladaIngredientesBase';
import crepaSaladaABController from '../../../controllers/productsController/CrepaSalada/crepaSaladaAderesosBase';

class CrepaSaladaRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        // Ingrediente Principal de crepa salada
        this.router.get('/IP/', crepaSaladaIPController.list); 
        this.router.get('/IP/:id', crepaSaladaIPController.getOne);       
        // Adereso de crepa salada
        this.router.get('/A/', crepaSaladaAController.list); 
        this.router.get('/A/:id', crepaSaladaAController.getOne);     
        // Ingrediente Base de crepa salada
        this.router.get('/IB/', crepaSaladaIBController.list); 
        this.router.get('/IB/:id', crepaSaladaIBController.getOne);       
        // Adereso Base de crepa salada
        this.router.get('/AB/', crepaSaladaABController.list); 
        this.router.get('/AB/:id', crepaSaladaABController.getOne);       
        // Ensalada individual crepa salada
        this.router.get('/EI/', crepaSaladaEIController.list); 
        this.router.get('/EI/:id', crepaSaladaEIController.getOne);       
        // Botana crepa salada
        this.router.get('/B/', crepaSaladaBController.list); 
        this.router.get('/B/:id', crepaSaladaBController.getOne);       
        // Precio crepa salada
        this.router.get('/P/', crepaSaladaPController.list); 
        this.router.get('/P/:id', crepaSaladaPController.getOne);       
    }
}

const crepaSaladaRoutes = new CrepaSaladaRoutes();
export default crepaSaladaRoutes.router;