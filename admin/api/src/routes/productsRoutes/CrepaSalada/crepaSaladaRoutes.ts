import { Router } from 'express';

import crepaSaladaIPController from '../../../controllers/productsController/CrepaSalada/crepaSaladaControllerIP';
import crepaSaladaAController from '../../../controllers/productsController/CrepaSalada/crepaSaladaControllerA';
import crepaSaladaEIController from '../../../controllers/productsController/CrepaSalada/crepaSaladaControllerEI';
import crepaSaladaBController from '../../../controllers/productsController/CrepaSalada/crepaSaladaContrllerB';
import crepaSaladaPController from '../../../controllers/productsController/CrepaSalada/crepaSaladaControllerP';
import crepaSaladaABController from '../../../controllers/productsController/CrepaSalada/crepaSaladaAderesosBase';
import crepaSaladaIBController from '../../../controllers/productsController/CrepaSalada/crepaSaladaIngredientesBase';

class CrepaSaladaRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        // Ingrediente Principal de crepa salada
        this.router.get('/IP/', crepaSaladaIPController.list); 
        this.router.get('/IP/:id', crepaSaladaIPController.getOne);       
        this.router.post('/IP/',  crepaSaladaIPController.create);
        this.router.delete('/IP/:id', crepaSaladaIPController.delete);
        this.router.put('/IP/:id', crepaSaladaIPController.update)
        // Adereso de crepa salada
        this.router.get('/A/', crepaSaladaAController.list); 
        this.router.get('/A/:id', crepaSaladaAController.getOne);       
        this.router.post('/A/',  crepaSaladaAController.create);
        this.router.delete('/A/:id', crepaSaladaAController.delete);
        this.router.put('/A/:id', crepaSaladaAController.update);
        // Adreso Base de crepa salada
        this.router.get('/AB/', crepaSaladaABController.list);
        this.router.get('/AB/:id', crepaSaladaABController.getOne);
        this.router.post('/AB/', crepaSaladaABController.create);
        this.router.delete('/AB/:id', crepaSaladaABController.delete);
        this.router.put('/AB/:id', crepaSaladaABController.update);
        // Ingrediente Base de crepa salada
        this.router.get('/IB/', crepaSaladaIBController.list);
        this.router.get('/IB/:id', crepaSaladaIBController.getOne);
        this.router.post('/IB/', crepaSaladaIBController.create);
        this.router.delete('/IB/:id', crepaSaladaIBController.delete);
        this.router.put('/IB/:id', crepaSaladaIBController.update);
        // Ensalada individual crepa salada
        this.router.get('/EI/', crepaSaladaEIController.list); 
        this.router.get('/EI/:id', crepaSaladaEIController.getOne);       
        this.router.post('/EI/',  crepaSaladaEIController.create);
        this.router.delete('/EI/:id', crepaSaladaEIController.delete);
        this.router.put('/EI/:id', crepaSaladaEIController.update);
        // Botana crepa salada
        this.router.get('/B/', crepaSaladaBController.list); 
        this.router.get('/B/:id', crepaSaladaBController.getOne);       
        this.router.post('/B/',  crepaSaladaBController.create);
        this.router.delete('/B/:id', crepaSaladaBController.delete);
        this.router.put('/B/:id', crepaSaladaBController.update);
        // Precio crepa salada
        this.router.get('/P/', crepaSaladaPController.list); 
        this.router.get('/P/:id', crepaSaladaPController.getOne);       
        this.router.post('/P/',  crepaSaladaPController.create);
        this.router.delete('/P/:id', crepaSaladaPController.delete);
        this.router.put('/P/:id', crepaSaladaPController.update);
    }
}

const crepaSaladaRoutes = new CrepaSaladaRoutes();
export default crepaSaladaRoutes.router;