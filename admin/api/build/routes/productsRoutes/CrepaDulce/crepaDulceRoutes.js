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
const crepaDulceControllerD_1 = __importDefault(require("../../../controllers/productsController/CrepaDulce/crepaDulceControllerD"));
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
        this.router.post('/H/', crepaDulceControllerH_1.default.create);
        this.router.delete('/H/:id', crepaDulceControllerH_1.default.delete);
        this.router.put('/H/:id', crepaDulceControllerH_1.default.update);
        // Ingredientes untables crepa dulce
        this.router.get('/IU/', crepaDulceControllerIU_1.default.list);
        this.router.get('/IU/:id', crepaDulceControllerIU_1.default.getOne);
        this.router.post('/IU/', crepaDulceControllerIU_1.default.create);
        this.router.delete('/IU/:id', crepaDulceControllerIU_1.default.delete);
        this.router.put('/IU/:id', crepaDulceControllerIU_1.default.update);
        // Ingrediente complemetario crepa dulce
        this.router.get('/IC/', crepaDulceContrllerIC_1.default.list);
        this.router.get('/IC/:id', crepaDulceContrllerIC_1.default.getOne);
        this.router.post('/IC/', crepaDulceContrllerIC_1.default.create);
        this.router.delete('/IC/:id', crepaDulceContrllerIC_1.default.delete);
        this.router.put('/IC/:id', crepaDulceContrllerIC_1.default.update);
        // Nieve Crepa Dulce
        this.router.get('/N/', crepaDulceControllerN_1.default.list);
        this.router.get('/N/:id', crepaDulceControllerN_1.default.getOne);
        this.router.post('/N/', crepaDulceControllerN_1.default.create);
        this.router.delete('/N/:id', crepaDulceControllerN_1.default.delete);
        this.router.put('/N/:id', crepaDulceControllerN_1.default.update);
        // Decoracion Crepa Dulce
        this.router.get('/D/', crepaDulceControllerD_1.default.list);
        this.router.get('/D/:id', crepaDulceControllerD_1.default.getOne);
        this.router.put('/D/:id', crepaDulceControllerD_1.default.update);
        // Precios Crepa Dulce
        this.router.get('/P/', crepaDulceControllerP_1.default.list);
        this.router.get('/P/:id', crepaDulceControllerP_1.default.getOne);
        this.router.post('/P/', crepaDulceControllerP_1.default.create);
        this.router.delete('/P/:id', crepaDulceControllerP_1.default.delete);
        this.router.put('/P/:id', crepaDulceControllerP_1.default.update);
    }
}
const crepaDulceRoutes = new CrepaDulceRoutes();
exports.default = crepaDulceRoutes.router;
