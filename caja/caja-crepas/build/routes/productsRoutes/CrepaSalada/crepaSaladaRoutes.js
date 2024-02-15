"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crepaSaladaControllerIP_1 = __importDefault(require("../../../controllers/productsController/CrepaSalada/crepaSaladaControllerIP"));
const crepaSaladaControllerA_1 = __importDefault(require("../../../controllers/productsController/CrepaSalada/crepaSaladaControllerA"));
const crepaSaladaControllerEI_1 = __importDefault(require("../../../controllers/productsController/CrepaSalada/crepaSaladaControllerEI"));
const crepaSaladaContrllerB_1 = __importDefault(require("../../../controllers/productsController/CrepaSalada/crepaSaladaContrllerB"));
const crepaSaladaControllerP_1 = __importDefault(require("../../../controllers/productsController/CrepaSalada/crepaSaladaControllerP"));
const crepaSaladaIngredientesBase_1 = __importDefault(require("../../../controllers/productsController/CrepaSalada/crepaSaladaIngredientesBase"));
const crepaSaladaAderesosBase_1 = __importDefault(require("../../../controllers/productsController/CrepaSalada/crepaSaladaAderesosBase"));
class CrepaSaladaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Ingrediente Principal de crepa salada
        this.router.get('/IP/', crepaSaladaControllerIP_1.default.list);
        this.router.get('/IP/:id', crepaSaladaControllerIP_1.default.getOne);
        // Adereso de crepa salada
        this.router.get('/A/', crepaSaladaControllerA_1.default.list);
        this.router.get('/A/:id', crepaSaladaControllerA_1.default.getOne);
        // Ingrediente Base de crepa salada
        this.router.get('/IB/', crepaSaladaIngredientesBase_1.default.list);
        this.router.get('/IB/:id', crepaSaladaIngredientesBase_1.default.getOne);
        // Adereso Base de crepa salada
        this.router.get('/AB/', crepaSaladaAderesosBase_1.default.list);
        this.router.get('/AB/:id', crepaSaladaAderesosBase_1.default.getOne);
        // Ensalada individual crepa salada
        this.router.get('/EI/', crepaSaladaControllerEI_1.default.list);
        this.router.get('/EI/:id', crepaSaladaControllerEI_1.default.getOne);
        // Botana crepa salada
        this.router.get('/B/', crepaSaladaContrllerB_1.default.list);
        this.router.get('/B/:id', crepaSaladaContrllerB_1.default.getOne);
        // Precio crepa salada
        this.router.get('/P/', crepaSaladaControllerP_1.default.list);
        this.router.get('/P/:id', crepaSaladaControllerP_1.default.getOne);
    }
}
const crepaSaladaRoutes = new CrepaSaladaRoutes();
exports.default = crepaSaladaRoutes.router;
