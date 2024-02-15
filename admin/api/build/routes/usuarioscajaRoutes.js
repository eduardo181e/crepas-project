"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosCajaController_1 = __importDefault(require("../controllers/usuariosCajaController"));
class CajaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.delete('/usuarios/:id', usuariosCajaController_1.default.delete);
        this.router.put('/usuarios/:id', usuariosCajaController_1.default.update);
        this.router.get('/usuarios/:id', usuariosCajaController_1.default.getOne);
        this.router.get('/usuarios', usuariosCajaController_1.default.list);
        this.router.post('/new', usuariosCajaController_1.default.create);
    }
}
const cajaRoutes = new CajaRoutes();
exports.default = cajaRoutes.router;
