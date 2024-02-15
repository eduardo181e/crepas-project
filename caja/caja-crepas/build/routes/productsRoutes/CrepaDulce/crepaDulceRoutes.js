"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crepaDulceControllerH_1 = __importDefault(require("../../../controllers/productsController/CrepaDulce/crepaDulceControllerH"));
const crepaDulceControllerIU_1 = __importDefault(require("../../../controllers/productsController/CrepaDulce/crepaDulceControllerIU"));
const crepaDulceContrllerIC_1 = __importDefault(require("../../../controllers/productsController/CrepaDulce/crepaDulceContrllerIC"));
const crepaDulceControllerN_1 = __importDefault(require("../../../controllers/productsController/CrepaDulce/crepaDulceControllerN"));
const crepaDulceControllerP_1 = __importDefault(require("../../../controllers/productsController/CrepaDulce/crepaDulceControllerP"));
class CrepaDulceRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Harina de crepa dulce
        this.router.get('/H/', crepaDulceControllerH_1.default.list);
        this.router.get('/H/:id', crepaDulceControllerH_1.default.getOne);
        // Ingredientes untables crepa dulce
        this.router.get('/IU/', crepaDulceControllerIU_1.default.list);
        this.router.get('/IU/:id', crepaDulceControllerIU_1.default.getOne);
        // Ingrediente complemetario crepa dulce
        this.router.get('/IC/', crepaDulceContrllerIC_1.default.list);
        this.router.get('/IC/:id', crepaDulceContrllerIC_1.default.getOne);
        this.router.post('/IC/sales/', crepaDulceContrllerIC_1.default.sales);
        // Nieve Crepa Dulce
        this.router.get('/N/', crepaDulceControllerN_1.default.list);
        // Precios Crepa Dulce
        this.router.get('/P/', crepaDulceControllerP_1.default.list);
        this.router.get('/P/:id', crepaDulceControllerP_1.default.getOne);
    }
}
const crepaDulceRoutes = new CrepaDulceRoutes();
exports.default = crepaDulceRoutes.router;
