"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class WaflesCanastaIngredienteUntableController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro');
                const sucursal = decodedToken.sucursal;
                const adminId = decodedToken.adminId;
                const query = 'SELECT * FROM wciue WHERE sucursal_id = ? AND adminId = ?';
                const ingredientes = yield database_1.default.promise().query(query, [sucursal, adminId])
                    .then(ingredientes => ingredientes[0])
                    .catch(err => console.log(err));
                const ingredientes2 = yield database_1.default.promise().query('SELECT * FROM wciu WHERE adminId = ?', [adminId])
                    .then(ingredientes2 => ingredientes2[0])
                    .catch(err => console.log(err));
                const existenciasId = {};
                ingredientes.forEach((existencia) => {
                    existenciasId[existencia.product_id] = existencia;
                });
                const resultado = ingredientes2.map((ingrediente) => {
                    const existencia = existenciasId[ingrediente.id] || { existencia: 0 };
                    return {
                        id: existencia.product_id,
                        ingrediente_unt: ingrediente.ingrediente_unt,
                        existencia: existencia.existencia,
                        cantidad: existencia.cantidad,
                        inventario: existencia.inventario,
                    };
                });
                res.json(resultado);
            }
            catch (error) {
                console.log(error);
                // Maneja cualquier error y envía una respuesta de error si es necesario
                res.status(500).json({ error: 'Ocurrió un error interno' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredienteId = req.params.id; // ID del juego solicitado
            const query = 'SELECT * FROM wciu WHERE id = ?';
            const ingredientes = yield database_1.default.promise().query(query, [ingredienteId])
                .then(ingredientes => ingredientes[0])
                .catch(err => console.log(err));
            if (ingredientes.length > 0) {
                res.json(ingredientes);
            }
            else {
                res.status(404).json({ text: "El ingrediente no existe" });
            }
        });
    }
}
const waflesCanastaIUController = new WaflesCanastaIngredienteUntableController();
exports.default = waflesCanastaIUController;
