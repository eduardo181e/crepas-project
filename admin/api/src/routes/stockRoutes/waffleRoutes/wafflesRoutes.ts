import { Router } from "express";
import waffleIUEController from "../../../controllers/stockPrdoucts/Wafles/waflesControllerIU";
import waffleICEController from "../../../controllers/stockPrdoucts/Wafles/waflesControllerIC";
import waffleNEController from "../../../controllers/stockPrdoucts/Wafles/waflesControllerN";
import waffleDEController from "../../../controllers/stockPrdoucts/Wafles/waflesControllerD";
class WafflesStockRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Ingredientes Untables
        this.router.post("/IU/", waffleIUEController.list);
        this.router.post("/IU/:id", waffleIUEController.getOne);
        this.router.put("/IU/:id", waffleIUEController.update);
        // Ingredientes Complementarios
        this.router.post("/IC/", waffleICEController.list);
        this.router.post("/IC/:id", waffleICEController.getOne);
        this.router.put("/IC/:id", waffleICEController.update);
        // Nieves
        this.router.post("/N/", waffleNEController.list);
        this.router.post("/N/:id", waffleNEController.getOne);
        this.router.put("/N/:id", waffleNEController.update);
        // Decoraciones
        this.router.post("/D/", waffleDEController.list);
        this.router.post("/D/:id", waffleDEController.getOne);
        this.router.put("/D/:id", waffleDEController.update);
    }
}

const wafflesStockRoutes = new WafflesStockRoutes();
export default wafflesStockRoutes.router;