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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../../models/models");
class BebidasFriasExistenciasController {
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
                    const sucursalId = req.body.sucursal_id;
                    const query = 'SELECT * FROM bfe WHERE sucursal_id = ?';
                    const bebidas = yield database_1.default.promise().query(query, [sucursalId])
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
                    const sucursalId = req.body.sucursal_id;
                    const bebidaId = req.params.id; // ID del juego solicitado
                    const query = 'SELECT * FROM bfe WHERE product_id = ? AND sucursal_id = ?';
                    const bebidas = yield database_1.default.promise().query(query, [bebidaId, sucursalId])
                        .then(bebidas => bebidas[0])
                        .catch(err => console.log(err));
                    if (bebidas.length > 0) {
                        res.json(bebidas);
                    }
                    else {
                        res.status(404).json({ text: "la bebida no existe" });
                    }
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
                    const sucursalId = req.body.sucursal_id;
                    const bebidaId = req.params.id;
                    const updateBebida = req.body.existencia;
                    yield database_1.default.query('UPDATE bfe SET existencia = ? WHERE product_id = ? AND sucursal_id = ?', [updateBebida, bebidaId, sucursalId]);
                }
                else {
                    res.status(200).json({ message: 'Unauthorized' });
                }
            }
        });
    }
}
const bebidasFriasExistenciasController = new BebidasFriasExistenciasController();
exports.default = bebidasFriasExistenciasController;
