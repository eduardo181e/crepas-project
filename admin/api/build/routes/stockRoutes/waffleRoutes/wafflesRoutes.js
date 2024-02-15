"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waflesControllerIU_1 = __importDefault(require("../../../controllers/stockPrdoucts/Wafles/waflesControllerIU"));
const waflesControllerIC_1 = __importDefault(require("../../../controllers/stockPrdoucts/Wafles/waflesControllerIC"));
const waflesControllerN_1 = __importDefault(require("../../../controllers/stockPrdoucts/Wafles/waflesControllerN"));
class WafflesStockRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Ingredientes Untables
        this.router.post("/IU/", waflesControllerIU_1.default.list);
        this.router.post("/IU/:id", waflesControllerIU_1.default.getOne);
        this.router.put("/IU/:id", waflesControllerIU_1.default.update);
        // Ingredientes Complementarios
        this.router.post("/IC/", waflesControllerIC_1.default.list);
        this.router.post("/IC/:id", waflesControllerIC_1.default.getOne);
        this.router.put("/IC/:id", waflesControllerIC_1.default.update);
        // Nieves
        this.router.post("/N/", waflesControllerN_1.default.list);
        this.router.post("/N/:id", waflesControllerN_1.default.getOne);
        this.router.put("/N/:id", waflesControllerN_1.default.update);
    }
}
const wafflesStockRoutes = new WafflesStockRoutes();
exports.default = wafflesStockRoutes.router;
