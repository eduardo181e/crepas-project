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
class CrepaDulceStockRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Harinas
        this.router.get("/H/", crepaDulceControllerH_1.default.list);
        this.router.get("/H/:id", crepaDulceControllerH_1.default.getOne);
        this.router.post("/H/", crepaDulceControllerH_1.default.update);
        // Ingredientes Complementarios
        this.router.get("/IC/", crepaDulceContrllerIC_1.default.list);
        this.router.get("/IC/:id", crepaDulceContrllerIC_1.default.getOne);
        this.router.post("/IC/", crepaDulceContrllerIC_1.default.update);
        // Ingredientes Untables
        this.router.get("/IU/", crepaDulceControllerIU_1.default.list);
        this.router.get("/IU/:id", crepaDulceControllerIU_1.default.getOne);
        this.router.post("/IU/", crepaDulceControllerIU_1.default.update);
        // Nieves
        this.router.get("/N/", crepaDulceControllerN_1.default.list);
        this.router.get("/N/:id", crepaDulceControllerN_1.default.getOne);
        this.router.post("/N/", crepaDulceControllerN_1.default.update);
    }
}
const crepaDulceStockRoutes = new CrepaDulceStockRoutes();
exports.default = crepaDulceStockRoutes.router;
