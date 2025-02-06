"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasControle_1 = require("../controllers/ventasControle");
class VentasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/sales/:now/:mesa', ventasControle_1.ventasController.sales);
    }
}
const ventasRoutes = new VentasRoutes();
exports.default = ventasRoutes.router;
