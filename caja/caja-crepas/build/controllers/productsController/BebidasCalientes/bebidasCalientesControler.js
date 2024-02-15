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
class BebidasCalientesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'];
                console.log(token);
                const tokenWithoutBearer = token.replace('Bearer ', '');
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                console.log(decodedToken);
                const sucursal_id = decodedToken.sucursal;
                const adminId = decodedToken.adminId;
                const query = 'SELECT * FROM bce WHERE sucursal_id = ? AND adminId = ?';
                const bebidas = yield database_1.default.promise().query(query, [sucursal_id, adminId])
                    .then(bebidas => bebidas[0])
                    .catch(err => console.log(err));
                const bebidas2 = yield database_1.default.promise().query('SELECT * FROM bc WHERE adminId = ?', [adminId])
                    .then(bebidas2 => bebidas2[0])
                    .catch(err => console.log(err));
                const existenciaPorProductId = {};
                bebidas.forEach((bebida) => {
                    existenciaPorProductId[bebida.product_id] = bebida;
                });
                // Combinar los datos
                const resultado = [];
                bebidas2.forEach((bebida) => {
                    const existencia = existenciaPorProductId[bebida.id] || { existencia: 0 };
                    resultado.push({
                        product_id: bebida.id,
                        bebida: bebida.bebida,
                        descripcion: bebida.descripcion,
                        existencia: existencia.existencia,
                        precio: bebida.precio,
                        cantidad: existencia.cantidad,
                        inventario: existencia.inventario,
                    });
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
            const token = req.headers['authorization'];
            console.log(token);
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
            console.log(decodedToken);
            const adminId = decodedToken.adminId;
            const bebidaId = req.params.id; // ID del juego solicitado
            const query = 'SELECT * FROM bc WHERE id = ? AND adminId = ?';
            const bebidas = yield database_1.default.promise().query(query, [bebidaId, adminId])
                .then(bebidas => bebidas[0])
                .catch(err => console.log(err));
            if (bebidas.length > 0) {
                res.json(bebidas);
            }
            else {
                res.status(404).json({ text: "la bebida no existe" });
            }
        });
    }
    listStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    sales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sucursal_id, ventas, product_id } = req.body;
            const query = 'SELECT * FROM bce WHERE sucursal_id = ?';
            const inventario = yield database_1.default.promise().query(query, [sucursal_id])
                .then(inventario => {
                console.log(inventario[0]);
            })
                .catch(err => console.log(err));
            res.send('ventas');
            // const {sucursal_id, ventas, product_id} = req.body;
            // const query = 'UPDATE bcv SET ventas = ventas + ? WHERE sucursal_id = ? AND product_id = ?';
            // const venta:any = await pool.promise().query(query, [ventas, sucursal_id, product_id])
        });
    }
}
const bebidasCalientesController = new BebidasCalientesController();
exports.default = bebidasCalientesController;
