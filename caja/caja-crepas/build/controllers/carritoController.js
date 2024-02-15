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
exports.carritoController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const databaseproduct_1 = __importDefault(require("../databaseproduct"));
class CarritoController {
    index(req, res) {
        res.json({ text: 'API is ready' });
    }
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro');
            const userId = decodedToken.id;
            const adminId = decodedToken.adminId;
            const { orden } = req.body;
            const orden1 = JSON.stringify(orden);
            const Orden = {
                orden: orden1,
                nombre: req.body.nombre,
                precio: req.body.precio,
                total: req.body.precio,
                userId: userId,
                adminId: adminId
            };
            yield databaseproduct_1.default.promise().query('INSERT INTO carrito_caja SET ?', [Orden])
                .then((res1) => {
                res.json({ text: 'Orden guardada' });
            })
                .catch(err => {
                console.error('Error al guardar la orden:', err);
                res.status(500).json({ error: 'Error al guardar la orden' });
            });
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro');
            const userId = decodedToken.id;
            const adminId = decodedToken.adminId;
            const query = 'SELECT * FROM carrito_caja WHERE userId = ? AND adminId = ?';
            const bebidas = yield databaseproduct_1.default.promise().query(query, [userId, adminId])
                .then(bebidas => bebidas[0])
                .catch(err => console.log(err));
            res.json(bebidas);
        });
    }
    viewOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro');
            const userId = decodedToken.id;
            const id = req.params.id;
            const adminId = decodedToken.adminId;
            const query = 'SELECT * FROM carrito_caja WHERE id = ? AND userId = ? AND adminId = ?';
            const bebidas = yield databaseproduct_1.default.promise().query(query, [id, userId, adminId])
                .then(bebidas => bebidas[0])
                .catch(err => console.log(err));
            res.json(bebidas);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro');
            const userId = decodedToken.id;
            const productId = req.params.id;
            const adminId = decodedToken.adminId;
            const query = 'DELETE FROM carrito_caja WHERE id = ? AND userId = ? AND adminId = ?';
            const bebidas = yield databaseproduct_1.default.promise().query(query, [productId, userId, adminId])
                .then(() => {
                res.json({ text: 'Orden Elinada' });
            })
                .catch(err => {
                console.error('Error al elimanr la orden', err);
                res.status(200).json({ error: 'Error al eliminar la orden' });
            });
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro');
            const userId = decodedToken.id;
            const adminId = decodedToken.adminId;
            const query = 'DELETE FROM carrito_caja WHERE userId = ? AND adminId = ?';
            const bebidas = yield databaseproduct_1.default.promise().query(query, [userId, adminId])
                .then(() => {
                res.json({ text: 'Carrito vacio' });
            })
                .catch(err => {
                console.error('Error al vaciar el carrito', err);
                res.status(200).json({ error: 'Error al vaciar el carrito' });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro');
            const userId = decodedToken.id;
            const ordenId = req.params.id;
            const adminId = decodedToken.adminId;
            const { orden } = req.body;
            const orden1 = JSON.stringify(orden);
            const Orden = {
                orden: orden1,
                nombre: req.body.nombre,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                total: req.body.total
            };
            yield databaseproduct_1.default.promise().query('UPDATE carrito_caja SET ? WHERE id = ? AND userId = ? AND adminId = ?', [Orden, ordenId, userId, adminId])
                .then(() => {
                res.json({ text: 'Orden actualizada' });
            })
                .catch(err => {
                console.error('Error al actualizar la orden:', err);
                res.status(500).json({ error: 'Error al actualizae la orden' });
            });
        });
    }
    getFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const query = 'SELECT * FROM factura_caja WHERE id = ?';
            const ventas = yield databaseproduct_1.default.promise().query(query, [id])
                .then(ventas => ventas[0])
                .catch(err => console.log(err));
            res.json(ventas);
        });
    }
}
exports.carritoController = new CarritoController();
