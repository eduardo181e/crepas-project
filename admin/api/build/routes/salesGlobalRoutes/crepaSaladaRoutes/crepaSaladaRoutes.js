"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crepaSaladaAderesosBase_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaAderesosBase"));
const crepaSaladaControllerA_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaControllerA"));
const crepaSaladaContrllerB_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaContrllerB"));
const crepaSaladaControllerEI_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaControllerEI"));
const crepaSaladaIngredientesBase_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaIngredientesBase"));
const crepaSaladaControllerIP_1 = __importDefault(require("../../../controllers/salesGlobalControler/CrepaSalada/crepaSaladaControllerIP"));
class CrepaSaladaSalesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Aderesos Base
        this.router.post('/AB/', crepaSaladaAderesosBase_1.default.list);
        this.router.get('/AB/:id', crepaSaladaAderesosBase_1.default.getOne);
        this.router.post('/AB/laps', crepaSaladaAderesosBase_1.default.listLaps);
        // Aderesos
        this.router.post('/A/', crepaSaladaControllerA_1.default.list);
        this.router.get('/A/:id', crepaSaladaControllerA_1.default.getOne);
        this.router.post('/A/laps', crepaSaladaControllerA_1.default.listLaps);
        // Botanas
        this.router.post('/B/', crepaSaladaContrllerB_1.default.list);
        this.router.get('/B/:id', crepaSaladaContrllerB_1.default.getOne);
        this.router.post('/B/laps', crepaSaladaContrllerB_1.default.listLaps);
        // Ensalada Indivudual
        this.router.post('/EI/', crepaSaladaControllerEI_1.default.list);
        this.router.get('/EI/:id', crepaSaladaControllerEI_1.default.getOne);
        this.router.post('/EI/laps', crepaSaladaControllerEI_1.default.listLaps);
        // Ingredientes Base
        this.router.post('/IB/', crepaSaladaIngredientesBase_1.default.list);
        this.router.get('/IB/:id', crepaSaladaIngredientesBase_1.default.getOne);
        this.router.post('/IB/laps', crepaSaladaIngredientesBase_1.default.listLaps);
        // Ingredientes Principal
        this.router.post('/IP/', crepaSaladaControllerIP_1.default.list);
        this.router.get('/IP/:id', crepaSaladaControllerIP_1.default.getOne);
        this.router.post('/IP/laps', crepaSaladaControllerIP_1.default.listLaps);
    }
}
const crepaSaladaGlobalSalesRoutes = new CrepaSaladaSalesRoutes();
exports.default = crepaSaladaGlobalSalesRoutes.router;
