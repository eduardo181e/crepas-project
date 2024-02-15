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
class CrepaSaladaAderesoBaseController {
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
                    const query = 'SELECT * FROM csab WHERE adminId = ?';
                    const aderesos = yield database_1.default.promise().query(query, [adminId])
                        .then(aderesos => aderesos[0])
                        .catch(err => console.log(err));
                    res.json(aderesos);
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
                    const aderesoId = req.params.id; // ID del juego solicitado
                    const query = 'SELECT * FROM csab WHERE id = ? AND adminId = ?';
                    const aderesos = yield database_1.default.promise().query(query, [aderesoId, adminId])
                        .then(aderesos => aderesos[0])
                        .catch(err => console.log(err));
                    if (aderesos.length > 0) {
                        res.json(aderesos);
                    }
                    else {
                        res.status(404).json({ text: "El adereso no existe" });
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
                    var aderesoId;
                    const adereso = req.body.adereso_base;
                    yield database_1.default.promise().query('INSERT INTO csab SET ?', { adereso_base: adereso.trim(), inventario: req.body.inventario, adminId: adminId })
                        .then((result) => {
                        aderesoId = result[0].insertId;
                        res.json({ text: 'adereso guardado' });
                    })
                        .catch(err => {
                        console.error('Error al guardar el adereso:', err);
                        res.status(500).json({ error: 'Error al guardar el adereso' });
                    });
                    // Guardar registro de existencias y ventas
                    yield databaseuser_1.default.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
                        .then((sucursales) => __awaiter(this, void 0, void 0, function* () {
                        sucursales[0].forEach((sucursal) => __awaiter(this, void 0, void 0, function* () {
                            const registro = {
                                sucursal_id: sucursal.id,
                                product_id: aderesoId,
                                adereso_base: adereso.trim(),
                                cantidad: req.body.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO csabe SET ?', [registro])
                                .then(() => {
                                console.log('registro de existencias guardado');
                            })
                                .catch(err => {
                                console.error(err);
                            });
                        }));
                    }));
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
                    const aderesoId = req.params.id; // ID del juego a eliminar
                    const query = 'DELETE FROM csab WHERE id = ? AND adminId = ?';
                    yield database_1.default.promise().query(query, [aderesoId, adminId])
                        .then(() => {
                        res.json({ text: 'adereso eliminado' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar el adereso:', err);
                        res.status(500).json({ error: 'Error al eliminar el adereso' });
                    });
                    // Eliminar registro de existencias y ventas
                    yield database_1.default.promise().query('DELETE FROM csabe WHERE product_id = ? AND adminId = ?', [aderesoId, adminId])
                        .then(() => {
                        console.log('registro de existencias eliminado');
                    })
                        .catch(err => {
                        console.error(err);
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
                    const aderesoId = req.params.id; // ID del juego a actualizar
                    const query = 'SELECT * FROM csab WHERE id = ? AND adminId = ?';
                    const aderesos = yield database_1.default.promise().query(query, [aderesoId, adminId])
                        .then(aderesos => aderesos[0])
                        .catch(err => console.log(err));
                    if (aderesos[0].inventario === parseInt(inventario)) {
                        const query = 'UPDATE csab SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [{ adereso_base: req.body.adereso_base.trim() }, aderesoId, adminId])
                            .then(() => {
                            res.json({ message: 'adereso actualizado' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar el adereso:', err);
                            res.status(500).json({ error: 'Error al actualizar el adereso' });
                        });
                        // Actualizar registro de existencias y ventas
                        yield database_1.default.promise().query('UPDATE csabe SET ? WHERE product_id = ? AND adminId = ?', [{ adereso_base: req.body.adereso_base.trim() }, aderesoId, adminId])
                            .then(() => {
                            console.log('registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.error(err);
                        });
                    }
                    else {
                        const query = 'UPDATE csab SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [{ adereso_base: req.body.adereso_base.trim(), inventario: parseInt(inventario) }, aderesoId, adminId])
                            .then(() => {
                            res.json({ message: 'adereso actualizado' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar el adereso:', err);
                            res.status(500).json({ error: 'Error al actualizar el adereso' });
                        });
                        // Actualizar registro de existencias y ventas
                        yield database_1.default.promise().query('UPDATE csabe SET ? WHERE product_id = ? AND adminId = ?', [{ adereso_base: req.body.adereso_base.trim(), cantidad: parseInt(inventario), inventario: 0, existencia: 0 }, aderesoId, adminId])
                            .then(() => {
                            console.log('registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.error(err);
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
const crepaSaladaABController = new CrepaSaladaAderesoBaseController();
exports.default = crepaSaladaABController;
