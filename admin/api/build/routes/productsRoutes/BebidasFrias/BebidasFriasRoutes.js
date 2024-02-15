"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bebidasFriasController_1 = __importDefault(require("../../../controllers/productsController/BebidasFrias/bebidasFriasController"));
class BebidasFriasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Ingrediente untablel de wafles
        this.router.get('/', bebidasFriasController_1.default.list);
        this.router.get('/:id', bebidasFriasController_1.default.getOne);
        this.router.post('/', bebidasFriasController_1.default.create);
        this.router.delete('/:id', bebidasFriasController_1.default.delete);
        this.router.put('/:id', bebidasFriasController_1.default.update);
    }
}
const bebidasFriasRoutes = new BebidasFriasRoutes();
exports.default = bebidasFriasRoutes.router;
