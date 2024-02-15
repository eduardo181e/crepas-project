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
class WaflesIngredienteComplementarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM wic';
            const ingredientes = yield database_1.default.promise().query(query)
                .then(ingredientes => ingredientes[0])
                .catch(err => console.log(err));
            res.json(ingredientes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredienteId = req.params.id; // ID del juego solicitado
            const query = 'SELECT * FROM wic WHERE id = ?';
            const ingredientes = yield database_1.default.promise().query(query, [ingredienteId])
                .then(ingredientes => ingredientes[0])
                .catch(err => console.log(err));
            if (ingredientes.length > 0) {
                res.json(ingredientes);
            }
            else {
                res.status(404).json({ text: "El ingrediente no existe" });
            }
        });
    }
}
const waflesICController = new WaflesIngredienteComplementarioController();
exports.default = waflesICController;
