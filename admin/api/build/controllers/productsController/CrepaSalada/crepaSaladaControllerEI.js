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
class CrepaSaladaEnsaladaIndividualController {
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
                    const query = 'SELECT * FROM csei WHERE adminId = ?';
                    const ensaladas = yield database_1.default.promise().query(query, [adminId])
                        .then(ensaladas => ensaladas[0])
                        .catch(err => console.log(err));
                    res.json(ensaladas);
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
                    const ensaladaId = req.params.id; // ID del juego solicitado
                    const query = 'SELECT * FROM csei WHERE id = ? AND adminId = ?';
                    const ensaladas = yield database_1.default.promise().query(query, [ensaladaId, adminId])
                        .then(ensaladas => ensaladas[0])
                        .catch(err => console.log(err));
                    if (ensaladas.length > 0) {
                        res.json(ensaladas);
                    }
                    else {
                        res.status(404).json({ text: "La ensalada no existe" });
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
                    var ensaladaId;
                    const Ensalada = {
                        ensalada_ind: req.body.ensalada_ind.trim(),
                        descripcion: req.body.descripcion.trim(),
                        inventario: req.body.inventario,
                        adminId: adminId
                    };
                    yield database_1.default.promise().query('INSERT INTO csei SET ?', [Ensalada])
                        .then((result) => {
                        ensaladaId = result[0].insertId;
                        res.json({ text: 'ensalada guardada' });
                    })
                        .catch(err => {
                        console.error('Error al guardar la ensalada:', err);
                        res.status(500).json({ error: 'Error al guardar la ensalada' });
                    });
                    // Crear registro de ventas y existencias
                    yield databaseuser_1.default.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
                        .then((sucursales) => {
                        sucursales[0].forEach((sucursal) => __awaiter(this, void 0, void 0, function* () {
                            const registro = {
                                sucursal_id: sucursal.id,
                                product_id: ensaladaId,
                                ensalada_ind: Ensalada.ensalada_ind,
                                descripcion: Ensalada.descripcion,
                                cantidad: Ensalada.inventario,
                                adminId: adminId
                            };
                            console.log(registro);
                            yield database_1.default.promise().query('INSERT INTO cseie SET ?', [registro])
                                .then(() => {
                                console.log('registro de existencias guardado');
                            })
                                .catch(err => {
                                console.error('Error al guardar el registro de existencias:', err);
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
                    const ensaladaId = req.params.id; // ID del juego a eliminar
                    const query = 'DELETE FROM csei WHERE id = ? AND adminId = ?';
                    yield database_1.default.promise().query(query, [ensaladaId, adminId])
                        .then(() => {
                        res.json({ text: 'ensalada eliminada' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar la ensalada:', err);
                        res.status(500).json({ error: 'Error al eliminar la ensalada' });
                    });
                    // Eliminar registro de existencias y ventas
                    yield database_1.default.promise().query('DELETE FROM cseie WHERE product_id = ? AND adminId = ?', [ensaladaId, adminId])
                        .then(() => {
                        console.log('registro de existencias eliminado');
                    })
                        .catch(err => {
                        console.error('Error al eliminar el registro de existencias:', err);
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
                    const ensaladaId = req.params.id; // ID del juego a actualizar
                    const Ensalada = {
                        ensalada_ind: req.body.ensalada_ind.trim(),
                        descripcion: req.body.descripcion.trim(),
                        inventario: inventario
                    };
                    const query = 'SELECT * FROM csei WHERE id = ? AND adminId = ?';
                    const ensalada = yield database_1.default.promise().query(query, [ensaladaId, adminId])
                        .then(ensalada => ensalada[0])
                        .catch(err => console.log(err));
                    if (parseInt(inventario) === ensalada[0].inventario) {
                        delete Ensalada.inventario;
                        const query = 'UPDATE csei SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [Ensalada, ensaladaId, adminId])
                            .then(() => {
                            res.json({ message: 'ensalada actualizada' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar la ensalada:', err);
                            res.status(500).json({ error: 'Error al actualizar la ensalada' });
                        });
                        delete Ensalada.inventario;
                        // Actualizar registro de existencias y ventas
                        yield database_1.default.promise().query('UPDATE cseie SET ? WHERE product_id = ? AND adminId = ?', [Ensalada, ensaladaId, adminId])
                            .then(() => {
                            console.log('registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.error('Error al actualizar el registro de existencias:', err);
                        });
                    }
                    else {
                        const query = 'UPDATE csei SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [Ensalada, ensaladaId, adminId])
                            .then(() => {
                            res.json({ message: 'ensalada actualizada' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar la ensalada:', err);
                            res.status(500).json({ error: 'Error al actualizar la ensalada' });
                        });
                        delete Ensalada.inventario;
                        Ensalada.cantidad = parseInt(inventario);
                        Ensalada.inventario = 0;
                        Ensalada.existencia = 0;
                        // Actualizar registro de existencias y ventas
                        yield database_1.default.promise().query('UPDATE cseie SET ? WHERE product_id = ? AND adminId = ?', [Ensalada, ensaladaId, adminId])
                            .then(() => {
                            console.log('registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.error('Error al actualizar el registro de existencias:', err);
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
const crepaSaladaEIController = new CrepaSaladaEnsaladaIndividualController();
exports.default = crepaSaladaEIController;
