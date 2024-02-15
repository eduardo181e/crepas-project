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
        this.router.get('/', bebidasCalientesControler_1.default.list);
        this.router.get('/C/:id', bebidasCalientesControler_1.default.getOne);
        this.router.get('/Cstock', bebidasCalientesControler_1.default.listStock);
        this.router.post('/sales', bebidasCalientesControler_1.default.sales);
    }
}
const bebidasCalientesRoutes = new BebidasCalientesRoutes();
exports.default = bebidasCalientesRoutes.router;
