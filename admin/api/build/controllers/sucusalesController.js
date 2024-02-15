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
exports.sucursalesController = void 0;
const databaseuser_1 = __importDefault(require("../databaseuser"));
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SucursalesController {
    agregar(req, res) {
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
                const { direccion } = req.body;
                const direccion1 = JSON.stringify(direccion);
                const Sucursal = {
                    direccion: direccion1,
                    nombre: req.body.nombre.trim(),
                    adminId: adminId
                };
                var insertId1;
                try {
                    // Realizar la inserción en la tabla "sucursales"
                    const result = yield databaseuser_1.default.promise().query('INSERT INTO sucursales SET ?', [Sucursal]);
                    const insertId = result[0].insertId;
                    insertId1 = result[0].insertId;
                    // Enviar una respuesta exitosa después de la inserción
                    res.json({ text: 'Sucursal guardada', insertId });
                }
                catch (err) {
                    console.error('Error al guardar la sucursal:', err);
                    res.status(500).json({ error: 'Error al guardar la sucursal' });
                    return; // Importante: detener la ejecución aquí para evitar problemas
                }
                // Crepa Dulce Harinas
                try {
                    yield database_1.default.promise().query('SELECT * FROM cdth WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log({ id: element.id, harina: element.harina });
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                harina: element.harina,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO cdthe SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar cdth:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Crepa Dulce Ingredinetes Untables
                try {
                    yield database_1.default.promise().query('SELECT * FROM cdiu WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                ingrediente_unt: element.ingrediente_unt,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO cdiue SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar cdiu:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Crepa Dulce Ingredientes Complementarios
                try {
                    yield database_1.default.promise().query('SELECT * FROM cdic WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                ingrediente_com: element.ingrediente_com,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO cdice SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar cdic:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Crepa Dulce Nieves
                try {
                    yield database_1.default.promise().query('SELECT * FROM cdn WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                nieve: element.nieve,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO cdne SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar cdn:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Crepa Salada Ingredentes Principales
                try {
                    yield database_1.default.promise().query('SELECT * FROM csip WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                ingrediente_pri: element.ingrediente_pri,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO csipe SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar csip:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Crepa Salada Ingredientes Base
                try {
                    yield database_1.default.promise().query('SELECT * FROM csib WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                ingrediente_base: element.ingrediente_base,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO csibe SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar csib:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Crepa Salada Adereso Base
                try {
                    yield database_1.default.promise().query('SELECT * FROM csab WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                adereso_base: element.adereso_base,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO csabe SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar csab:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Crepa Salada Aderezo Ensalada
                try {
                    yield database_1.default.promise().query('SELECT * FROM csa WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                adereso: element.adereso,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO csae SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar csa:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Crepa Salada Ensalada Indivudual
                try {
                    yield database_1.default.promise().query('SELECT * FROM csei WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                ensalada_ind: element.ensalada_ind,
                                descripcion: element.descripcion,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO cseie SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar csei:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Crepa Salada Botana
                try {
                    yield database_1.default.promise().query('SELECT * FROM csb WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                botana: element.botana,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO csbe SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar csb:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Waffle Ingredientes Untables
                try {
                    yield database_1.default.promise().query('SELECT * FROM wiu WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                ingrediente_unt: element.ingrediente_unt,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO wiue SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar wiu:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Waffle Ingredientes Complementarios
                try {
                    yield database_1.default.promise().query('SELECT * FROM wic WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                ingrediente_com: element.ingrediente_com,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO wice SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar wic:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Waffle Nieves
                try {
                    yield database_1.default.promise().query('SELECT * FROM wn WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                nieve: element.nieve,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO wne SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar wn:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Waffle Canasta Ingredientes untables
                try {
                    yield database_1.default.promise().query('SELECT * FROM wciu WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                ingrediente_unt: element.ingrediente_unt,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO wciue SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Waffle Canasta Ingredientes Complementarios
                try {
                    yield database_1.default.promise().query('SELECT * FROM wcic WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                ingrediente_com: element.ingrediente_com,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO wcice SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Waffle Canasta Nieves
                try {
                    yield database_1.default.promise().query('SELECT * FROM wcn WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                nieve: element.nieve,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO wcne SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Bebidas Calientes
                try {
                    yield database_1.default.promise().query('SELECT * FROM bc WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                bebida: element.bebida,
                                descripcion: element.descripcion,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO bce SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar bc:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
                // Bebidas Frias
                try {
                    yield database_1.default.promise().query('SELECT * FROM bf WHERE adminId = ?', [adminId])
                        .then((result) => {
                        result[0].forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            console.log(element);
                            console.log(insertId1);
                            const elements = {
                                sucursal_id: insertId1,
                                product_id: element.id,
                                bebida: element.bebida,
                                descripcion: element.descripcion,
                                cantidad: element.inventario,
                                adminId: adminId
                            };
                            yield database_1.default.promise().query('INSERT INTO bfe SET ?', [elements])
                                .then(() => {
                                console.log('Registro de existencia del producto en la sucursal establecido');
                            })
                                .catch(err => {
                                console.error('Error al establecer el registro de existencia del producto en la sucursal', err);
                            });
                        }));
                    })
                        .catch(err => {
                        console.error('Error al consultar bf:', err);
                    });
                }
                catch (err) {
                    console.error('Error al realizar la consulta:', err);
                }
            }
        });
    }
    view(req, res) {
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
                const sucursales = yield databaseuser_1.default.promise().query('SELECT * FROM sucursales WHERE adminId = ?', [adminId])
                    .then(sucursales => sucursales[0])
                    .catch(err => console.log(err));
                res.json(sucursales);
            }
        });
    }
    viewOne(req, res) {
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
                const id = req.params.id;
                const sucursal = yield databaseuser_1.default.promise().query('SELECT * FROM sucursales WHERE id = ? AND adminId = ?', [id, adminId])
                    .then(sucursal => sucursal[0])
                    .catch(err => console.log(err));
                res.json(sucursal);
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
                const id = req.params.id;
                yield databaseuser_1.default.promise().query('DELETE FROM sucursales WHERE id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    res.json({ text: 'Sucursal Elinada' });
                })
                    .catch(err => {
                    console.error('Error al elimanar la sucursal', err);
                    res.status(200).json({ error: 'Error al eliminar la sucursal' });
                });
                // Eliminar registros de harinas de crepa dulce
                yield database_1.default.promise().query('DELETE FROM cdthe WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de harinas eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de las harinas', err);
                });
                // Eliminar registros de ingredientes untables de crepa dulce
                yield database_1.default.promise().query('DELETE FROM cdiue WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de ingredientes untables eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los ingredientes untables', err);
                });
                // Eliminar registros de ingredientes complementarios crepa dulce
                yield database_1.default.promise().query('DELETE FROM cdice WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de ingredientes complementarios eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los ingredientes complementarios', err);
                });
                // Eliminar registros de nieves crepa dulce
                yield database_1.default.promise().query('DELETE FROM cdne WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de nieves eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de las nieves', err);
                });
                // Eliminar registros de ingredientes principales crepa salada
                yield database_1.default.promise().query('DELETE FROM csipe WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de ingredientes principales eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los ingredientes principales', err);
                });
                // Eliminar registros de ingredientes base crepa salada
                yield database_1.default.promise().query('DELETE FROM csibe WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de ingredientes base eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los ingredientes base', err);
                });
                // Eliminar registros de adereso base crepa salada
                yield database_1.default.promise().query('DELETE FROM csabe WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de adereso base eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los adereso base', err);
                });
                // Eliminar registros de adereso ensalada crepa salada
                yield database_1.default.promise().query('DELETE FROM csae WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de adereso ensalada eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los adereso ensalada', err);
                });
                // Eliminar registros de ensalada individual crepa salada
                yield database_1.default.promise().query('DELETE FROM cseie WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de ensalada individual eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los ensalada individual', err);
                });
                // Eliminar registros de botana crepa salada
                yield database_1.default.promise().query('DELETE FROM csbe WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de botana eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los botana', err);
                });
                // Eliminar registros de ingredientes untables waffle
                yield database_1.default.promise().query('DELETE FROM wiue WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de ingredientes untables eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los ingredientes untables', err);
                });
                // Eliminar registros de ingredientes complementarios waffle
                yield database_1.default.promise().query('DELETE FROM wice WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de ingredientes complementarios eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los ingredientes complementarios', err);
                });
                // Eliminar registros de nieves waffle
                yield database_1.default.promise().query('DELETE FROM wne WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de nieves eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de las nieves', err);
                });
                // Eliminar registros de ingredientes untables waffle canasta
                yield database_1.default.promise().query('DELETE FROM wciue WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de ingredientes untables eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los ingredientes untables', err);
                });
                // Eliminar registros de ingredientes complementarios waffle canasta
                yield database_1.default.promise().query('DELETE FROM wcice WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de ingredientes complementarios eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de los ingredientes complementarios', err);
                });
                // Eliminar registros de nieves waffle canasta
                yield database_1.default.promise().query('DELETE FROM wcne WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de nieves eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de las nieves', err);
                });
                // Eliminar registros de bebidas calientes
                yield database_1.default.promise().query('DELETE FROM bce WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de bebidas calientes eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de las bebidas calientes', err);
                });
                // Eliminar registros de bebidas frias
                yield database_1.default.promise().query('DELETE FROM bfe WHERE sucursal_id = ? AND adminId = ?', [id, adminId])
                    .then(() => {
                    console.log('Registro de existencias de bebidas frias eliminado');
                })
                    .catch(err => {
                    console.error('Error al elimanar el registro de existencias de las bebidas frias', err);
                });
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
                const { direccion } = req.body;
                const direccion1 = JSON.stringify(direccion);
                const id = req.params.id;
                const Sucursal = {
                    direccion: direccion1,
                    nombre: req.body.nombre
                };
                yield databaseuser_1.default.promise().query('UPDATE sucursales SET ? WHERE id = ? AND adminId = ?', [Sucursal, id, adminId])
                    .then(() => {
                    res.json({ text: 'Sucursal actualizada' });
                })
                    .catch(err => {
                    console.error('Error al actualizar la sucursal:', err);
                    res.status(500).json({ error: 'Error al actualozar la sucursal' });
                });
            }
        });
    }
    estados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const estados = yield databaseuser_1.default.promise().query('SELECT * FROM estados')
                .then(estados => estados[0])
                .catch(err => console.log(err));
            res.json(estados);
        });
    }
    paises(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paises = yield databaseuser_1.default.promise().query('SELECT * FROM paises')
                .then(paises => paises[0])
                .catch(err => console.log(err));
            res.json(paises);
        });
    }
}
exports.sucursalesController = new SucursalesController();
