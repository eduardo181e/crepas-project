"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bebidasFriasControler_1 = __importDefault(require("../../../controllers/stockPrdoucts/bebidasFrias/bebidasFriasControler"));
class BebidasFriasStockRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', bebidasFriasControler_1.default.list);
        this.router.get('/:id', bebidasFriasControler_1.default.getOne);
        this.router.post('/:id', bebidasFriasControler_1.default.update);
    }
}
const bebidasFriasStockRoutes = new BebidasFriasStockRoutes();
exports.default = bebidasFriasStockRoutes.router;
