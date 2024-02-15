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
class CrepaDulceHarinaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'];
                console.log(token);
                const tokenWithoutBearer = token.replace('Bearer ', '');
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                console.log(decodedToken);
                const sucursal = decodedToken.sucursal;
                const adminId = decodedToken.adminId;
                const query = 'SELECT * FROM cdthe WHERE sucursal_id = ? AND adminId = ?';
                const harinas = yield database_1.default.promise().query(query, [sucursal, adminId])
                    .then(harinas => harinas[0])
                    .catch(err => console.log(err));
                const harinas2 = yield database_1.default.promise().query('SELECT * FROM cdth WHERE adminId = ?', [adminId])
                    .then(harinas2 => harinas2[0])
                    .catch(err => console.log(err));
                const existenciasPorHarina = {};
                harinas.forEach((existencia) => {
                    existenciasPorHarina[existencia.product_id] = existencia;
                    console.log(existenciasPorHarina);
                });
                // Combinar los datos
                const resultado = harinas2.map((harina) => {
                    const existencia = existenciasPorHarina[harina.id] || { existencia: 0 };
                    console.log(existencia);
                    return {
                        id: existencia.product_id,
                        harina: harina.harina,
                        existencia: existencia.existencia,
                        cantidad: existencia.cantidad,
                        inventario: existencia.inventario,
                    };
                });
                res.json(resultado);
            }
            catch (error) {
                console.log(error);
                // Maneja cualquier error y envía una respuesta de error si es necesario
                res.status(500).json({ error: 'Ocurrió un error interno' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const harinaId = req.params.id;
            const query = 'SELECT * FROM cdth WHERE id = ?';
            const harinas = yield database_1.default.promise().query(query, [harinaId])
                .then(harinas => harinas[0])
                .catch(err => console.log(err));
            if (harinas.length > 0) {
                res.json(harinas);
            }
            else {
                res.status(404).json({ text: "La harina no existe" });
            }
        });
    }
}
const crepaDulceHController = new CrepaDulceHarinaController();
exports.default = crepaDulceHController;
