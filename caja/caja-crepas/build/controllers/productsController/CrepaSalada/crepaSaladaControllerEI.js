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
class CrepaSaladaEnsaladaIndividualController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'];
                console.log(token);
                const tokenWithoutBearer = token.replace('Bearer ', '');
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                console.log(decodedToken);
                const sucursal_id = decodedToken.sucursal;
                const adminId = decodedToken.adminId;
                const query = 'SELECT * FROM cseie WHERE sucursal_id = ? AND adminId = ?';
                ;
                const ensaladas = yield database_1.default.promise().query(query, [sucursal_id, adminId])
                    .then(ensaladas => ensaladas[0])
                    .catch(err => console.log(err));
                const ensaladas2 = yield database_1.default.promise().query('SELECT * FROM csei WHERE adminId = ?', [adminId])
                    .then(ensaladas2 => ensaladas2[0])
                    .catch(err => console.log(err));
                const existenciaPorProductId = {};
                ensaladas.forEach((ensalada) => {
                    existenciaPorProductId[ensalada.product_id] = ensalada;
                });
                // Combinar los datos
                const resultado = [];
                ensaladas2.forEach((ensalada) => {
                    const existencia = existenciaPorProductId[ensalada.id] || { existencia: 0 };
                    resultado.push({
                        product_id: ensalada.id,
                        ensalada_ind: ensalada.ensalada_ind,
                        descripcion: ensalada.descripcion,
                        existencia: existencia.existencia,
                        cantidad: existencia.cantidad,
                        inventario: existencia.inventario,
                    });
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
            const ensaladaId = req.params.id; // ID del juego solicitado
            const query = 'SELECT * FROM csei WHERE id = ?';
            const ensaladas = yield database_1.default.promise().query(query, [ensaladaId])
                .then(ensaladas => ensaladas[0])
                .catch(err => console.log(err));
            if (ensaladas.length > 0) {
                res.json(ensaladas);
            }
            else {
                res.status(404).json({ text: "La ensalada no existe" });
            }
        });
    }
}
const crepaSaladaEIController = new CrepaSaladaEnsaladaIndividualController();
exports.default = crepaSaladaEIController;
