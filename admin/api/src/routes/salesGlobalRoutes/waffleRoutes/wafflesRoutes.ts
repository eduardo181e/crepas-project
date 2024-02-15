import { Router } from "express";
import waffleIUVController from "../../../controllers/salesGlobalControler/Wafles/waflesControllerIU";
import waffleICVController from "../../../controllers/salesGlobalControler/Wafles/waflesControllerIC";
import waffleNVController from "../../../controllers/salesGlobalControler/Wafles/waflesControllerN";
class WafflesSalesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
    // Ingredientes Complementarios
    this.router.post('/IC/', waffleICVController.list);
    this.router.get('/IC/:id', waffleICVController.getOne);
    this.router.post('/IC/laps', waffleICVController.listLaps);
    // Ingredientes Untables
    this.router.post('/IU/', waffleIUVController.list);
    this.router.get('/IU/:id', waffleIUVController.getOne);
    this.router.post('/IU/laps', waffleIUVController.listLaps);
    // Nieves
    this.router.post('/N/', waffleNVController.list);
    this.router.get('/N/:id', waffleNVController.getOne);
    this.router.post('/N/laps', waffleNVController.listLaps);
    }
}

const wafflesSalesGlobalRoutes = new WafflesSalesRoutes();
export default wafflesSalesGlobalRoutes.router;