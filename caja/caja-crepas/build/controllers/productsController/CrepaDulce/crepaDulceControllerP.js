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
class CrepaDulcePreciosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro');
            const adminId = decodedToken.adminId;
            const query = 'SELECT * FROM cdp WHERE adminId = ?';
            const precios = yield database_1.default.promise().query(query, [adminId])
                .then(precios => precios[0])
                .catch(err => console.log(err));
            res.json(precios);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const precioId = req.params.id; // ID del juego solicitado
            const query = 'SELECT * FROM cdp WHERE id = ?';
            const precios = yield database_1.default.promise().query(query, [precioId])
                .then(precios => precios[0])
                .catch(err => console.log(err));
            if (precios.length > 0) {
                res.json(precios);
            }
            else {
                res.status(404).json({ text: "el precio no existe" });
            }
        });
    }
}
const crepaDulcePController = new CrepaDulcePreciosController();
exports.default = crepaDulcePController;
