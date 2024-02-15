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
const helpers_1 = __importDefault(require("../lib/helpers"));
const databaseuser_1 = __importDefault(require("../databaseuser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CajaController {
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
                const adminId = decodedToken.id;
                const query = 'SELECT * FROM caja_usuarios WHERE adminId = ?';
                const bebidas = yield databaseuser_1.default.promise().query(query, [adminId])
                    .then(bebidas => bebidas[0])
                    .catch(err => console.log(err));
                res.json(bebidas);
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
                const adminId = decodedToken.id;
                const userId = req.params.id; // ID del juego solicitado
                const query = 'SELECT * FROM caja_usuarios WHERE id = ? AND adminId = ?';
                const user = yield databaseuser_1.default.promise().query(query, [userId, adminId])
                    .then(user => user[0])
                    .catch(err => console.log(err));
                if (user.length > 0) {
                    res.json(user);
                }
                else {
                    res.status(404).json({ text: "el usuario no existe" });
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
                const adminId = decodedToken.id;
                var { password } = req.body;
                password = password.trim();
                const NewUserCaja = {
                    username: req.body.username.trim(),
                    password,
                    fullname: req.body.fullname.trim(),
                    numero_caja: req.body.numero_caja,
                    sucursal_id: req.body.sucursal_id,
                    adminId: adminId
                };
                const existingUser = yield databaseuser_1.default.promise().query('SELECT * FROM caja_usuarios WHERE username = ?', [NewUserCaja.username])
                    .then(rows => rows)
                    .catch(err => console.log(err));
                if (existingUser[0][0]) {
                    console.log(existingUser[0][0]);
                    res.status(500).json({ text: "El nombre de usuario ya existe, por favor elija otro" });
                }
                else {
                    NewUserCaja.password = yield helpers_1.default.encryptPassword(password);
                    yield databaseuser_1.default.promise().query('INSERT INTO caja_usuarios SET ?', [NewUserCaja])
                        .then(() => {
                        res.json({ text: "Usuarios Guardado" });
                    })
                        .catch(err => {
                        console.log("Error al guardar el usuario: ", err);
                        res.status(500).json({ text: "Error al guardar el usuario" });
                    });
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
                const adminId = decodedToken.id;
                const userId = req.params.id;
                var { password } = req.body;
                password = password.trim();
                const NewUserCaja = {
                    username: req.body.username.trim(),
                    password,
                    fullname: req.body.fullname.trim(),
                    numero_caja: req.body.numero_caja,
                    sucursal_id: req.body.sucursal_id
                };
                const existingUser1 = yield databaseuser_1.default.promise().query('SELECT * FROM caja_usuarios WHERE username = ?', [NewUserCaja.username])
                    .then(rows => rows)
                    .catch(err => console.log(err));
                const existingUser = yield databaseuser_1.default.promise().query('SELECT * FROM caja_usuarios WHERE id = ? AND adminId = ?', [userId, adminId])
                    .then(rows => rows)
                    .catch(err => console.log(err));
                console.log(existingUser);
                if (!existingUser1[0][0]) {
                    if (existingUser[0][0].password !== password) {
                        NewUserCaja.password = yield helpers_1.default.encryptPassword(password);
                        const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                        yield databaseuser_1.default.promise().query(query, [NewUserCaja, userId, adminId])
                            .then(() => {
                            res.json({ message: 'Usuario actualizado' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar el usuario:', err);
                            res.status(500).json({ error: 'Error al actualizar el usuario' });
                        });
                    }
                    else {
                        const NewUserCaja1 = {
                            username: req.body.username.trim(),
                            fullname: req.body.fullname.trim(),
                            numero_caja: req.body.numero_caja,
                            sucursal_id: req.body.sucursal_id
                        };
                        const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                        yield databaseuser_1.default.promise().query(query, [NewUserCaja1, userId, adminId])
                            .then(() => {
                            res.json({ message: 'Usuario actualizado' });
                        })
                            .catch(err => {
                            console.error('Error al actualizar el usuario:', err);
                            res.status(500).json({ error: 'Error al actualizar el usuario' });
                        });
                    }
                }
                else {
                    if (existingUser[0][0].username === NewUserCaja.username) {
                        if (existingUser[0][0].password !== password) {
                            NewUserCaja.password = yield helpers_1.default.encryptPassword(password);
                            const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                            yield databaseuser_1.default.promise().query(query, [NewUserCaja, userId, adminId])
                                .then(() => {
                                res.json({ message: 'Usuario actualizado' });
                            })
                                .catch(err => {
                                console.error('Error al actualizar el usuario:', err);
                                res.status(500).json({ error: 'Error al actualizar el usuario' });
                            });
                        }
                        else {
                            const NewUserCaja1 = {
                                username: req.body.username.trim(),
                                fullname: req.body.fullname.trim(),
                                numero_caja: req.body.numero_caja,
                                sucursal_id: req.body.sucursal_id
                            };
                            const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                            yield databaseuser_1.default.promise().query(query, [NewUserCaja1, userId, adminId])
                                .then(() => {
                                res.json({ message: 'Usuario actualizado' });
                            })
                                .catch(err => {
                                console.error('Error al actualizar el usuario:', err);
                                res.status(500).json({ error: 'Error al actualizar el usuario' });
                            });
                        }
                    }
                    else {
                        if (existingUser1[0][0]) {
                            res.status(500).json({ text: "El nombre de usuario ya existe, por favor elija otro" });
                        }
                        else {
                            if (existingUser[0][0].password !== password) {
                                NewUserCaja.password = yield helpers_1.default.encryptPassword(password);
                                const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                                yield databaseuser_1.default.promise().query(query, [NewUserCaja, userId, adminId])
                                    .then(() => {
                                    res.json({ message: 'Usuario actualizado' });
                                })
                                    .catch(err => {
                                    console.error('Error al actualizar el usuario:', err);
                                    res.status(500).json({ error: 'Error al actualizar el usuario' });
                                });
                            }
                            else {
                                const NewUserCaja1 = {
                                    username: req.body.username.trim(),
                                    fullname: req.body.fullname.trim(),
                                    numero_caja: req.body.numero_caja,
                                    sucursal_id: req.body.sucursal_id
                                };
                                const query = 'UPDATE caja_usuarios SET ? WHERE id = ? AND adminId = ?';
                                yield databaseuser_1.default.promise().query(query, [NewUserCaja1, userId, adminId])
                                    .then(() => {
                                    res.json({ message: 'Usuario actualizado' });
                                })
                                    .catch(err => {
                                    console.error('Error al actualizar el usuario:', err);
                                    res.status(500).json({ error: 'Error al actualizar el usuario' });
                                });
                            }
                        }
                    }
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
                const adminId = decodedToken.id;
                const userId = req.params.id; // ID del juego a eliminar
                const query = 'DELETE FROM caja_usuarios WHERE id = ? AND adminId = ?';
                yield databaseuser_1.default.promise().query(query, [userId, adminId])
                    .then(() => {
                    res.json({ text: 'Usuario eliminado' });
                })
                    .catch(err => {
                    console.error('Error al eliminar el usuario:', err);
                    res.status(500).json({ error: 'Error al eliminar el usuario' });
                });
            }
        });
    }
}
const cajaController = new CajaController();
exports.default = cajaController;
