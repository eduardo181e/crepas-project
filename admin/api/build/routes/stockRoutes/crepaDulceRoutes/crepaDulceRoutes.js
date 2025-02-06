"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crepaDulceControllerH_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaDulce/crepaDulceControllerH"));
const crepaDulceContrllerIC_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaDulce/crepaDulceContrllerIC"));
const crepaDulceControllerIU_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaDulce/crepaDulceControllerIU"));
const crepaDulceControllerN_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaDulce/crepaDulceControllerN"));
const crepaDulceControllerD_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaDulce/crepaDulceControllerD"));
class CrepaDulceStockRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Harinas
        this.router.post("/H/", crepaDulceControllerH_1.default.list);
        this.router.post("/H/:id", crepaDulceControllerH_1.default.getOne);
        this.router.put("/H/:id", crepaDulceControllerH_1.default.update);
        // Ingredientes Complementarios
        this.router.post("/IC/", crepaDulceContrllerIC_1.default.list);
        this.router.post("/IC/:id", crepaDulceContrllerIC_1.default.getOne);
        this.router.put("/IC/:id", crepaDulceContrllerIC_1.default.update);
        // Ingredientes Untables
        this.router.post("/IU/", crepaDulceControllerIU_1.default.list);
        this.router.post("/IU/:id", crepaDulceControllerIU_1.default.getOne);
        this.router.put("/IU/:id", crepaDulceControllerIU_1.default.update);
        // Nieves
        this.router.post("/N/", crepaDulceControllerN_1.default.list);
        this.router.post("/N/:id", crepaDulceControllerN_1.default.getOne);
        this.router.put("/N/:id", crepaDulceControllerN_1.default.update);
        // Nieves
        this.router.post("/D/", crepaDulceControllerD_1.default.list);
        this.router.post("/D/:id", crepaDulceControllerD_1.default.getOne);
        this.router.put("/D/:id", crepaDulceControllerD_1.default.update);
    }
}
const crepaDulceStockRoutes = new CrepaDulceStockRoutes();
exports.default = crepaDulceStockRoutes.router;
