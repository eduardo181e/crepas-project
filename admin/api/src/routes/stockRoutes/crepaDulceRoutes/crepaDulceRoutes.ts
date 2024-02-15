import { Router } from "express";
import crepaDulceHEController from "../../../controllers/stockPrdoucts/CrepaDulce/crepaDulceControllerH";
import crepaDulceICEController from "../../../controllers/stockPrdoucts/CrepaDulce/crepaDulceContrllerIC";
import crepaDulceIUEController from "../../../controllers/stockPrdoucts/CrepaDulce/crepaDulceControllerIU";
import crepaDulceNEController from "../../../controllers/stockPrdoucts/CrepaDulce/crepaDulceControllerN";
class CrepaDulceStockRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    // Harinas
    this.router.post("/H/", crepaDulceHEController.list);
    this.router.post("/H/:id", crepaDulceHEController.getOne);
    this.router.put("/H/:id", crepaDulceHEController.update);
    // Ingredientes Complementarios
    this.router.post("/IC/", crepaDulceICEController.list);
    this.router.post("/IC/:id", crepaDulceICEController.getOne);
    this.router.put("/IC/:id", crepaDulceICEController.update);
    // Ingredientes Untables
    this.router.post("/IU/", crepaDulceIUEController.list);
    this.router.post("/IU/:id", crepaDulceIUEController.getOne);
    this.router.put("/IU/:id", crepaDulceIUEController.update);
    // Nieves
    this.router.post("/N/", crepaDulceNEController.list);
    this.router.post("/N/:id", crepaDulceNEController.getOne);
    this.router.put("/N/:id", crepaDulceNEController.update);
  }
}

const crepaDulceStockRoutes = new CrepaDulceStockRoutes();
export default crepaDulceStockRoutes.router;