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
const databaseproduct_1 = __importDefault(require("../databaseproduct"));
const helpers_1 = __importDefault(require("./helpers"));
let user1;
passport_1.default.use('local.signin', new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    let username1 = username.trim();
    let password1 = password.trim();
    const rows = yield databaseproduct_1.default.promise().query('SELECT * FROM caja_usuarios WHERE username = ?', [username1])
        .then(rows => rows)
        .catch(err => console.log(err));
    if (rows[0][0] !== undefined && rows.length > 0) {
        const user = rows[0][0];
        const validPassword = yield helpers_1.default.matchPassword(password1, user.password);
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
            return done(null, false, { message: 'Contraseña Incorrecta' });
        }
    }
    else if (rows[0][0] === undefined) {
        console.log('The username does not exist');
        return done(null, false, { message: 'El usuario no existe' });
    }
})));
exports.default = user1;
passport_1.default.use('local.signup', new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname } = req.body;
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = yield databaseproduct_1.default.promise().query('SELECT * FROM caja_usuarios WHERE username = ?', [username])
        .then(rows => rows)
        .catch(err => console.log(err));
    if (existingUser[0][0]) {
        console.log(existingUser[0][0]);
        return done(null, false, { message: 'El usuario ya existe. Por favor, elige otro nombre de usuario.' });
    }
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = yield helpers_1.default.encryptPassword(password);
    const result = yield databaseproduct_1.default.promise().query('INSERT INTO caja_usuarios SET ?', [newUser])
        .then(result => result)
        .catch(err => console.log(err));
    newUser.id = result[0].insertId;
    return done(null, newUser);
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield databaseproduct_1.default.promise().query('SELECT * FROM caja_usuarios WHERE id = ?', [user.id])
        .then(rows => rows)
        .catch(err => console.log(err));
    done(null, rows[0]);
}));
