"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const databaseproduct_1 = __importDefault(require("../databaseproduct"));
class AuthenticationContoller {
    signin(req, res, next) {
        passport_1.default.authenticate('local.signin', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'Error en el servidor' });
            }
            if (!user) {
                return res.status(401).json({ message: info.message }); // Envía el mensaje de error personalizado
            }
            // Si la autenticación es exitosa, generas el token y lo envías
            const userData = { id: user.id, username: user.username, fullname: user.fullname, caja: user.numero_caja, sub: user.id, sucursal: user.sucursal_id, adminId: user.adminId, lang: user.lang, password: user.password };
            const token = jsonwebtoken_1.default.sign(userData, 'secreto-seguro');
            res.status(200).json({ token: token });
        })(req, res, next); // Llamada a passport.authenticate
    }
    signin1(req, res) {
    }
    signup(req, res, next) {
        passport_1.default.authenticate('local.signup', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'Error en el servidor' });
            }
            if (!user) {
                return res.status(401).json({ message: info.message }); // Envía el mensaje de error personalizado
            }
            // Si la autenticación es exitosa, generas el token y lo envías
            const userData = { id: user.id, username: user.username, fullname: user.fullname };
            const token = jsonwebtoken_1.default.sign(userData, 'secreto-seguro', { expiresIn: '1h' });
            res.status(200).json({ token: token });
        })(req, res, next); // Llamada a passport.authenticate
    }
    profile(req, res) {
        if (req.headers['authorization'] === undefined) {
            res.status(200).json({ message: 'Unauthorized' });
        }
        else {
            const token = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
            if (!tokenWithoutBearer) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
            if (!decodedToken) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            const userProfile = decodedToken; // Esto debería contener los datos del usuario del token
            res.json(userProfile);
        }
    }
    changeLanguage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined) {
                res.status(405).json({ message: 'Unauthorized' });
            }
            else {
                const token = req.headers['authorization'];
                const tokenWithoutBearer = token.replace('Bearer ', '');
                if (!tokenWithoutBearer) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                try {
                    const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
                    console.log(decodedToken);
                    if (!decodedToken) {
                        res.status(401).json({ message: 'Invalid token' });
                    }
                    else {
                        const username = decodedToken.username;
                        const password = decodedToken.password;
                        const newLang = req.body.newLang;
                        const rows = yield databaseproduct_1.default.promise().query('SELECT * FROM caja_usuarios WHERE username = ?', [username.trim()])
                            .then(rows => rows)
                            .catch(err => console.log(err));
                        if (rows[0][0] !== undefined && rows.length > 0) {
                            const user = rows[0][0];
                            console.log(user.password);
                            console.log(decodedToken.password);
                            if (user.password === decodedToken.password) {
                                yield databaseproduct_1.default.promise().query('UPDATE caja_usuarios SET lang = ? WHERE username = ?', [newLang.trim(), username.trim()])
                                    .then(() => {
                                    const userData = { id: user.id, username: user.username, fullname: user.fullname, caja: user.numero_caja, sub: user.id, sucursal: user.sucursal_id, adminId: user.adminId, lang: newLang, password: user.password };
                                    const newToken = jsonwebtoken_1.default.sign(userData, 'secreto-seguro');
                                    res.status(200).json({ message: 'Language change successfully', token: newToken });
                                })
                                    .catch(err => {
                                    res.status(500).json({ message: '406' });
                                    console.log(err);
                                });
                            }
                            else {
                                res.status(500).json({ message: '405' });
                            }
                        }
                    }
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                        res.status(401).json({ message: 'Token expired' });
                    }
                    else {
                        console.log(error);
                        res.status(401).json({ message: 'Unknown Error' });
                    }
                }
            }
        });
    }
    logout(req, res) {
        req.logOut; // Esta función de Passport.js eliminará la sesión del usuario
        res.send('logout');
    }
}
const authenticationController = new AuthenticationContoller();
exports.default = authenticationController;
