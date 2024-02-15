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
class WaflesNieveController {
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
                    const query = 'SELECT * FROM wn';
                    const nieves = yield database_1.default.promise().query(query)
                        .then(nieves => nieves[0])
                        .catch(err => console.log(err));
                    res.json(nieves);
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
                    const nieveId = req.params.id;
                    const query = 'SELECT * FROM wn WHERE id = ?';
                    const nieves = yield database_1.default.promise().query(query, [nieveId])
                        .then(nieves => nieves[0])
                        .catch(err => console.log(err));
                    if (nieves.length > 0) {
                        res.json(nieves);
                    }
                    else {
                        res.status(404).json({ text: "La nieve no existe" });
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
                    var nieveId;
                    const nieve = req.body.nieve;
                    yield database_1.default.promise().query('INSERT INTO wn SET ?', { nieve: nieve })
                        .then((result) => {
                        nieveId = result[0].insertId;
                        res.json({ text: 'Nieve guardada' });
                    })
                        .catch(err => {
                        console.error('Error al guardar la nieve:', err);
                        res.status(500).json({ error: 'Error al guardar la nieve' });
                    });
                    // Crear registros de ventas y existencias
                    yield databaseuser_1.default.promise().query('SELECT * FROM sucursal')
                        .then((sucursales) => {
                        sucursales[0].forEach((sucursal) => __awaiter(this, void 0, void 0, function* () {
                            const registro = {
                                sucursal_id: sucursal.id,
                                product_id: nieveId,
                                nieve: nieve
                            };
                            console.log(registro);
                            yield database_1.default.promise().query('INSERT INTO wne SET ?', [registro])
                                .then(() => {
                                console.log('Registro de existencias guardado');
                            })
                                .catch(err => {
                                console.error('Error al guardar el registro:', err);
                            });
                            yield database_1.default.promise().query('INSERT INTO wnv SET ?', [registro])
                                .then(() => {
                                console.log('Registro de ventas guardado');
                            })
                                .catch(err => {
                                console.error('Error al guardar el registro:', err);
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
                    const nieveId = req.params.id;
                    const query = 'DELETE FROM wn WHERE id = ?';
                    yield database_1.default.promise().query(query, [nieveId])
                        .then(() => {
                        res.json({ text: 'Nieve eliminada' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar la nieve:', err);
                        res.status(500).json({ error: 'Error al eliminar la nieve' });
                    });
                    // Eliminar registros de ventas y existencias
                    yield database_1.default.promise().query('DELETE FROM wne WHERE product_id = ?', [nieveId])
                        .then(() => {
                        console.log('Registro de existencias eliminado');
                    })
                        .catch(err => {
                        console.error('Error al eliminar el registro de existencias:', err);
                    });
                    yield database_1.default.promise().query('DELETE FROM wnv WHERE product_id = ?', [nieveId])
                        .then(() => {
                        console.log('Registro de ventas eliminado');
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
                    const nieveId = req.params.id;
                    const query = 'UPDATE wn SET ? WHERE id = ?';
                    yield database_1.default.promise().query(query, [{ nieve: req.body.nieve }, nieveId])
                        .then(() => {
                        res.json({ message: 'Nieve actualizada' });
                    })
                        .catch(err => {
                        console.error('Error al actualizar la nieve:', err);
                        res.status(500).json({ error: 'Error al actualizar la nieve' });
                    });
                    // Actualizar registros de ventas y existencias
                    yield database_1.default.promise().query('UPDATE wne SET ? WHERE product_id = ?', [{ nieve: req.body.nieve }, nieveId])
                        .then(() => {
                        console.log('Registro de existencias actualizado');
                    })
                        .catch(err => {
                        console.error('Error al actualizar el registro de existencias:', err);
                    });
                    yield database_1.default.promise().query('UPDATE wnv SET ? WHERE product_id = ?', [{ nieve: req.body.nieve }, nieveId])
                        .then(() => {
                        console.log('Registro de ventas actualizado');
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
const waflesNController = new WaflesNieveController();
exports.default = waflesNController;
