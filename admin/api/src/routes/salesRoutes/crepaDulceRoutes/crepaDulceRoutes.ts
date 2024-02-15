import { Router } from "express";
import crepaDulceHVController from "../../../controllers/salesControler/CrepaDulce/crepaDulceControllerH";
import crepaDulceICVController from "../../../controllers/salesControler/CrepaDulce/crepaDulceContrllerIC";
import crepaDulceIUVController from "../../../controllers/salesControler/CrepaDulce/crepaDulceControllerIU";
import crepaDulceNVController from "../../../controllers/salesControler/CrepaDulce/crepaDulceControllerN";
class CrepaDulceSalesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    // Harinas
    this.router.post('/H/', crepaDulceHVController.list);
    this.router.get('/H/:id', crepaDulceHVController.getOne);
    this.router.post('/H/laps', crepaDulceHVController.listLaps);
    // Ingredientes Complementarios
    this.router.post('/IC/', crepaDulceICVController.list);
    this.router.get('/IC/:id', crepaDulceICVController.getOne);
    this.router.post('/IC/laps', crepaDulceICVController.listLaps);
    // Ingredientes Untables
    this.router.post('/IU/', crepaDulceIUVController.list);
    this.router.get('/IU/:id', crepaDulceIUVController.getOne);
    this.router.post('/IU/laps', crepaDulceIUVController.listLaps);
    // Nieves
    this.router.post('/N/', crepaDulceNVController.list);
    this.router.get('/N/:id', crepaDulceNVController.getOne);
    this.router.post('/N/laps', crepaDulceNVController.listLaps);
  }
}

const crepaDulceSalesRoutes = new CrepaDulceSalesRoutes();
export default crepaDulceSalesRoutes.router;