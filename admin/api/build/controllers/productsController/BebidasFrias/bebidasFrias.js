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
class BebidasFriasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM bf';
            const bebidas = yield database_1.default.promise().query(query)
                .then(bebidas => bebidas[0])
                .catch(err => console.log(err));
            res.json(bebidas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bebidaId = req.params.id; // ID del juego solicitado
            const query = 'SELECT * FROM bf WHERE id = ?';
            const bebidas = yield database_1.default.promise().query(query, [bebidaId])
                .then(bebidas => bebidas[0])
                .catch(err => console.log(err));
            if (bebidas.length > 0) {
                res.json(bebidas);
            }
            else {
                res.status(404).json({ text: "la bebida no existe" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bebida = {
                bebida: req.body.bebida,
                descripcion: req.body.descripcion,
                precio: req.body.precio
            };
            yield database_1.default.promise().query('INSERT INTO bf SET ?', [bebida])
                .then(() => {
                res.json({ text: 'Bebida guardada' });
            })
                .catch(err => {
                console.error('Error al guardar la bebida:', err);
                res.status(500).json({ error: 'Error al guardar la bebida' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bebidaId = req.params.id; // ID del juego a eliminar
            const query = 'DELETE FROM bf WHERE id = ?';
            yield database_1.default.promise().query(query, [bebidaId])
                .then(() => {
                res.json({ text: 'Bebida eliminado' });
            })
                .catch(err => {
                console.error('Error al eliminar la bebida:', err);
                res.status(500).json({ error: 'Error al eliminar la bebida' });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bebidaId = req.params.id; // ID del juego a actualizar
            const bebida = {
                bebida: req.body.bebida,
                descripcion: req.body.descripcion,
                precio: req.body.precio
            };
            const query = 'UPDATE bf SET ? WHERE id = ?';
            yield database_1.default.promise().query(query, [bebida, bebidaId])
                .then(() => {
                res.json({ message: 'Bebida actualizado' });
            })
                .catch(err => {
                console.error('Error al actualizar la bebida:', err);
                res.status(500).json({ error: 'Error al actualizar la bebida' });
            });
        });
    }
}
const bebidasFriasController = new BebidasFriasController();
exports.default = bebidasFriasController;
