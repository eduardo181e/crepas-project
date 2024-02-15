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
class CrepaSaladaIngredientePrincipalController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM csip';
            const ingredientes = yield database_1.default.promise().query(query)
                .then(ingredientes => ingredientes[0])
                .catch(err => console.log(err));
            res.json(ingredientes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameId = req.params.id; // ID del juego solicitado
            const query = 'SELECT * FROM csip WHERE id = ?';
            const games = yield database_1.default.promise().query(query, [gameId])
                .then(games => games[0])
                .catch(err => console.log(err));
            if (games.length > 0) {
                res.json(games); // No uses return aquí
            }
            else {
                res.status(404).json({ text: "The game doesn't exist" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingrediente_pri = req.body.ingrediete_principal;
            yield database_1.default.promise().query('INSERT INTO csip SET ?', { ingrediente_pri: ingrediente_pri })
                .then(() => {
                res.json({ text: 'Ingrediente guardado' });
            })
                .catch(err => {
                console.error('Error al guardar el ingrediente:', err);
                res.status(500).json({ error: 'Error al guardar el ingrediente' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameId = req.params.id; // ID del juego a eliminar
            const query = 'DELETE FROM csip WHERE id = ?';
            yield database_1.default.promise().query(query, [gameId])
                .then(() => {
                res.json({ text: 'Ingrediente eliminado' });
            })
                .catch(err => {
                console.error('Error al eliminar el ingrediente:', err);
                res.status(500).json({ error: 'Error al eliminar el ingrediente' });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.id; // ID del juego a actualizar
            const query = 'UPDATE csip SET ? WHERE id = ?';
            yield database_1.default.promise().query(query, [{ ingrediente_pri: req.body.ingrediete_principal }, productId])
                .then(() => {
                res.json({ message: 'Producto actualizado' });
            })
                .catch(err => {
                console.error('Error al actualizar el producto:', err);
                res.status(500).json({ error: 'Error al actualizar el producto' });
            });
        });
    }
}
const crepaSaladaIPController = new CrepaSaladaIngredientePrincipalController();
exports.default = crepaSaladaIPController;
