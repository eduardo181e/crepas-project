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
        this.router.post('/add', sucusalesController_1.sucursalesController.agregar);
        this.router.put('/edit/:id', sucusalesController_1.sucursalesController.update);
        this.router.delete('/delete/:id', sucusalesController_1.sucursalesController.delete);
        this.router.get('/get', sucusalesController_1.sucursalesController.view);
        this.router.get('/getOne/:id', sucusalesController_1.sucursalesController.viewOne);
        this.router.get('/estados', sucusalesController_1.sucursalesController.estados);
        this.router.get('/paises', sucusalesController_1.sucursalesController.paises);
    }
}
const sucursalesRoutes = new SucursalesRoutes();
exports.default = sucursalesRoutes.router;
