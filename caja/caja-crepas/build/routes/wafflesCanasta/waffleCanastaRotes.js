"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waffleCanastaController_1 = __importDefault(require("../../controllers/productsController/waffleCanasta/waffleCanastaController"));
const waflesControllerIC_1 = __importDefault(require("../../controllers/productsController/waffleCanasta/waflesControllerIC"));
const waflesControllerIU_1 = __importDefault(require("../../controllers/productsController/waffleCanasta/waflesControllerIU"));
const waflesControllerN_1 = __importDefault(require("../../controllers/productsController/waffleCanasta/waflesControllerN"));
const waflesControllerD_1 = __importDefault(require("../../controllers/productsController/waffleCanasta/waflesControllerD"));
class WaflesCanastaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Ingredientes untables
        this.router.get('/IU/', waflesControllerIU_1.default.list);
        this.router.get('/IU/:id', waflesControllerIU_1.default.getOne);
        // Ingredientes complementarios
        this.router.get('/IC/', waflesControllerIC_1.default.list);
        this.router.get('/IC/:id', waflesControllerIC_1.default.getOne);
        // Nieves
        this.router.get('/N/', waflesControllerN_1.default.list);
        this.router.get('/N/:id', waflesControllerN_1.default.getOne);
        // Decoraciones
        this.router.get('/D/', waflesControllerD_1.default.list);
        this.router.get('/D/:id', waflesControllerD_1.default.getOne);
        // Precios
        this.router.get('/P/', waffleCanastaController_1.default.list);
        this.router.get('/P/:id', waffleCanastaController_1.default.getOne);
    }
}
const waflesCanastaRoutes = new WaflesCanastaRoutes();
exports.default = waflesCanastaRoutes.router;
