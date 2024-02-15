"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosEccomerController_1 = __importDefault(require("../controllers/usuariosEccomerController"));
class EccomerRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.delete('/usuarios/:id', usuariosEccomerController_1.default.delete);
        this.router.put('/usuarios/:id', usuariosEccomerController_1.default.update);
        this.router.get('/usuarios/:id', usuariosEccomerController_1.default.getOne);
        this.router.get('/usuarios', usuariosEccomerController_1.default.list);
        this.router.post('/new', usuariosEccomerController_1.default.create);
    }
}
const eccomerRoutes = new EccomerRoutes();
exports.default = eccomerRoutes.router;
