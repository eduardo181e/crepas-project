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
class CrepaDulceHarinaController {
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
                    const query = 'SELECT * FROM cdth WHERE adminId = ?';
                    const harinas = yield database_1.default.promise().query(query, [adminId])
                        .then(harinas => harinas[0])
                        .catch(err => console.log(err));
                    res.json(harinas);
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
                    const harinaId = req.params.id;
                    const query = 'SELECT * FROM cdth WHERE id = ? AND adminId = ?';
                    const harinas = yield database_1.default.promise().query(query, [harinaId, adminId])
                        .then(harinas => harinas[0])
                        .catch(err => console.log(err));
                    if (harinas.length > 0) {
                        res.json(harinas);
                    }
                    else {
                        res.status(404).json({ text: "La harina no existe" });
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
                    var harinaId;
                    const harina = req.body.harina;
                    yield database_1.default.promise().query('INSERT INTO cdth SET ?', { harina: harina, inventario: req.body.inventario, adminId: adminId })
                        .then((result) => {
                        harinaId = result[0].insertId;
                        res.json({ text: 'harina guardada' });
                    })
                        .catch(err => {
                        console.error('Error al guardar la harina:', err);
                        res.status(500).json({ error: 'Error al guardar la harina' });
                    });
                    yield databaseuser_1.default.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
                        .then((sucursales) => {
                        sucursales[0].forEach((sucursal) => __awaiter(this, void 0, void 0, function* () {
                            const registro = {
                                sucursal_id: sucursal.id,
                                product_id: harinaId,
                                harina: harina,
                                cantidad: req.body.inventario,
                                adminId: adminId
                            };
                            console.log(registro);
                            yield database_1.default.promise().query('INSERT INTO cdthe SET ?', [registro])
                                .then(() => {
                                console.log('registro de existencias guardado');
                            })
                                .catch(err => {
                                console.log(err);
                            });
                        }));
                    })
                        .catch(err => { console.log(err); });
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
                    const harinaId = req.params.id; // ID de la harina a eliminar
                    const query = 'DELETE FROM cdth WHERE id = ? AND adminId = ?';
                    yield database_1.default.promise().query(query, [harinaId, adminId])
                        .then(() => {
                        res.json({ text: 'harina eliminada' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar la harina:', err);
                        res.status(500).json({ error: 'Error al eliminar la harina' });
                    });
                    // Eliminar harina ventas y existencias
                    yield database_1.default.promise().query('DELETE FROM cdthe WHERE product_id = ? AND adminId = ?', [harinaId, adminId])
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
                    const harinaId = req.params.id; // ID de la harina a actualizar
                    const query1 = 'SELECT * FROM cdth WHERE id = ? AND adminId = ?';
                    const ingrediente = yield database_1.default.promise().query(query1, [harinaId, adminId])
                        .then(bebidas => bebidas[0])
                        .catch(err => console.log(err));
                    if (parseInt(inventario) === ingrediente[0].inventario) {
                        const query = 'UPDATE cdth SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [{ harina: req.body.harina }, harinaId, adminId])
                            .then(() => {
                            res.json({ message: 'harina actualizada' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar la harina:', err);
                            res.status(500).json({ error: 'Error al actualizar la harina' });
                        });
                        // Update harina ventas y existencias
                        yield database_1.default.promise().query('UPDATE cdthe SET ? WHERE product_id = ? AND adminId = ?', [{ harina: req.body.harina }, harinaId, adminId])
                            .then(() => {
                            console.log('registro de existencias actualizado');
                        })
                            .catch(err => {
                            console.log(err);
                        });
                    }
                    else {
                        const query = 'UPDATE cdth SET ? WHERE id = ? AND adminId = ?';
                        yield database_1.default.promise().query(query, [{ harina: req.body.harina, inventario: parseInt(inventario) }, harinaId, adminId])
                            .then(() => {
                            res.json({ message: 'harina actualizada' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar la harina:', err);
                            res.status(500).json({ error: 'Error al actualizar la harina' });
                        });
                        // Update harina ventas y existencias
                        yield database_1.default.promise().query('UPDATE cdthe SET ? WHERE product_id = ? AND adminId = ?', [{ harina: req.body.harina, cantidad: parseInt(inventario), inventario: 0, existencia: 0 }, harinaId, adminId])
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
const crepaDulceHController = new CrepaDulceHarinaController();
exports.default = crepaDulceHController;
