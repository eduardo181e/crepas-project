import { Router } from "express";
import crepaSaladaABVController from "../../../controllers/salesControler/CrepaSalada/crepaSaladaAderesosBase";
import crepaSaladaAVController from "../../../controllers/salesControler/CrepaSalada/crepaSaladaControllerA";
import crepaSaladaBVController from "../../../controllers/salesControler/CrepaSalada/crepaSaladaContrllerB";
import crepaSaladaEIVController from "../../../controllers/salesControler/CrepaSalada/crepaSaladaControllerEI";
import crepaSaladaIBVController from "../../../controllers/salesControler/CrepaSalada/crepaSaladaIngredientesBase";
import crepaSaladaIPVController from "../../../controllers/salesControler/CrepaSalada/crepaSaladaControllerIP";
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

const crepaSaladaSalesRoutes = new CrepaSaladaSalesRoutes();
export default crepaSaladaSalesRoutes.router;