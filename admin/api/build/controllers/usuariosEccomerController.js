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
const models_1 = require("../models/models");
class EccomerController {
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
                    const query = 'SELECT * FROM usuarios';
                    const bebidas = yield databaseuser_1.default.promise().query(query)
                        .then(bebidas => bebidas[0])
                        .catch(err => console.log(err));
                    res.json(bebidas);
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
                    const userId = req.params.id; // ID del juego solicitado
                    const query = 'SELECT * FROM usuarios WHERE id = ?';
                    const user = yield databaseuser_1.default.promise().query(query, [userId])
                        .then(user => user[0])
                        .catch(err => console.log(err));
                    if (user.length > 0) {
                        res.json(user);
                    }
                    else {
                        res.status(404).json({ text: "el usuario no existe" });
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
                    const { password } = req.body;
                    const NewUserCaja = {
                        username: req.body.username,
                        password,
                        fullname: req.body.fullname
                    };
                    NewUserCaja.password = yield helpers_1.default.encryptPassword(password);
                    yield databaseuser_1.default.promise().query('INSERT INTO usuarios SET ?', [NewUserCaja])
                        .then(() => {
                        res.json({ text: "Usuarios Guardado" });
                    })
                        .catch(err => {
                        console.log("Error al guardar el usuario: ", err);
                        res.status(500).json({ text: "Error al guardar el usuario" });
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
                    const userId = req.params.id; // ID del juego a actualizar
                    const { password } = req.body;
                    const NewUserCaja = {
                        username: req.body.username,
                        password,
                        fullname: req.body.fullname
                    };
                    NewUserCaja.password = yield helpers_1.default.encryptPassword(password);
                    const query = 'UPDATE usuarios SET ? WHERE id = ?';
                    yield databaseuser_1.default.promise().query(query, [NewUserCaja, userId])
                        .then(() => {
                        res.json({ message: 'Usuario actualizado' });
                    })
                        .catch(err => {
                        console.error('Error al actualizar el usuario:', err);
                        res.status(500).json({ error: 'Error al actualizar el usuario' });
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
                    const userId = req.params.id; // ID del juego a eliminar
                    const query = 'DELETE FROM usuarios WHERE id = ?';
                    yield databaseuser_1.default.promise().query(query, [userId])
                        .then(() => {
                        res.json({ text: 'Usuario eliminado' });
                    })
                        .catch(err => {
                        console.error('Error al eliminar el usuario:', err);
                        res.status(500).json({ error: 'Error al eliminar el usuario' });
                    });
                }
                else {
                    res.status(200).json({ message: 'Unauthorized' });
                }
            }
        });
    }
}
const eccomerController = new EccomerController();
exports.default = eccomerController;
