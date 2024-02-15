"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bebidasCalientesControler_1 = __importDefault(require("../../../controllers/stockPrdoucts/bebidasCalientes/bebidasCalientesControler"));
class BebidasCalientesStockRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', bebidasCalientesControler_1.default.list);
        this.router.get('/:id', bebidasCalientesControler_1.default.getOne);
        this.router.post('/:id', bebidasCalientesControler_1.default.update);
    }
}
const bebidasCalientesStockRoutes = new BebidasCalientesStockRoutes();
exports.default = bebidasCalientesStockRoutes.router;
