"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturaCajaControllers_1 = require("../../controllers/facturasControllers/facturaCajaControllers");
class FacturasCajaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', facturaCajaControllers_1.facturaCajaController.list);
        this.router.get('/:id/', facturaCajaControllers_1.facturaCajaController.getOne);
        this.router.post('/laps/', facturaCajaControllers_1.facturaCajaController.listLaps);
        this.router.post('/all/', facturaCajaControllers_1.facturaCajaController.allList);
        this.router.post('/allLaps/', facturaCajaControllers_1.facturaCajaController.lapsListAll);
    }
}
const facturasCajaRoutes = new FacturasCajaRoutes();
exports.default = facturasCajaRoutes.router;
