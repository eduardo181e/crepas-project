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
class BebidasFriasController {
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
                    const query = 'SELECT * FROM bf WHERE adminId = ?';
                    const bebidas = yield database_1.default.promise().query(query, [adminId])
                        .then(bebidas => bebidas[0])
                        .catch(err => console.log(err));
                    res.json(bebidas);
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
                    const bebidaId = req.params.id; // ID del juego solicitado
                    const query = 'SELECT * FROM bf WHERE id = ? AND adminId = ?';
                    const bebidas = yield database_1.default.promise().query(query, [bebidaId, adminId])
                        .then(bebidas => bebidas[0])
                        .catch(err => console.log(err));
                    if (bebidas.length > 0) {
                        res.json(bebidas);
                    }
                    else {
                        res.status(404).json({ text: "la bebida no existe" });
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
                    var bebidaId;
                    const bebida = {
                        bebida: req.body.bebida.trim(),
                        descripcion: req.body.descripcion.trim(),
                        precio: req.body.precio,
                        inventario: req.body.inventario,
                        adminId: adminId
                    };
                    yield database_1.default.promise().query('INSERT INTO bf SET ?', [bebida])
                        .then((result) => {
                        bebidaId = result[0].insertId;
                        res.json({ text: 'Bebida guardada' });
                    })
                        .catch(err => {
                        console.error('Error al guardar la bebida:', err);
                        res.status(500).json({ error: 'Error al guardar la bebida' });
                    });
                    // Crear registros de ventas y existencias
                    yield databaseuser_1.default.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
                        .then((sucursales) => {
                        sucursales[0].forEach((sucursal) => __awaiter(this, void 0, void 0, function* () {
                            const registro = {
                                product_id: bebidaId,
                                sucursal_id: sucursal.id,
                                bebida: bebida.bebida,
                                descripcion: bebida.descripcion,
                                cantidad: bebida.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO bfe SET ?', [registro])
                                .then(() => {
                                console.log('Registro de existencias creado');
                            })
                                .catch(err => {
                                console.error('Error al crear el registro:', err);
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
                    const bebidaId = req.params.id; // ID del juego a eliminar
                    const query = 'DELETE FROM bf WHERE id = ? AND adminId = ?';
                    yield database_1.default.promise().query(query, [bebidaId, adminId])
                        .then(() => {
                        res.json({ text: 'Bebida eliminada' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar la bebida:', err);
                        res.status(500).json({ error: 'Error al eliminar la bebida' });
                    });
                    // Eliminar registro de ventas y existencias
                    yield database_1.default.promise().query('DELETE FROM bfe WHERE product_id = ? AND adminId = ?', [bebidaId, adminId])
                        .then(() => {
                        console.log('Registro de existencias eliminado');
                    })
                        .catch(err => {
                        console.error('Error al eliminar el registro:', err);
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
                    const bebidaId = req.params.id; // ID del juego a actualizar
                    const bebida = {
                        bebida: req.body.bebida.trim(),
                        descripcion: req.body.descripcion.trim(),
                        precio: req.body.precio,
                        inventario: req.body.inventario
                    };
                    const query1 = 'SELECT * FROM bf WHERE id = ? AND adminId = ?';
                    const bebidas = yield database_1.default.promise().query(query1, [bebidaId, adminId])
                        .then(bebidas => bebidas[0])
                        .catch(err => console.log(err));
                    delete bebidas[0].id;
                    if (parseInt(bebida.inventario) === bebidas[0].inventario) {
                        const query = 'UPDATE bf SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [bebida, bebidaId, adminId])
                            .then(() => {
                            res.json({ message: 'Bebida actualizada' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar la bebida:', err);
                            res.status(500).json({ error: 'Error al actualizar la bebida' });
                        });
                        // Actualizar registros de ventas y existencias
                        yield database_1.default.promise().query('UPDATE bfe SET ? WHERE product_id = ? AND adminId = ?', [{ bebida: bebida.bebida, descripcion: bebida.descripcion }, bebidaId, adminId])
                            .then(() => {
                            console.log('Registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.error('Error al actualizar el registro:', err);
                        });
                    }
                    else {
                        const bebidax = {
                            cantidad: bebida.inventario,
                            inventario: 0,
                            existencia: 0
                        };
                        const query = 'UPDATE bf SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [bebida, bebidaId, adminId])
                            .then(() => {
                            res.json({ message: 'Bebida actualizada' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar la bebida:', err);
                            res.status(500).json({ error: 'Error al actualizar la bebida' });
                        });
                        // Actualizar registros de ventas y existencias
                        yield database_1.default.promise().query('UPDATE bfe SET ? WHERE product_id = ? AND adminId = ?', [{ bebida: bebida.bebida, descripcion: bebida.descripcion, cantidad: bebidax.cantidad, existencia: bebidax.existencia, inventario: bebidax.inventario }, bebidaId, adminId])
                            .then(() => {
                            console.log('Registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.error('Error al actualizar el registro:', err);
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
const bebidasFriasController = new BebidasFriasController();
exports.default = bebidasFriasController;
