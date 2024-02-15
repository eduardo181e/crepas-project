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
const models_1 = require("../../../models/models");
class CrepaSaladaPreciosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(200).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                if (!decodedToken) {
                    res.status(401).json({ message: 'Invalid token' });
                }
                const fullname = decodedToken.fullname;
                if (fullname === models_1.admin) {
                    const query = 'SELECT * FROM csp';
                    const precios = yield database_1.default.promise().query(query)
                        .then(precios => precios[0])
                        .catch(err => console.log(err));
                    res.json(precios);
                }
                else {
                    res.status(200).json({ message: 'Unauthorized' });
                }
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(200).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                if (!decodedToken) {
                    res.status(401).json({ message: 'Invalid token' });
                }
                const fullname = decodedToken.fullname;
                if (fullname === models_1.admin) {
                    const precioId = req.params.id; // ID del juego solicitado
                    const query = 'SELECT * FROM csp WHERE id = ?';
                    const precios = yield database_1.default.promise().query(query, [precioId])
                        .then(precios => precios[0])
                        .catch(err => console.log(err));
                    if (precios.length > 0) {
                        res.json(precios);
                    }
                    else {
                        res.status(404).json({ text: "el precio no existe" });
                    }
                }
                else {
                    res.status(200).json({ message: 'Unauthorized' });
                }
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(200).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                if (!decodedToken) {
                    res.status(401).json({ message: 'Invalid token' });
                }
                const fullname = decodedToken.fullname;
                if (fullname === models_1.admin) {
                    const precio = {
                        descripcion: req.body.descripcion,
                        precio: req.body.precio
                    };
                    yield database_1.default.promise().query('INSERT INTO csp SET ?', [precio])
                        .then(() => {
                        res.json({ text: 'precio guardada' });
                    })
                        .catch(err => {
                        console.error('Error al guardar el precio:', err);
                        res.status(500).json({ error: 'Error al guardar el precio' });
                    });
                }
                else {
                    res.status(200).json({ message: 'Unauthorized' });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(200).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                if (!decodedToken) {
                    res.status(401).json({ message: 'Invalid token' });
                }
                const fullname = decodedToken.fullname;
                if (fullname === models_1.admin) {
                    const precioId = req.params.id; // ID del juego a eliminar
                    const query = 'DELETE FROM csp WHERE id = ?';
                    yield database_1.default.promise().query(query, [precioId])
                        .then(() => {
                        res.json({ text: 'precio eliminado' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar el precio:', err);
                        res.status(500).json({ error: 'Error al eliminar el precio' });
                    });
                }
                else {
                    res.status(200).json({ message: 'Unauthorized' });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(200).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                if (!decodedToken) {
                    res.status(401).json({ message: 'Invalid token' });
                }
                const fullname = decodedToken.fullname;
                if (fullname === models_1.admin) {
                    const precioId = req.params.id; // ID del juego a actualizar
                    const precio = {
                        descripcion: req.body.descripcion,
                        precio: req.body.precio
                    };
                    const query = 'UPDATE csp SET ? WHERE id = ?';
                    yield database_1.default.promise().query(query, [precio, precioId])
                        .then(() => {
                        res.json({ message: 'precio actualizado' });
                    })
                        .catch(err => {
                        console.error('Error al actualizar el precio:', err);
                        res.status(500).json({ error: 'Error al actualizar el precio' });
                    });
                }
                else {
                    res.status(200).json({ message: 'Unauthorized' });
                }
            }
        });
    }
}
const crepaSaladaPController = new CrepaSaladaPreciosController();
exports.default = crepaSaladaPController;
