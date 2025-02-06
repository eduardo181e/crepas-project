"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waflesControllerIU_1 = __importDefault(require("../../../controllers/productsController/Wafles/waflesControllerIU"));
const waflesControllerIC_1 = __importDefault(require("../../../controllers/productsController/Wafles/waflesControllerIC"));
const waflesControllerN_1 = __importDefault(require("../../../controllers/productsController/Wafles/waflesControllerN"));
const waflesControllerD_1 = __importDefault(require("../../../controllers/productsController/Wafles/waflesControllerD"));
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
        // Ingrediente complementario de wafles
        this.router.get('/IC/', waflesControllerIC_1.default.list);
        this.router.get('/IC/:id', waflesControllerIC_1.default.getOne);
        // Nieve Wafles
        this.router.get('/N/', waflesControllerN_1.default.list);
        this.router.get('/N/:id', waflesControllerN_1.default.getOne);
        // Decoracion Wafles
        this.router.get('/D/', waflesControllerD_1.default.list);
        this.router.get('/D/:id', waflesControllerD_1.default.getOne);
        // Precio Wafles
        this.router.get('/P/', waflesControllerP_1.default.list);
        this.router.get('/P/:id', waflesControllerP_1.default.getOne);
    }
}
const waflesRoutes = new WaflesRoutes();
exports.default = waflesRoutes.router;
