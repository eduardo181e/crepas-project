import { Router } from "express";
import waffleCanastaIUVController from "../../../controllers/salesControler/waffleCanasta/waflesControllerIU";
import waffleCanastaICVController from "../../../controllers/salesControler/waffleCanasta/waflesControllerIC";
import waffleCanastaNVController from "../../../controllers/salesControler/waffleCanasta/waflesControllerN";
import waffleCanastaDVController from "../../../controllers/salesControler/waffleCanasta/waflesControllerD";
class WaffleCanastaSalesRoutes {
    public router: Router = Router();
    
    constructor() {
        this.config();
    }
    
    config(): void {
    // Ingredientes Complementarios
    this.router.post('/IC/', waffleCanastaICVController.list);
    this.router.get('/IC/:id', waffleCanastaICVController.getOne);
    this.router.post('/IC/laps', waffleCanastaICVController.listLaps);
    // Ingredientes Untables
    this.router.post('/IU/', waffleCanastaIUVController.list);
    this.router.get('/IU/:id', waffleCanastaIUVController.getOne);
    this.router.post('/IU/laps', waffleCanastaIUVController.listLaps);
    // Nieves
    this.router.post('/N/', waffleCanastaNVController.list);
    this.router.get('/N/:id', waffleCanastaNVController.getOne);
    this.router.post('/N/laps', waffleCanastaNVController.listLaps);
    // Nieves
    this.router.post('/D/', waffleCanastaDVController.list);
    this.router.get('/D/:id', waffleCanastaDVController.getOne);
    this.router.post('/D/laps', waffleCanastaDVController.listLaps);
    }
}

const waffleCanastaSalesRoutes = new WaffleCanastaSalesRoutes();
export default waffleCanastaSalesRoutes.router;