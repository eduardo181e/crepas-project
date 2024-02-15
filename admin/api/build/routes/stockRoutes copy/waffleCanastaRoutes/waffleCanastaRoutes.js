"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waflesControllerIU_1 = __importDefault(require("../../../controllers/stockPrdoucts/waffleCanasta/waflesControllerIU"));
const waflesControllerIC_1 = __importDefault(require("../../../controllers/stockPrdoucts/waffleCanasta/waflesControllerIC"));
const waflesControllerN_1 = __importDefault(require("../../../controllers/stockPrdoucts/waffleCanasta/waflesControllerN"));
class WaffleCanastaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Ingredientes Untables
        this.router.get("/IU/", waflesControllerIU_1.default.list);
        this.router.get("/IU/:id", waflesControllerIU_1.default.getOne);
        this.router.post("/IU/", waflesControllerIU_1.default.update);
        // Ingredientes Complementarios
        this.router.get("/IC/", waflesControllerIC_1.default.list);
        this.router.get("/IC/:id", waflesControllerIC_1.default.getOne);
        this.router.post("/IC/", waflesControllerIC_1.default.update);
        // Nieves
        this.router.get("/N/", waflesControllerN_1.default.list);
        this.router.get("/N/:id", waflesControllerN_1.default.getOne);
        this.router.post("/N/", waflesControllerN_1.default.update);
    }
}
const waffleCanastaRoutes = new WaffleCanastaRoutes();
exports.default = waffleCanastaRoutes.router;
