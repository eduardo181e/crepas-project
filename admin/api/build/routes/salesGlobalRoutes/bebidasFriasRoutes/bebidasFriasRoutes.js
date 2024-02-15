"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bebidasCalientesControler_1 = __importDefault(require("../../../controllers/salesGlobalControler/bebidasFrias/bebidasCalientesControler"));
class BebidasFriasSalesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', bebidasCalientesControler_1.default.list);
        this.router.get('/:id', bebidasCalientesControler_1.default.getOne);
        this.router.post('/laps', bebidasCalientesControler_1.default.listLaps);
    }
}
const bebidasFriasGlobalSalesRoutes = new BebidasFriasSalesRoutes();
exports.default = bebidasFriasGlobalSalesRoutes.router;
