"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crepaSaladaAderesosBase_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaAderesosBase"));
const crepaSaladaControllerA_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaControllerA"));
const crepaSaladaContrllerB_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaContrllerB"));
const crepaSaladaControllerEI_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaControllerEI"));
const crepaSaladaIngredientesBase_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaIngredientesBase"));
const crepaSaladaControllerIP_1 = __importDefault(require("../../../controllers/stockPrdoucts/CrepaSalada/crepaSaladaControllerIP"));
class CrepaSaladaStockRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Aderesos Base
        this.router.get("/AB/", crepaSaladaAderesosBase_1.default.list);
        this.router.get("/AB/:id", crepaSaladaAderesosBase_1.default.getOne);
        this.router.post("/AB/", crepaSaladaAderesosBase_1.default.update);
        // Aderesos
        this.router.get("/A/", crepaSaladaControllerA_1.default.list);
        this.router.get("/A/:id", crepaSaladaControllerA_1.default.getOne);
        this.router.post("/A/", crepaSaladaControllerA_1.default.update);
        // Botanas
        this.router.get("/B/", crepaSaladaContrllerB_1.default.list);
        this.router.get("/B/:id", crepaSaladaContrllerB_1.default.getOne);
        this.router.post("/B/", crepaSaladaContrllerB_1.default.update);
        // Ensalada Indivudual
        this.router.get("/EI/", crepaSaladaControllerEI_1.default.list);
        this.router.get("/EI/:id", crepaSaladaControllerEI_1.default.getOne);
        this.router.post("/EI/", crepaSaladaControllerEI_1.default.update);
        // Ingredientes Base
        this.router.get("/IB/", crepaSaladaIngredientesBase_1.default.list);
        this.router.get("/IB/:id", crepaSaladaIngredientesBase_1.default.getOne);
        this.router.post("/IB/", crepaSaladaIngredientesBase_1.default.update);
        // Ingredientes Principal
        this.router.get("/IP/", crepaSaladaControllerIP_1.default.list);
        this.router.get("/IP/:id", crepaSaladaControllerIP_1.default.getOne);
        this.router.post("/IP/", crepaSaladaControllerIP_1.default.update);
    }
}
const crepaSaladaStockRoutes = new CrepaSaladaStockRoutes();
exports.default = crepaSaladaStockRoutes.router;
