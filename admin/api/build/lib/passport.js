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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const database_1 = __importDefault(require("../database"));
const helpers_1 = __importDefault(require("./helpers"));
let user1;
passport_1.default.use('local.signin', new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield database_1.default.promise().query('SELECT * FROM crepas_admin WHERE username = ?', [username.trim()])
        .then(rows => rows)
        .catch(err => console.log(err));
    if (rows[0][0] !== undefined && rows.length > 0) {
        const user = rows[0][0];
        const validPassword = yield helpers_1.default.matchPassword(password.trim(), user.password);
        if (validPassword) {
            const userData = {
                id: user.id,
                username: user.username,
                fullname: user.fullname
                // Agregar otros datos del usuario que desees
            };
            const verifyOptions = {
                message: 'Welcome ' + user.username,
                user: userData
            };
            req.user = user;
            console.log('Welcome ' + user.username);
            return done(null, user);
            console.log(user);
        }
        else {
            console.log('Incorrect password');
            return done(null, false, { message: '405' });
        }
    }
    else if (rows[0][0] === undefined) {
        console.log('The username does not exist');
        return done(null, false, { message: '404' });
    }
})));
exports.default = user1;
passport_1.default.use('local.signup', new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, lang } = req.body;
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = yield database_1.default.promise().query('SELECT * FROM crepas_admin WHERE username = ?', [username])
        .then(rows => rows)
        .catch(err => console.log(err));
    if (existingUser[0][0]) {
        console.log(existingUser[0][0]);
        return done(null, false, { message: '404' });
    }
    const newUser = {
        username,
        password,
        fullname,
        lang
    };
    newUser.password = yield helpers_1.default.encryptPassword(password);
    var adminId1;
    const result = yield database_1.default.promise().query('INSERT INTO crepas_admin SET ?', [newUser])
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        const adminId = result[0].insertId;
        adminId1 = adminId;
        // Crepas dulces
        const cdUntable = [
            'Nutella',
            'Chocolate',
            'Lechera',
            'Queso Crema',
            'Crema de coco',
            'C. Cacahuate',
            'C. Batida',
            'Mermelada de Fresa',
            'M. Zarzamora',
            'M. Manzana Canela',
            'Cajeta Membrillo',
            'Miel de Maguey'
        ];
        cdUntable.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO cdiu SET ?', { ingrediente_unt: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO cdiu SET ?', { ingrediente_unt: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        cdUntable.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO wiu SET ?', { ingrediente_unt: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO wiu SET ?', { ingrediente_unt: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        cdUntable.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO wciu SET ?', { ingrediente_unt: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO wciu SET ?', { ingrediente_unt: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const cdHarinas = [
            'Fresa',
            'Vainilla',
            'Chocolate',
            'Napolitano'
        ];
        cdHarinas.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO cdth SET ?', { harina: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO cdth SET ?', { harina: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const cdComplementos = [
            {
                complemento: 'Platano',
                tipo: 'Fruta'
            },
            {
                complemento: 'Fresa',
                tipo: 'Fruta'
            },
            {
                complemento: 'Kiwi',
                tipo: 'Fruta'
            },
            {
                complemento: 'Piña',
                tipo: 'Fruta'
            },
            {
                complemento: 'Durazno',
                tipo: 'Fruta'
            },
            {
                complemento: 'Mango',
                tipo: 'Fruta'
            },
            {
                complemento: 'Cereza',
                tipo: 'Fruta'
            },
            {
                complemento: 'Nuez',
                tipo: 'Frutos Secos'
            },
            {
                complemento: 'Almendra',
                tipo: 'Frutos Secos'
            },
            {
                complemento: 'Cacahuate',
                tipo: 'Frutos Secos'
            },
            {
                complemento: 'Coco Rayado',
                tipo: 'Frutos Secos'
            },
            {
                complemento: 'Malavavisco',
                tipo: 'Otros'
            },
            {
                complemento: 'Mazapan',
                tipo: 'Otros'
            },
            {
                complemento: 'Galleta Oreo',
                tipo: 'Otros'
            },
            {
                complemento: 'Luneta Chocolate',
                tipo: 'Otros'
            },
        ];
        cdComplementos.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO cdic SET ?', { ingrediente_com: element.complemento, tipo: element.tipo, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO cdic SET ?', { ingrediente_com: element.complemento, tipo: element.tipo, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        cdComplementos.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO wic SET ?', { ingrediente_com: element.complemento, tipo: element.tipo, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO wic SET ?', { ingrediente_com: element.complemento, tipo: element.tipo, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        cdComplementos.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO wcic SET ?', { ingrediente_com: element.complemento, tipo: element.tipo, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO wcic SET ?', { ingrediente_com: element.complemento, tipo: element.tipo, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const cdNieve = [
            'Beso de Angel',
            'Fresa con Crema',
            'Platano con Almendra',
            'Pay de Queso con Zanahoria',
            'Coco con Almendras',
            'Chocolate',
            'Vainilla',
            'Nuez',
            'Cafe',
            'Oreo'
        ];
        cdNieve.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO cdn SET ?', { nieve: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO cdn SET ?', { nieve: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        cdNieve.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO wn SET ?', { nieve: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO wn SET ?', { nieve: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        cdNieve.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO wcn SET ?', { nieve: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO wcn SET ?', { nieve: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const csIP = [
            'Pollo a la plancha',
            'Bistec a a la plancha',
            'Pastor',
            'Champiñones',
            'Adobada',
            'Hawaiana',
            'Pepperoni'
        ];
        csIP.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO csip SET ?', { ingrediente_pri: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO csip SET ?', { ingrediente_pri: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const csAE = [
            'Ranch',
            'Cesar',
            'Mil Islas',
            'Italiano',
            'Blue Cheese',
            'Honey Mustard'
        ];
        csAE.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO csa SET ?', { adereso: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO csa SET ?', { adereso: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const csAB = [
            'Salsa Chilena'
        ];
        csAB.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO csab SET ?', { adereso_base: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO csab SET ?', { adereso_base: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const csIB = [
            'Jamon de Pavo',
            'Queso Gratinado'
        ];
        csIB.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO csib SET ?', { ingrediente_base: element, inventario: 1, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO csib SET ?', { ingrediente_base: element, inventario: 0, adminId: adminId })
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const cdp = [
            { descripcion: 'Regular', precio: 55 },
            { descripcion: 'Extra', precio: 5 },
            { descripcion: 'Nieve', precio: 25 },
        ];
        cdp.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO cdp SET ?', { precio: element.precio, descripcion: element.descripcion, adminId: adminId })
                .then((result) => {
            })
                .catch(err => {
            });
        }));
        const csp = [
            { descripcion: 'Ensalada', precio: 60 },
            { descripcion: 'Extra', precio: 15 },
            { descripcion: 'Regular', precio: 70 },
        ];
        csp.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO csp SET ?', { precio: element.precio, descripcion: element.descripcion, adminId: adminId })
                .then((result) => {
            })
                .catch(err => {
            });
        }));
        const wp = [
            { descripcion: 'Nieve', precio: 25 },
            { descripcion: 'Extra', precio: 5 },
            { descripcion: 'Regular', precio: 55 },
        ];
        wp.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO wp SET ?', { precio: element.precio, descripcion: element.descripcion, adminId: adminId })
                .then((result) => {
            })
                .catch(err => {
            });
        }));
        const wcp = [
            { descripcion: 'Extra', precio: 5 },
            { descripcion: 'Regular', precio: 55 },
        ];
        wcp.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO wcp SET ?', { precio: element.precio, descripcion: element.descripcion, adminId: adminId })
                .then((result) => {
            })
                .catch(err => {
            });
        }));
        const ensaladaInd = [
            {
                nombre: 'Ensalada con Bistec a la plancha',
            },
            {
                nombre: 'Ensalada con Pollo a la plancha',
            },
            {
                nombre: 'Ensalada de Carnes frias',
                descripcion: '(Jamón, pepperoni y salchicha de pavo)'
            }
        ];
        ensaladaInd.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                const Ensalada = {
                    ensalada_ind: element.nombre,
                    descripcion: element.descripcion,
                    inventario: 1,
                    adminId: adminId
                };
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO csei SET ?', [Ensalada])
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                const Ensalada = {
                    ensalada_ind: element.nombre,
                    descripcion: element.descripcion,
                    inventario: 0,
                    adminId: adminId
                };
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO csei SET ?', [Ensalada])
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const Botanas = [
            {
                nombre: 'Papas Fritas',
                precio: 25
            },
            {
                nombre: 'Dorinachos',
                precio: 40
            },
            {
                nombre: 'Nachos',
                precio: 40
            },
            {
                nombre: 'Tostitos',
                precio: 40
            },
            {
                nombre: 'Papas Fritas Preparadas',
                precio: 40
            },
        ];
        Botanas.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                const botana = {
                    botana: element.nombre,
                    precio: element.precio,
                    inventario: 1,
                    adminId: adminId
                };
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO csb SET ?', [botana])
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                const botana = {
                    botana: element.nombre,
                    precio: element.precio,
                    inventario: 0,
                    adminId: adminId
                };
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO csb SET ?', [botana])
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const bebidasCalientes = [
            {
                nombre: 'Capuchino',
                descripcion: '(Capuchino natural)',
                precio: 45
            },
            {
                nombre: 'Capuchino Sabor Vainilla',
                precio: 55
            },
            {
                nombre: 'Cafe con Leche',
                descripcion: '(Mitad leche y mitad cafe Americano)',
                precio: 40
            },
            {
                nombre: 'Cafe Cortado',
                descripcion: '(Cafe Americano con un toque de leche)',
                precio: 40
            },
            {
                nombre: 'Cafe Late',
                descripcion: '(Cafe con leche espumosa)',
                precio: 45
            },
            {
                nombre: 'Expresso Panna',
                descripcion: '(Cafe con crema batida)',
                precio: 40
            },
            {
                nombre: 'Te de Limon',
                precio: 30
            },
            {
                nombre: 'Te Latte Matcha',
                precio: 55
            },
        ];
        bebidasCalientes.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                const bebida = {
                    bebida: element.nombre,
                    descripcion: element.descripcion,
                    precio: element.precio,
                    inventario: 1,
                    adminId: adminId
                };
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO bc SET ?', [bebida])
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                const bebida = {
                    bebida: element.nombre,
                    descripcion: element.descripcion,
                    precio: element.precio,
                    inventario: 0,
                    adminId: adminId
                };
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO bc SET ?', [bebida])
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
        const bebidasFrias = [
            {
                nombre: 'Soda Italiana',
                descripcion: '(Sabor Zarzamora)',
                precio: 35
            },
            {
                nombre: 'Frappe Clásico',
                descripcion: '(Sabor Oreo)',
                precio: 45
            },
            {
                nombre: 'Frappe Especial',
                descripcion: '(Sabor Piña Colada)',
                precio: 55
            },
            {
                nombre: 'Frappe Gowrmet',
                descripcion: '(Sabor Ganzito)',
                precio: 50
            },
            {
                nombre: 'Frappe de Té',
                descripcion: '(Sabor Matcha)',
                precio: 50
            },
            {
                nombre: 'Malteada de Nieve',
                descripcion: '(Sabor Chocolate)',
                precio: 45
            },
            {
                nombre: 'Refresco Frio',
                descripcion: '(Cocacola)',
                precio: 35
            },
            {
                nombre: 'Café Frió',
                precio: 35
            },
            {
                nombre: 'Limonada Mineral',
                precio: 35
            },
        ];
        bebidasFrias.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index % 2 === 0) {
                const bebida = {
                    bebida: element.nombre,
                    descripcion: element.descripcion,
                    precio: element.precio,
                    inventario: 1,
                    adminId: adminId
                };
                // Acción para números pares
                yield database_1.default.promise().query('INSERT INTO bf SET ?', [bebida])
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
            else {
                const bebida = {
                    bebida: element.nombre,
                    descripcion: element.descripcion,
                    precio: element.precio,
                    inventario: 0,
                    adminId: adminId
                };
                // Acción para números impares
                yield database_1.default.promise().query('INSERT INTO bf SET ?', [bebida])
                    .then((result) => {
                })
                    .catch(err => {
                });
            }
        }));
    }))
        .catch(err => console.log(err));
    newUser.id = adminId1;
    return done(null, newUser);
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield database_1.default.promise().query('SELECT * FROM crepas_admin WHERE id = ?', [user.id])
        .then(rows => rows)
        .catch(err => console.log(err));
    done(null, rows[0]);
}));
