"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crepaDulceControllerH_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaDulce/crepaDulceControllerH"));
const crepaDulceContrllerIC_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaDulce/crepaDulceContrllerIC"));
const crepaDulceControllerIU_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaDulce/crepaDulceControllerIU"));
const crepaDulceControllerN_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaDulce/crepaDulceControllerN"));
const crepaDulceControllerD_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaDulce/crepaDulceControllerD"));
class CrepaDulceSalesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Harinas
        this.router.post('/H/', crepaDulceControllerH_1.default.list);
        this.router.get('/H/:id', crepaDulceControllerH_1.default.getOne);
        this.router.post('/H/laps', crepaDulceControllerH_1.default.listLaps);
        // Ingredientes Complementarios
        this.router.post('/IC/', crepaDulceContrllerIC_1.default.list);
        this.router.get('/IC/:id', crepaDulceContrllerIC_1.default.getOne);
        this.router.post('/IC/laps', crepaDulceContrllerIC_1.default.listLaps);
        // Ingredientes Untables
        this.router.post('/IU/', crepaDulceControllerIU_1.default.list);
        this.router.get('/IU/:id', crepaDulceControllerIU_1.default.getOne);
        this.router.post('/IU/laps', crepaDulceControllerIU_1.default.listLaps);
        // Nieves
        this.router.post('/N/', crepaDulceControllerN_1.default.list);
        this.router.get('/N/:id', crepaDulceControllerN_1.default.getOne);
        this.router.post('/N/laps', crepaDulceControllerN_1.default.listLaps);
        // Decoraciones
        this.router.post('/D/', crepaDulceControllerD_1.default.list);
        this.router.get('/D/:id', crepaDulceControllerD_1.default.getOne);
        this.router.post('/D/laps', crepaDulceControllerD_1.default.listLaps);
    }
}
const crepaDulceGlobalSalesRoutes = new CrepaDulceSalesRoutes();
exports.default = crepaDulceGlobalSalesRoutes.router;
