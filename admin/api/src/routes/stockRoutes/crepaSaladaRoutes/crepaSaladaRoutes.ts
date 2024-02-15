import { Router } from "express";
import crepaSaladaABEController from "../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaAderesosBase";
import crepaSaladaAEController from "../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaControllerA";
import crepaSaladaBEController from "../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaContrllerB";
import crepaSaladaEIEController from "../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaControllerEI";
import crepaSaladaIBEController from "../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaIngredientesBase";
import crepaSaladaIPEController from "../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaControllerIP";
class CrepaSaladaStockRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    // Aderesos Base
    this.router.post("/AB/", crepaSaladaABEController.list);
    this.router.post("/AB/:id", crepaSaladaABEController.getOne);
    this.router.put("/AB/:id", crepaSaladaABEController.update);
    // Aderesos
    this.router.post("/A/", crepaSaladaAEController.list);
    this.router.post("/A/:id", crepaSaladaAEController.getOne);
    this.router.put("/A/:id", crepaSaladaAEController.update);
    // Botanas
    this.router.post("/B/", crepaSaladaBEController.list);
    this.router.post("/B/:id", crepaSaladaBEController.getOne);
    this.router.put("/B/:id", crepaSaladaBEController.update);
    // Ensalada Indivudual
    this.router.post("/EI/", crepaSaladaEIEController.list);
    this.router.post("/EI/:id", crepaSaladaEIEController.getOne);
    this.router.put("/EI/:id", crepaSaladaEIEController.update);
    // Ingredientes Base
    this.router.post("/IB/", crepaSaladaIBEController.list);
    this.router.post("/IB/:id", crepaSaladaIBEController.getOne);
    this.router.put("/IB/:id", crepaSaladaIBEController.update);
    // Ingredientes Principal
    this.router.post("/IP/", crepaSaladaIPEController.list);
    this.router.post("/IP/:id", crepaSaladaIPEController.getOne);
    this.router.put("/IP/:id", crepaSaladaIPEController.update);
  }
}

const crepaSaladaStockRoutes = new CrepaSaladaStockRoutes();
export default crepaSaladaStockRoutes.router;