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
const databaseuser_1 = __importDefault(require("../../../databaseuser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../../models/models");
class WaflesIngredienteUntableController {
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
                    const query = 'SELECT * FROM wiu';
                    const ingredientes = yield database_1.default.promise().query(query)
                        .then(ingredientes => ingredientes[0])
                        .catch(err => console.log(err));
                    res.json(ingredientes);
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
                    const ingredienteId = req.params.id; // ID del juego solicitado
                    const query = 'SELECT * FROM wiu WHERE id = ?';
                    const ingredientes = yield database_1.default.promise().query(query, [ingredienteId])
                        .then(ingredientes => ingredientes[0])
                        .catch(err => console.log(err));
                    if (ingredientes.length > 0) {
                        res.json(ingredientes);
                    }
                    else {
                        res.status(404).json({ text: "El ingrediente no existe" });
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
                    var ingredienteId;
                    const ingrediente = req.body.ingrediente_unt;
                    yield database_1.default.promise().query('INSERT INTO wiu SET ?', { ingrediente_unt: ingrediente })
                        .then((result) => {
                        ingredienteId = result[0].insertId;
                        res.json({ text: 'Ingrediente guardado' });
                    })
                        .catch(err => {
                        console.error('Error al guardar el ingrediente:', err);
                        res.status(500).json({ error: 'Error al guardar el ingrediente' });
                    });
                    // Crear registros de existencias y ventas
                    yield databaseuser_1.default.promise().query('SELECT * FROM sucursales')
                        .then((sucursales) => {
                        sucursales[0].forEach((sucursal) => __awaiter(this, void 0, void 0, function* () {
                            const registro = {
                                sucursal_id: sucursal.id,
                                product_id: ingredienteId,
                                ingrediente_unt: ingrediente
                            };
                            yield database_1.default.promise().query('INSERT INTO wiue SET ?', [registro])
                                .then(() => {
                                console.log('registro de existencias guardado');
                            })
                                .catch((err) => {
                                console.error('Error al guardar el registro de existencias:', err);
                            });
                            yield database_1.default.promise().query('INSERT INTO wiuv SET ?', [registro])
                                .then(() => {
                                console.log('registro de ventas guardado');
                            })
                                .catch((err) => {
                                console.error('Error al guardar el registro de ventas:', err);
                            });
                        }));
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
                    const ingredienteId = req.params.id; // ID del juego a eliminar
                    const query = 'DELETE FROM wiu WHERE id = ?';
                    yield database_1.default.promise().query(query, [ingredienteId])
                        .then(() => {
                        res.json({ text: 'Ingrediente eliminado' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar el ingrediente:', err);
                        res.status(500).json({ error: 'Error al eliminar el ingrediente' });
                    });
                    // Eliminar registros de existencias y ventas
                    yield database_1.default.promise().query('DELETE FROM wiue WHERE product_id = ?', [ingredienteId])
                        .then(() => {
                        console.log('registro de existencias eliminado');
                    })
                        .catch(err => {
                        console.error('Error al eliminar el registro de existencias:', err);
                    });
                    yield database_1.default.promise().query('DELETE FROM wiuv WHERE product_id = ?', [ingredienteId])
                        .then(() => {
                        console.log('registro de ventas eliminado');
                    })
                        .catch(err => {
                        console.error('Error al eliminar el registro de ventas:', err);
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
                    const ingredienteId = req.params.id; // ID del juego a actualizar
                    const query = 'UPDATE wiu SET ? WHERE id = ?';
                    yield database_1.default.promise().query(query, [{ ingrediente_unt: req.body.ingrediente_unt }, ingredienteId])
                        .then(() => {
                        res.json({ message: 'Ingrediente actualizado' });
                    })
                        .catch(err => {
                        console.error('Error al actualizar el ingrediente:', err);
                        res.status(500).json({ error: 'Error al actualizar el ingrediente' });
                    });
                    // Actualizar registros de existencias y ventas
                    yield database_1.default.promise().query('UPDATE wiue SET ? WHERE product_id = ?', [{ ingrediente_unt: req.body.ingrediente_unt }, ingredienteId])
                        .then(() => {
                        console.log('registro de existencias actualizado');
                    })
                        .catch(err => {
                        console.error('Error al actualizar el registro de existencias:', err);
                    });
                    yield database_1.default.promise().query('UPDATE wiuv SET ? WHERE product_id = ?', [{ ingrediente_unt: req.body.ingrediente_unt }, ingredienteId])
                        .then(() => {
                        console.log('registro de ventas actualizado');
                    })
                        .catch(err => {
                        console.error('Error al actualizar el registro de ventas:', err);
                    });
                }
                else {
                    res.status(200).json({ message: 'Unauthorized' });
                }
            }
        });
    }
}
const waflesIUController = new WaflesIngredienteUntableController();
exports.default = waflesIUController;
