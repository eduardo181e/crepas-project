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
        this.router.post("/AB/", crepaSaladaAderesosBase_1.default.list);
        this.router.post("/AB/:id", crepaSaladaAderesosBase_1.default.getOne);
        this.router.put("/AB/:id", crepaSaladaAderesosBase_1.default.update);
        // Aderesos
        this.router.post("/A/", crepaSaladaControllerA_1.default.list);
        this.router.post("/A/:id", crepaSaladaControllerA_1.default.getOne);
        this.router.put("/A/:id", crepaSaladaControllerA_1.default.update);
        // Botanas
        this.router.post("/B/", crepaSaladaContrllerB_1.default.list);
        this.router.post("/B/:id", crepaSaladaContrllerB_1.default.getOne);
        this.router.put("/B/:id", crepaSaladaContrllerB_1.default.update);
        // Ensalada Indivudual
        this.router.post("/EI/", crepaSaladaControllerEI_1.default.list);
        this.router.post("/EI/:id", crepaSaladaControllerEI_1.default.getOne);
        this.router.put("/EI/:id", crepaSaladaControllerEI_1.default.update);
        // Ingredientes Base
        this.router.post("/IB/", crepaSaladaIngredientesBase_1.default.list);
        this.router.post("/IB/:id", crepaSaladaIngredientesBase_1.default.getOne);
        this.router.put("/IB/:id", crepaSaladaIngredientesBase_1.default.update);
        // Ingredientes Principal
        this.router.post("/IP/", crepaSaladaControllerIP_1.default.list);
        this.router.post("/IP/:id", crepaSaladaControllerIP_1.default.getOne);
        this.router.put("/IP/:id", crepaSaladaControllerIP_1.default.update);
    }
}
const crepaSaladaStockRoutes = new CrepaSaladaStockRoutes();
exports.default = crepaSaladaStockRoutes.router;
