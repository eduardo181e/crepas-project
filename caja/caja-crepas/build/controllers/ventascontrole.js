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
exports.ventasController = void 0;
const nameCrepas_1 = require("./models/nameCrepas");
const database_1 = __importDefault(require("../database"));
const databaseproduct_1 = __importDefault(require("../databaseproduct"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class VentasController {
    constructor() {
        this.sales = (req, res) => {
            const now = req.params.now;
            const mesa = req.params.mesa;
            const token = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
            const sucursal_id1 = decodedToken.sucursal;
            const caja_id = decodedToken.caja;
            const user_id = decodedToken.id;
            const adminId = decodedToken.adminId;
            const ordenes = req.body;
            // Crepas saladas
            const aderesosCrepaSalada = [];
            const resultA = [];
            var idRepeticionesAcs1;
            const aderesosBaseCrepaSalada = [];
            const ingredientesCrepaSalada = [];
            const ingredientesBaseCrepaSalada = [];
            // Crepas Dulces 
            const ingredientesComCrepaDulce = [];
            const ingredientesUntCrepaDulce = [];
            const nievesCrepaDulce = [];
            const decoracionesCrepaDulce = [];
            const harinaCrepaDulce = [];
            // Waffles
            const ingredientesComWaffle = [];
            const ingredientesUntWaffle = [];
            const nievesWaffle = [];
            const decoracionesWaffle = [];
            // Waffle Canasta
            const ingredientesComWaffleCanasta = [];
            const ingredientesUntWaffleCanasta = [];
            const nievesWaffleCanasta = [];
            const decoracionesWaffleCanasta = [];
            // Bebidas Calientes
            const bebidasCalientes1 = [];
            // Bebidas Frías
            const bebidasFrias1 = [];
            // Botanas
            const botanas1 = [];
            // Ensaladas
            const ensaladas1 = [];
            var cantidadProductos = 0;
            var totalProductos = 0;
            if (ordenes.length === 0) {
                res.status(400).json({ message: '400' });
            }
            else if (ordenes.length > 0) {
                try {
                    const promise1 = new Promise((resolve) => {
                        ordenes.forEach((orden, index) => {
                            let cantidad = orden.cantidad;
                            cantidadProductos += cantidad;
                            let total = orden.total;
                            totalProductos += total;
                            if (orden.nombre === nameCrepas_1.crepasSalada) {
                                for (let i = 0; i < orden.cantidad; i++) {
                                    orden.orden.aderesos.forEach((aderezo) => {
                                        aderesosCrepaSalada.push(aderezo);
                                    });
                                    orden.orden.adereso_base.forEach((aderezoBase) => {
                                        aderesosBaseCrepaSalada.push(aderezoBase);
                                    });
                                    orden.orden.ingredientes.forEach((ingrediente) => {
                                        ingredientesCrepaSalada.push(ingrediente);
                                    });
                                    orden.orden.ingredientes_base.forEach((ingrediente) => {
                                        ingredientesBaseCrepaSalada.push(ingrediente);
                                    });
                                }
                            }
                            if (orden.nombre === nameCrepas_1.crepasDulce) {
                                for (let i = 0; i < orden.cantidad; i++) {
                                    orden.orden.ingredientes_com.forEach((ingredienteCom) => {
                                        ingredientesComCrepaDulce.push(ingredienteCom);
                                    });
                                    orden.orden.ingredientes_unt.forEach((ingredienteUnt) => {
                                        ingredientesUntCrepaDulce.push(ingredienteUnt);
                                    });
                                    orden.orden.nieve.forEach((nieve) => {
                                        nievesCrepaDulce.push(nieve);
                                    });
                                    orden.orden.decoracion.forEach((nieve) => {
                                        decoracionesCrepaDulce.push(nieve);
                                    });
                                    harinaCrepaDulce.push(orden.orden.harina);
                                }
                            }
                            if (orden.nombre === nameCrepas_1.waffles) {
                                for (let i = 0; i < orden.cantidad; i++) {
                                    orden.orden.ingredientes_com.forEach((ingredienteCom) => {
                                        ingredientesComWaffle.push(ingredienteCom);
                                    });
                                    orden.orden.ingredientes_unt.forEach((ingredienteUnt) => {
                                        ingredientesUntWaffle.push(ingredienteUnt);
                                    });
                                    orden.orden.nieve.forEach((nieve) => {
                                        nievesWaffle.push(nieve);
                                    });
                                    orden.orden.decoracion.forEach((nieve) => {
                                        decoracionesWaffle.push(nieve);
                                    });
                                }
                            }
                            if (orden.nombre === nameCrepas_1.waffleCanasta) {
                                for (let i = 0; i < orden.cantidad; i++) {
                                    orden.orden.ingredientes_com.forEach((ingredienteCom) => {
                                        ingredientesComWaffleCanasta.push(ingredienteCom);
                                    });
                                    orden.orden.ingredientes_unt.forEach((ingredienteUnt) => {
                                        ingredientesUntWaffleCanasta.push(ingredienteUnt);
                                    });
                                    orden.orden.nieve.forEach((nieve) => {
                                        nievesWaffleCanasta.push(nieve);
                                    });
                                    orden.orden.decoracion.forEach((nieve) => {
                                        decoracionesWaffleCanasta.push(nieve);
                                    });
                                }
                            }
                            if (orden.nombre === nameCrepas_1.bebidasCalientes) {
                                for (let i = 0; i < orden.cantidad; i++) {
                                    bebidasCalientes1.push(orden.orden);
                                }
                            }
                            if (orden.nombre === nameCrepas_1.bebidasFrias) {
                                for (let i = 0; i < orden.cantidad; i++) {
                                    bebidasFrias1.push(orden.orden);
                                }
                            }
                            if (orden.nombre === nameCrepas_1.botanas) {
                                for (let i = 0; i < orden.cantidad; i++) {
                                    botanas1.push(orden.orden);
                                }
                            }
                            if (orden.nombre === nameCrepas_1.ensaladas) {
                                for (let i = 0; i < orden.cantidad; i++) {
                                    ensaladas1.push(orden.orden);
                                }
                            }
                            if (index === ordenes.length - 1) {
                                resolve();
                            }
                        });
                    });
                    promise1.then(() => {
                        console.log(aderesosCrepaSalada);
                        const promiseAcs = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            var index1;
                            aderesosCrepaSalada.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                index1 = index;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            if (test === aderesosCrepaSalada.length) {
                                const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                    return Promise.resolve([id, repeticiones]);
                                }));
                                Promise.all(repPromises).then((rep) => {
                                    if (Object.keys(rep).length === Object.keys(resultados).length) {
                                        idRepeticionesAcs1 = rep;
                                        resolve();
                                    }
                                });
                            }
                        });
                        promiseAcs.then(() => {
                            const promise = new Promise((resolve) => {
                                idRepeticionesAcs1.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM csae WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultA.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultA.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultA.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultA.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultA.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesAcs1.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesABcs;
                        const promiseABcs = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            var index1;
                            aderesosBaseCrepaSalada.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                index1 = index;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            if (test === aderesosBaseCrepaSalada.length) {
                                const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                    return Promise.resolve([id, repeticiones]);
                                }));
                                Promise.all(repPromises).then((rep) => {
                                    if (Object.keys(rep).length === Object.keys(resultados).length) {
                                        idRepeticionesABcs = rep;
                                        resolve();
                                    }
                                });
                            }
                        });
                        const resultAB = [];
                        promiseABcs.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesABcs.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM csabe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultAB.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultAB.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultAB.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultAB.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultAB.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesABcs.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesIPcs;
                        const promiseIPcs = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            ingredientesCrepaSalada.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            if (test === ingredientesCrepaSalada.length) {
                                const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                    return Promise.resolve([id, repeticiones]);
                                }));
                                Promise.all(repPromises).then((rep) => {
                                    if (Object.keys(rep).length === Object.keys(resultados).length) {
                                        idRepeticionesIPcs = rep;
                                        resolve();
                                    }
                                });
                            }
                        });
                        const resultIP = [];
                        promiseIPcs.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesIPcs.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM csipe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultIP.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultIP.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultIP.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultIP.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultIP.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesIPcs.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesIBcs;
                        const promiseIBcs = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            ingredientesBaseCrepaSalada.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            if (test === ingredientesBaseCrepaSalada.length) {
                                const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                    return Promise.resolve([id, repeticiones]);
                                }));
                                Promise.all(repPromises).then((rep) => {
                                    if (Object.keys(rep).length === Object.keys(resultados).length) {
                                        idRepeticionesIBcs = rep;
                                        resolve();
                                    }
                                });
                            }
                        });
                        const resultIB = [];
                        promiseIBcs.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesIBcs.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM csibe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultIB.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultIB.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultIB.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultIB.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultIB.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesIBcs.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                    console.log('result' + resultIB);
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesICD;
                        const promiseICcd = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            ingredientesComCrepaDulce.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesICD = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultICcd = [];
                        promiseICcd.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesICD.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM cdice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultICcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultICcd.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultICcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultICcd.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultICcd.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesICD.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesIUD;
                        const promiseIUcd = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            ingredientesUntCrepaDulce.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesIUD = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultIUcd = [];
                        promiseIUcd.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesIUD.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM cdiue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultIUcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultIUcd.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultIUcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultIUcd.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultIUcd.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesIUD.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesND;
                        const promiseNcd = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            nievesCrepaDulce.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesND = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultNcd = [];
                        promiseNcd.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesND.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM cdne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultNcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultNcd.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultNcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultNcd.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultNcd.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesND.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesDD;
                        const promisedcd = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            decoracionesCrepaDulce.forEach((aderezo, index) => {
                                const id = aderezo.nombre;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesDD = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultdcd = [];
                        promisedcd.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesDD.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM cdde WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then((existencia) => existencia[0])
                                        .catch(err => console.log(err));
                                    console.log('cantidad', existencia[0].cantidad);
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultdcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultdcd.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultdcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultdcd.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultdcd.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesDD.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesHD;
                        const promiseHcd = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            harinaCrepaDulce.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesHD = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultHcd = [];
                        promiseHcd.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesHD.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM cdthe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultHcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultHcd.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultHcd.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultHcd.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultHcd.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesHD.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        // Waffles
                        var idRepeticionesICW;
                        const promiseICw = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            ingredientesComWaffle.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesICW = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultICw = [];
                        promiseICw.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesICW.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM wice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultICw.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultICw.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultICw.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultICw.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultICw.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesICW.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesIUW;
                        const promiseIUw = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            ingredientesUntWaffle.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesIUW = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultIUw = [];
                        promiseIUw.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesIUW.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM wiue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultIUw.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultIUw.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultIUw.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultIUw.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultIUw.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesIUW.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesNW;
                        const promiseNw = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            nievesWaffle.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesNW = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultNw = [];
                        promiseNw.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesNW.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM wne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultNw.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultNw.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultNw.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultNw.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultNw.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesNW.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesDW;
                        const promisedw = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            decoracionesWaffle.forEach((aderezo, index) => {
                                const id = aderezo.nombre;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesDW = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultdcw = [];
                        promisedw.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesDW.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM wde WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultdcw.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultdcw.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultdcw.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultdcw.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultdcw.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesDW.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        // Waffles Canasta
                        var idRepeticionesICWC;
                        const promiseICwc = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            ingredientesComWaffleCanasta.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesICWC = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultICwc = [];
                        promiseICwc.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesICWC.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM wcice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultICwc.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultICwc.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultICwc.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultICwc.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultICwc.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesICWC.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesIUWC;
                        const promiseIUwc = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            ingredientesUntWaffleCanasta.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesIUWC = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultIUwc = [];
                        promiseIUwc.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesIUWC.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM wciue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultIUwc.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultIUwc.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultIUwc.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultIUwc.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultIUwc.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesIUWC.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesNWC;
                        const promiseNwc = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            nievesWaffleCanasta.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesNWC = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultNwc = [];
                        promiseNwc.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesNWC.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM wcne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultNwc.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultNwc.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultNwc.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultNwc.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultNwc.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesNWC.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesDWC;
                        const promisedwc = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            decoracionesWaffleCanasta.forEach((aderezo, index) => {
                                const id = aderezo.nombre;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesDWC = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultdcwc = [];
                        promisedwc.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesDWC.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM wcde WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    console.log('query', query);
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultdcwc.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultdcwc.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultdcwc.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultdcwc.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultdcwc.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesDWC.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesBC;
                        const promiseBC = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            bebidasCalientes1.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesBC = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultBC = [];
                        promiseBC.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesBC.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM bce WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultBC.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultBC.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultBC.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultBC.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultBC.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesBC.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesBF;
                        const promiseBF = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            bebidasFrias1.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesBF = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultBF = [];
                        promiseBF.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesBF.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM bfe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultBF.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultBF.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultBF.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultBF.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultBF.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesBF.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesB;
                        const promiseB = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            botanas1.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesB = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultB = [];
                        promiseB.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesB.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM csbe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultB.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultB.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultB.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultB.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultB.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesB.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        var idRepeticionesE;
                        const promiseE = new Promise((resolve, reject) => {
                            const resultados = {};
                            var test = 0;
                            ensaladas1.forEach((aderezo, index) => {
                                const id = aderezo.id;
                                test++;
                                if (!resultados[id]) {
                                    resultados[id] = 0;
                                }
                                resultados[id]++;
                            });
                            const repPromises = Object.entries(resultados).map(([id, repeticiones]) => __awaiter(this, void 0, void 0, function* () {
                                return Promise.resolve([id, repeticiones]);
                            }));
                            Promise.all(repPromises).then((rep) => {
                                if (Object.keys(rep).length === Object.keys(resultados).length) {
                                    idRepeticionesE = rep;
                                    resolve();
                                }
                            });
                        });
                        const resultE = [];
                        promiseE.then(() => {
                            const promise1 = new Promise((resolve) => {
                                idRepeticionesE.forEach((id, index) => __awaiter(this, void 0, void 0, function* () {
                                    const product_id = id[0];
                                    const sucursal_id = sucursal_id1;
                                    const repeticiones = id[1];
                                    const query = 'SELECT * FROM cseie WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                    const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                        .then(existencia => existencia[0])
                                        .catch(err => console.log(err));
                                    if (existencia[0].cantidad === 0) {
                                        if (existencia[0].existencia === 0) {
                                            resultE.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            resultE.push(true);
                                        }
                                    }
                                    else if (existencia[0].cantidad === 1) {
                                        if (existencia[0].existencia === 0) {
                                            resultE.push(false);
                                        }
                                        else if (existencia[0].existencia === 1) {
                                            if (existencia[0].inventario >= repeticiones) {
                                                resultE.push(true);
                                            }
                                            else if (existencia[0].inventario < repeticiones) {
                                                resultE.push(false);
                                            }
                                        }
                                    }
                                    // Si se han completado todas las operaciones de push, resolver la promesa
                                    if (index === idRepeticionesE.length - 1) {
                                        resolve();
                                    }
                                }));
                            });
                            setTimeout(() => {
                                promise1.then(() => {
                                }).catch((err) => { err; });
                            }, 1000);
                        });
                        resultA;
                        resultAB;
                        resultIP;
                        resultIB;
                        resultICcd;
                        resultIUcd;
                        resultNcd;
                        resultHcd;
                        resultICw;
                        resultIUw;
                        resultNw;
                        resultICwc;
                        resultIUwc;
                        resultNwc;
                        resultBC;
                        resultBF;
                        resultB;
                        resultE;
                        resultdcwc;
                        resultdcw;
                        resultdcd;
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            const result = resultA.concat(resultAB, resultIP, resultIB, resultICcd, resultIUcd, resultNcd, resultHcd, resultICw, resultIUw, resultNw, resultICwc, resultIUwc, resultNwc, resultBC, resultBF, resultB, resultE, resultdcwc, resultdcw, resultdcd);
                            console.log(result);
                            const resultFinal = result.every((value) => value === true);
                            console.log(resultFinal);
                            if (resultFinal === true) {
                                console.log(sucursal_id1);
                                console.log(user_id);
                                console.log(caja_id);
                                console.log(now);
                                console.log(JSON.stringify(ordenes));
                                console.log(cantidadProductos);
                                console.log(totalProductos);
                                const factura = {
                                    sucursal_id: sucursal_id1,
                                    userId: user_id,
                                    numero_caja: caja_id,
                                    fecha_hora: now,
                                    orden: JSON.stringify(ordenes),
                                    numero_productos: cantidadProductos,
                                    total: totalProductos,
                                    adminId: adminId,
                                    mesa: mesa
                                };
                                const query = 'INSERT INTO factura_caja SET ?';
                                const factura1 = yield databaseproduct_1.default.promise().query(query, [factura])
                                    .then(factura1 => factura1[0])
                                    .catch(err => console.log(err));
                                console.log(factura1);
                                const factura_id = factura1.insertId;
                                if (idRepeticionesAcs1.length > 0) {
                                    idRepeticionesAcs1.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM csae WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                adereso: existencia[0][0].adereso,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO csav SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien csa');
                                                })
                                                    .catch(err => console.log(err));
                                                console.log(venta1);
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE csae SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csav SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csa');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE csae SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csav SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csa');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesABcs.length > 0) {
                                    idRepeticionesABcs.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM csabe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                adereso_base: existencia[0][0].adereso_base,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO csabv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien csab');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE csabe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csabv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csab');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE csabe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csabv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csab');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesIPcs.length > 0) {
                                    idRepeticionesIPcs.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM csipe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                ingrediente_pri: existencia[0][0].ingrediente_pri,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO csipv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien csip');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE csipe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csipv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csip');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE csipe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csipv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csip');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesIBcs.length > 0) {
                                    idRepeticionesIBcs.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM csibe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                ingrediente_base: existencia[0][0].ingrediente_base,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO csibv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien csib');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE csibe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csibv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csib');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE csibe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csibv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csib');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesICD.length > 0) {
                                    idRepeticionesICD.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM cdice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                ingrediente_com: existencia[0][0].ingrediente_com,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO cdicv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien cdice');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE cdice SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cdicv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdice');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE cdice SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cdicv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdice');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesIUD.length > 0) {
                                    idRepeticionesIUD.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM cdiue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                ingrediente_unt: existencia[0][0].ingrediente_unt,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO cdiuv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien cdiu');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE cdiue SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cdiuv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdiu');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE cdiue SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cdiuv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdiu');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesND.length > 0) {
                                    idRepeticionesND.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM cdne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                nieve: existencia[0][0].nieve,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO cdnv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien cdn');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE cdne SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cdnv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdn');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE cdne SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cdnv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdn');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                console.log('venta decoraciones 1', idRepeticionesDD);
                                if (idRepeticionesDD.length > 0) {
                                    idRepeticionesDD.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM cdde WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                        yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            console.log('venta decoraciones 1', existencia);
                                            const venta = {
                                                decoracion: existencia[0][0].decoracion,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log('venta decoraciones 1', venta);
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO cddv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien cdd');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE cdde SET inventario = inventario - ? WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cddv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdd');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE cdde SET inventario = inventario - ?, existencia = 0 WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cddv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdd');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesHD.length > 0) {
                                    idRepeticionesHD.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM cdthe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                harina: existencia[0][0].harina,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO cdthv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien cdth');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE cdthe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cdthv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdth');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE cdthe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cdthv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien cdth');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesICW.length > 0) {
                                    idRepeticionesICW.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM wice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                ingrediente_com: existencia[0][0].ingrediente_com,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO wicv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien wic');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE wice SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wicv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wic');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE wice SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wicv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wic');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesIUW.length > 0) {
                                    idRepeticionesIUW.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM wiue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                ingrediente_unt: existencia[0][0].ingrediente_unt,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO wiuv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien wiu');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE wiue SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wiuv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wiu');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE wiue SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wiuv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wiu');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesNW.length > 0) {
                                    idRepeticionesNW.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM wne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            console.log(existencia[0][0]);
                                            const venta = {
                                                nieve: existencia[0][0].nieve,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO wnv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien wne');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE wne SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wnv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wne');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE wne SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wnv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wne');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesDW.length > 0) {
                                    idRepeticionesDW.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM wde WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                decoracion: existencia[0][0].decoracion,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO wdv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien wd');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE wde SET inventario = inventario - ? WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wdv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wd');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE wde SET inventario = inventario - ?, existencia = 0 WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wdv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wd');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesICWC.length > 0) {
                                    idRepeticionesICWC.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM wcice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            console.log(existencia[0][0]);
                                            const venta = {
                                                ingrediente_com: existencia[0][0].ingrediente_com,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO wcicv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien wcic');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE wcice SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wcicv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wcic');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE wcice SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wcicv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wcic');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesIUWC.length > 0) {
                                    idRepeticionesIUWC.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM wciue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            console.log(existencia[0][0]);
                                            const venta = {
                                                ingrediente_unt: existencia[0][0].ingrediente_unt,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO wciuv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien wciu');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE wciue SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wciuv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wciu');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE wciue SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wciuv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wciu');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesNWC.length > 0) {
                                    idRepeticionesNWC.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM wcne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            console.log(existencia[0][0]);
                                            const venta = {
                                                nieve: existencia[0][0].nieve,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO wcnv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien wcn');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE wcne SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wcnv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wcn');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE wcne SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                                                        .then(venta1 => { })
                                                        .catch(err => console.log(err));
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wcnv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wcn');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesDWC.length > 0) {
                                    idRepeticionesDWC.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM wcde WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                decoracion: existencia[0][0].decoracion,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                ventas: repeticiones,
                                                factura_id: factura_id,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO wcdv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    venta1[0];
                                                    console.log('todo bien wcd');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE wcde SET inventario = inventario - ? WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wcdv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wcd');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE wcde SET inventario = inventario - ?, existencia = 0 WHERE decoracion = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO wcdv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien wcd');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesBC.length > 0) {
                                    idRepeticionesBC.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM bce WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                bebida: existencia[0][0].bebida,
                                                descripcion: existencia[0][0].descripcion,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                factura_id: factura_id,
                                                ventas: repeticiones,
                                                adminId: adminId
                                            };
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO bcv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    console.log('todo bien bc');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE bce SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO bcv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien bc');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE bce SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO bcv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien bc');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesBF.length > 0) {
                                    idRepeticionesBF.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const sucursal_id = sucursal_id1;
                                        const repeticiones = id[1];
                                        const query = 'SELECT * FROM bfe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                bebida: existencia[0][0].bebida,
                                                descripcion: existencia[0][0].descripcion,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                factura_id: factura_id,
                                                ventas: repeticiones,
                                                adminId: adminId
                                            };
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO bfv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    console.log('todo bien bf');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE bfe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO bfv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien bf');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE bfe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO bfv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien bf');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesB.length > 0) {
                                    idRepeticionesB.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const repeticiones = id[1];
                                        const sucursal_id = sucursal_id1;
                                        const query = 'SELECT * FROM csbe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => __awaiter(this, void 0, void 0, function* () {
                                            const venta = {
                                                botana: existencia[0][0].botana,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                factura_id: factura_id,
                                                ventas: repeticiones,
                                                adminId: adminId
                                            };
                                            console.log(existencia[0][0]);
                                            if (existencia[0][0].cantidad === 0) {
                                                console.log(venta);
                                                const query = 'INSERT INTO csbv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    console.log('todo bien csb');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE csbe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = yield database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csbv SET ?';
                                                    const venta1 = yield database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csb');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE csbe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = yield database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO csbv SET ?';
                                                    const venta1 = yield database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csb');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        }))
                                            .catch(err => console.log(err));
                                    }));
                                }
                                if (idRepeticionesE.length > 0) {
                                    idRepeticionesE.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                                        const product_id = id[0];
                                        const repeticiones = id[1];
                                        const sucursal_id = sucursal_id1;
                                        const query = 'SELECT * FROM cseie WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                        const existencia = yield database_1.default.promise().query(query, [product_id, sucursal_id, adminId])
                                            .then((existencia) => {
                                            const venta = {
                                                ensalada_ind: existencia[0][0].ensalada_ind,
                                                descripcion: existencia[0][0].descripcion,
                                                product_id: existencia[0][0].id,
                                                sucursal_id: sucursal_id1,
                                                created_at: now,
                                                factura_id: factura_id,
                                                ventas: repeticiones,
                                                adminId: adminId
                                            };
                                            console.log(venta);
                                            if (existencia[0][0].cantidad === 0) {
                                                const query = 'INSERT INTO cseiv SET ?';
                                                const venta1 = database_1.default.promise().query(query, [venta])
                                                    .then(venta1 => {
                                                    console.log('todo bien csei');
                                                })
                                                    .catch(err => console.log(err));
                                            }
                                            else if (existencia[0][0].cantidad === 1) {
                                                if (existencia[0][0].inventario > repeticiones) {
                                                    const query1 = 'UPDATE cseie SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cseiv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csei');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                                else if (existencia[0][0].inventario === repeticiones) {
                                                    const query1 = 'UPDATE cseie SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                                                    const existencia1 = database_1.default.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId]);
                                                    console.log(venta);
                                                    const query = 'INSERT INTO cseiv SET ?';
                                                    const venta1 = database_1.default.promise().query(query, [venta])
                                                        .then(venta1 => {
                                                        console.log('todo bien csei');
                                                    })
                                                        .catch(err => console.log(err));
                                                }
                                            }
                                        })
                                            .catch(err => console.log(err));
                                    }));
                                }
                                res.status(200).json({ message: 'Orden realizada con exito', id: factura_id });
                            }
                            else if (resultFinal === false) {
                                res.status(500).json({ message: '404' });
                            }
                        }), 1200);
                        // Crear una promesa que se resuelva cuando se completen todas las operaciones de push en el arreglo
                        // Esperar a que se resuelva la promesa antes de hacer el console.log de resultA
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
        };
    }
    obtenerIdRepeticiones(diccionario) {
        // Usa la función map() para generar una lista de tuplas.
        return Object.entries(diccionario).map(([id, repeticiones]) => [id, repeticiones]);
    }
    contarRepeticiones(arrays) {
        const resultados = {};
        for (const item of arrays) {
            const id = item.id;
            if (!resultados[id]) {
                resultados[id] = 0;
            }
            resultados[id]++;
        }
        return resultados;
    }
    index(req, res) {
        res.json({ text: 'API is ready' });
    }
}
exports.ventasController = new VentasController();
