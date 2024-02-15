"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sucusalesController_1 = require("../controllers/sucusalesController");
class SucursalesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', sucusalesController_1.sucursalesController.agregar);
    }
}
const sucursalesRoutes = new SucursalesRoutes();
exports.default = sucursalesRoutes.router;
