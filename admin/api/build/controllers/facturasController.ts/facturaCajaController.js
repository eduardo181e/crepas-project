"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facturaCajaController = void 0;
class FacturaCajaController {
    index(req, res) {
        res.json({ text: 'API is ready' });
    }
}
exports.facturaCajaController = new FacturaCajaController();
