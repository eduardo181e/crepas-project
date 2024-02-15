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
class WaflesCanastaIngredienteComplementarioController {
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
                    const query = 'SELECT * FROM wcic WHERE adminId = ?';
                    const ingredientes = yield database_1.default.promise().query(query, [adminId])
                        .then(ingredientes => ingredientes[0])
                        .catch(err => console.log(err));
                    res.json(ingredientes);
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
                    const ingredienteId = req.params.id; // ID del juego solicitado
                    const query = 'SELECT * FROM wcic WHERE id = ? AND adminId = ?';
                    const ingredientes = yield database_1.default.promise().query(query, [ingredienteId, adminId])
                        .then(ingredientes => ingredientes[0])
                        .catch(err => console.log(err));
                    if (ingredientes.length > 0) {
                        res.json(ingredientes);
                    }
                    else {
                        res.status(404).json({ text: "El ingrediente no existe" });
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
                    var ingredienteId;
                    const ingrediente = req.body.ingrediente_com.trim();
                    const tipo = req.body.tipo;
                    yield database_1.default.promise().query('INSERT INTO wcic SET ?', { ingrediente_com: ingrediente, tipo: tipo, inventario: req.body.inventario, adminId: adminId })
                        .then((result) => {
                        console.log(result[0]);
                        ingredienteId = result[0].insertId;
                        res.json({ text: 'Ingrediente guardado' });
                    })
                        .catch(err => {
                        console.error('Error al guardar el ingrediente:', err);
                        res.status(500).json({ error: 'Error al guardar el ingrediente' });
                    });
                    // Crear ventas y existencias de ingredientes complementarios
                    yield databaseuser_1.default.promise().query('SELECT * FROM sucursales WHERE adminId = ?')
                        .then((sucursales) => {
                        sucursales[0].forEach((sucursal) => __awaiter(this, void 0, void 0, function* () {
                            const registro = {
                                sucursal_id: sucursal.id,
                                product_id: ingredienteId,
                                ingrediente_com: ingrediente,
                                cantidad: req.body.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO wcice SET ?', [registro])
                                .then(() => {
                                console.log('registro de existencias guardado');
                            })
                                .catch(err => {
                                console.error('Error al guardar el registro de existencias:', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al obtener las sucursales:', err);
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
                    const ingredienteId = req.params.id; // ID del juego a eliminar
                    const query = 'DELETE FROM wcic WHERE id = ? AND adminId = ?';
                    yield database_1.default.promise().query(query, [ingredienteId, adminId])
                        .then(() => {
                        res.json({ text: 'Ingrediente eliminado' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar el ingrediente:', err);
                        res.status(500).json({ error: 'Error al eliminar el ingrediente' });
                    });
                    yield database_1.default.promise().query('DELETE FROM wcice WHERE product_id = ? AND adminId = ?', [ingredienteId, adminId])
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
                    const ingredienteId = req.params.id; // ID del juego a actualizar
                    const ingrediente1 = { ingrediente_com: req.body.ingrediente_com.trim(), tipo: req.body.tipo, inventario: req.body.inventario };
                    const query1 = 'SELECT * FROM wcic WHERE id = ? AND adminId = ?';
                    const ingrediente = yield database_1.default.promise().query(query1, [ingredienteId, adminId])
                        .then(bebidas => bebidas[0])
                        .catch(err => console.log(err));
                    delete ingrediente[0].id;
                    if (parseInt(ingrediente1.inventario) === ingrediente[0].inventario) {
                        delete ingrediente1.inventario;
                        const query = 'UPDATE wcic SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [ingrediente1, ingredienteId, adminId])
                            .then(() => {
                            res.json({ message: 'Ingrediente actualizado' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar el ingrediente:', err);
                            res.status(500).json({ error: 'Error al actualizar el ingrediente' });
                        });
                        // Actualizar ventas y existencias de ingredientes complementarios
                        const registro = {
                            product_id: ingredienteId,
                            ingrediente_com: req.body.ingrediente_com.trim()
                        };
                        yield database_1.default.promise().query('UPDATE wcice SET ? WHERE product_id = ? AND adminId = ?', [registro, ingredienteId, adminId])
                            .then(() => {
                            console.log('registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.error('Error al actualizar el registro de existencias:', err);
                        });
                    }
                    else {
                        const query = 'UPDATE wcic SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [ingrediente1, ingredienteId, adminId])
                            .then(() => {
                            res.json({ message: 'Ingrediente actualizado' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar el ingrediente:', err);
                            res.status(500).json({ error: 'Error al actualizar el ingrediente' });
                        });
                        // Actualizar ventas y existencias de ingredientes complementarios
                        const registro = {
                            product_id: ingredienteId,
                            ingrediente_com: req.body.ingrediente_com.trim(),
                            cantidad: ingrediente1.inventario,
                            inventario: 0,
                            existencia: 0,
                            adminId: adminId
                        };
                        yield database_1.default.promise().query('UPDATE wcice SET ? WHERE product_id = ? AND adminId = ?', [registro, ingredienteId, adminId])
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
const waflesCanastaICController = new WaflesCanastaIngredienteComplementarioController();
exports.default = waflesCanastaICController;
