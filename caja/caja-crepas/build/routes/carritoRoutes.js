"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoController_1 = require("../controllers/carritoController");
class CarritoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', carritoController_1.carritoController.index);
        this.router.post('/add', carritoController_1.carritoController.agregar);
        this.router.get('/view', carritoController_1.carritoController.view);
        this.router.delete('/delete/:id', carritoController_1.carritoController.delete);
        this.router.put('/update', carritoController_1.carritoController.updateMesa);
        this.router.get('/one/:id', carritoController_1.carritoController.viewOne);
        this.router.put('/edit/:id', carritoController_1.carritoController.update);
        this.router.get('/factura/:id', carritoController_1.carritoController.getFactura);
        this.router.delete('/deleteAll', carritoController_1.carritoController.deleteAll);
    }
}
const carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;
