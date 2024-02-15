"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
class WaflesCanastaNieveController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(405).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                try {
                    const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                    if (!decodedToken) {
                        res.status(401).json({ message: 'Invalid token' });
                    }
                    const adminId = decodedToken.id;
                    const query = 'SELECT * FROM wcn WHERE adminId = ?';
                    const nieves = yield database_1.default.promise().query(query, [adminId])
                        .then(nieves => nieves[0])
                        .catch(err => console.log(err));
                    res.json(nieves);
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                        res.status(401).json({ message: 'Token expired' });
                    }
                    else {
                        res.status(401).json({ message: 'Unknown Error' });
                    }
                }
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(405).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                try {
                    const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                    if (!decodedToken) {
                        res.status(401).json({ message: 'Invalid token' });
                    }
                    const adminId = decodedToken.id;
                    const nieveId = req.params.id;
                    const query = 'SELECT * FROM wcn WHERE id = ? AND adminId = ?';
                    const nieves = yield database_1.default.promise().query(query, [nieveId, adminId])
                        .then(nieves => nieves[0])
                        .catch(err => console.log(err));
                    if (nieves.length > 0) {
                        res.json(nieves);
                    }
                    else {
                        res.status(404).json({ text: "La nieve no existe" });
                    }
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                        res.status(401).json({ message: 'Token expired' });
                    }
                    else {
                        res.status(401).json({ message: 'Unknown Error' });
                    }
                }
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(405).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                try {
                    const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                    if (!decodedToken) {
                        res.status(401).json({ message: 'Invalid token' });
                    }
                    const adminId = decodedToken.id;
                    var nieveId;
                    const nieve = req.body.nieve;
                    yield database_1.default.promise().query('INSERT INTO wcn SET ?', { nieve: nieve, inventario: req.body.inventario, adminId: adminId })
                        .then((result) => {
                        nieveId = result[0].insertId;
                        res.json({ text: 'nieve guardada' });
                    })
                        .catch(err => {
                        console.error('Error al guardar la nieve:', err);
                        res.status(500).json({ error: 'Error al guardar la nieve' });
                    });
                    // Guardar registros de venas y existencias de nieves
                    yield databaseuser_1.default.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
                        .then((sucursales) => {
                        sucursales[0].forEach((sucursal) => __awaiter(this, void 0, void 0, function* () {
                            const registro = {
                                sucursal_id: sucursal.id,
                                product_id: nieveId,
                                nieve: nieve,
                                cantidad: req.body.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO wcne SET ?', [registro])
                                .then(() => {
                                console.log('registro de existencias guardado');
                            })
                                .catch(err => {
                                console.log(err);
                            });
                        }));
                    });
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                        res.status(401).json({ message: 'Token expired' });
                    }
                    else {
                        res.status(401).json({ message: 'Unknown Error' });
                    }
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(405).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                try {
                    const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                    if (!decodedToken) {
                        res.status(401).json({ message: 'Invalid token' });
                    }
                    const adminId = decodedToken.id;
                    const nieveId = req.params.id;
                    const query = 'DELETE FROM wcn WHERE id = ? AND adminId = ?';
                    yield database_1.default.promise().query(query, [nieveId, adminId])
                        .then(() => {
                        res.json({ text: 'nieve eliminada' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar la nieve:', err);
                        res.status(500).json({ error: 'Error al eliminar la nieve' });
                    });
                    // Eliminar registros de venas y existencias de nieves
                    yield database_1.default.promise().query('DELETE FROM wcne WHERE product_id = ? AND adminId', [nieveId, adminId])
                        .then(() => {
                        console.log('registro de existencias eliminado');
                    })
                        .catch(err => {
                        console.log(err);
                    });
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                        res.status(401).json({ message: 'Token expired' });
                    }
                    else {
                        res.status(401).json({ message: 'Unknown Error' });
                    }
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(405).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                try {
                    const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                    if (!decodedToken) {
                        res.status(401).json({ message: 'Invalid token' });
                    }
                    const adminId = decodedToken.id;
                    const inventario = req.body.inventario;
                    const nieveId = req.params.id;
                    const query = 'SELECT * FROM wcn WHERE id = ? AND adminId = ?';
                    const nieves = yield database_1.default.promise().query(query, [nieveId, adminId])
                        .then(nieves => nieves[0])
                        .catch(err => console.log(err));
                    if (nieves[0].inventario === parseInt(inventario)) {
                        const query = 'UPDATE wcn SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [{ nieve: req.body.nieve }, nieveId, adminId])
                            .then(() => {
                            res.json({ message: 'nieve actualizada' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar la nieve:', err);
                            res.status(500).json({ error: 'Error al actualizar la nieve' });
                        });
                        // Actualizar registros de venas y existencias de nieves
                        yield database_1.default.promise().query('UPDATE wcne SET ? WHERE product_id = ? AND adminId = ?', [{ nieve: req.body.nieve }, nieveId, adminId])
                            .then(() => {
                            console.log('registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.log(err);
                        });
                    }
                    else {
                        const query = 'UPDATE wcn SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [{ nieve: req.body.nieve, inventario: inventario }, nieveId, adminId])
                            .then(() => {
                            res.json({ message: 'nieve actualizada' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar la nieve:', err);
                            res.status(500).json({ error: 'Error al actualizar la nieve' });
                        });
                        // Actualizar registros de venas y existencias de nieves
                        yield database_1.default.promise().query('UPDATE wcne SET ? WHERE product_id = ? AND adminId = ?', [{ nieve: req.body.nieve, cantidad: inventario, inventario: 0, existencia: 0 }, nieveId, adminId])
                            .then(() => {
                            console.log('registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.log(err);
                        });
                    }
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                        res.status(401).json({ message: 'Token expired' });
                    }
                    else {
                        res.status(401).json({ message: 'Unknown Error' });
                    }
                }
            }
        });
    }
}
const waflesCanastaNController = new WaflesCanastaNieveController();
exports.default = waflesCanastaNController;
