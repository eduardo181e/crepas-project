"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waflesControllerIU_1 = __importDefault(require("../../../controllers/productsController/Wafles/waflesControllerIU"));
const waflesControllerIC_1 = __importDefault(require("../../../controllers/productsController/Wafles/waflesControllerIC"));
const waflesControllerN_1 = __importDefault(require("../../../controllers/productsController/Wafles/waflesControllerN"));
const waflesControllerP_1 = __importDefault(require("../../../controllers/productsController/Wafles/waflesControllerP"));
class WaflesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Ingrediente untablel de wafles
        this.router.get('/IU/', waflesControllerIU_1.default.list);
        this.router.get('/IU/:id', waflesControllerIU_1.default.getOne);
        this.router.post('/IU/', waflesControllerIU_1.default.create);
        this.router.delete('/IU/:id', waflesControllerIU_1.default.delete);
        this.router.put('/IU/:id', waflesControllerIU_1.default.update);
        // Ingrediente complementario de wafles
        this.router.get('/IC/', waflesControllerIC_1.default.list);
        this.router.get('/IC/:id', waflesControllerIC_1.default.getOne);
        this.router.post('/IC/', waflesControllerIC_1.default.create);
        this.router.delete('/IC/:id', waflesControllerIC_1.default.delete);
        this.router.put('/IC/:id', waflesControllerIC_1.default.update);
        // Nieve Wafles
        this.router.get('/N/', waflesControllerN_1.default.list);
        this.router.get('/N/:id', waflesControllerN_1.default.getOne);
        this.router.post('/N/', waflesControllerN_1.default.create);
        this.router.delete('/N/:id', waflesControllerN_1.default.delete);
        this.router.put('/N/:id', waflesControllerN_1.default.update);
        // Precio Wafles
        this.router.get('/P/', waflesControllerP_1.default.list);
        this.router.get('/P/:id', waflesControllerP_1.default.getOne);
        this.router.post('/P/', waflesControllerP_1.default.create);
        this.router.delete('/P/:id', waflesControllerP_1.default.delete);
        this.router.put('/P/:id', waflesControllerP_1.default.update);
    }
}
const waflesRoutes = new WaflesRoutes();
exports.default = waflesRoutes.router;
