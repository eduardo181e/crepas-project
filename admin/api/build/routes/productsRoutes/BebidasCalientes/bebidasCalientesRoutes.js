"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bebidasCalientesControler_1 = __importDefault(require("../../../controllers/productsController/BebidasCalientes/bebidasCalientesControler"));
class BebidasCalientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Ingrediente untablel de wafles
        this.router.get('/', bebidasCalientesControler_1.default.list);
        this.router.get('/:id', bebidasCalientesControler_1.default.getOne);
        this.router.post('/', bebidasCalientesControler_1.default.create);
        this.router.delete('/:id', bebidasCalientesControler_1.default.delete);
        this.router.put('/:id', bebidasCalientesControler_1.default.update);
    }
}
const bebidasCalientesRoutes = new BebidasCalientesRoutes();
exports.default = bebidasCalientesRoutes.router;
