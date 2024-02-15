"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waffleCanastaController_1 = __importDefault(require("../../../controllers/productsController/waffleCanasta/waffleCanastaController"));
const waflesCanastaControllerIU_1 = __importDefault(require("../../../controllers/productsController/waffleCanasta/waflesCanastaControllerIU"));
const waflesCanastaControllerIC_1 = __importDefault(require("../../../controllers/productsController/waffleCanasta/waflesCanastaControllerIC"));
const waflesCanastaControllerN_1 = __importDefault(require("../../../controllers/productsController/waffleCanasta/waflesCanastaControllerN"));
class WaflesCanastaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Ingrediente untablel de wafles
        this.router.get('/IU/', waflesCanastaControllerIU_1.default.list);
        this.router.get('/IU/:id', waflesCanastaControllerIU_1.default.getOne);
        this.router.post('/IU/', waflesCanastaControllerIU_1.default.create);
        this.router.delete('/IU/:id', waflesCanastaControllerIU_1.default.delete);
        this.router.put('/IU/:id', waflesCanastaControllerIU_1.default.update);
        // Ingrediente complementario de wafles
        this.router.get('/IC/', waflesCanastaControllerIC_1.default.list);
        this.router.get('/IC/:id', waflesCanastaControllerIC_1.default.getOne);
        this.router.post('/IC/', waflesCanastaControllerIC_1.default.create);
        this.router.delete('/IC/:id', waflesCanastaControllerIC_1.default.delete);
        this.router.put('/IC/:id', waflesCanastaControllerIC_1.default.update);
        // Nieve Wafles
        this.router.get('/N/', waflesCanastaControllerN_1.default.list);
        this.router.get('/N/:id', waflesCanastaControllerN_1.default.getOne);
        this.router.post('/N/', waflesCanastaControllerN_1.default.create);
        this.router.delete('/N/:id', waflesCanastaControllerN_1.default.delete);
        this.router.put('/N/:id', waflesCanastaControllerN_1.default.update);
        // Precios
        this.router.get('/P/', waffleCanastaController_1.default.list);
        this.router.get('/P/:id', waffleCanastaController_1.default.getOne);
        this.router.post('/P/', waffleCanastaController_1.default.create);
        this.router.delete('/P/:id', waffleCanastaController_1.default.delete);
        this.router.put('/P/:id', waffleCanastaController_1.default.update);
    }
}
const waflesCanastaRoutes = new WaflesCanastaRoutes();
exports.default = waflesCanastaRoutes.router;
