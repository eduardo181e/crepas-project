import { Router } from "express";
import crepaSaladaABVController from "../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaAderesosBase";
import crepaSaladaAVController from "../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaControllerA";
import crepaSaladaBVController from "../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaContrllerB";
import crepaSaladaEIVController from "../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaControllerEI";
import crepaSaladaIBVController from "../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaIngredientesBase";
import crepaSaladaIPVController from "../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaControllerIP";
class CrepaSaladaSalesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    // Aderesos Base
    this.router.post('/AB/', crepaSaladaABVController.list);
    this.router.get('/AB/:id', crepaSaladaABVController.getOne);
    this.router.post('/AB/laps', crepaSaladaABVController.listLaps);
    // Aderesos
    this.router.post('/A/', crepaSaladaAVController.list);
    this.router.get('/A/:id', crepaSaladaAVController.getOne);
    this.router.post('/A/laps', crepaSaladaAVController.listLaps);
    // Botanas
    this.router.post('/B/', crepaSaladaBVController.list);
    this.router.get('/B/:id', crepaSaladaBVController.getOne);
    this.router.post('/B/laps', crepaSaladaBVController.listLaps);
    // Ensalada Indivudual
    this.router.post('/EI/', crepaSaladaEIVController.list);
    this.router.get('/EI/:id', crepaSaladaEIVController.getOne);
    this.router.post('/EI/laps', crepaSaladaEIVController.listLaps);
    // Ingredientes Base
    this.router.post('/IB/', crepaSaladaIBVController.list);
    this.router.get('/IB/:id', crepaSaladaIBVController.getOne);
    this.router.post('/IB/laps', crepaSaladaIBVController.listLaps);
    // Ingredientes Principal
    this.router.post('/IP/', crepaSaladaIPVController.list);
    this.router.get('/IP/:id', crepaSaladaIPVController.getOne);
    this.router.post('/IP/laps', crepaSaladaIPVController.listLaps);
  }
}

const crepaSaladaGlobalSalesRoutes = new CrepaSaladaSalesRoutes();
export default crepaSaladaGlobalSalesRoutes.router;