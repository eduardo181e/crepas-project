"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationController_1 = __importDefault(require("../controllers/authenticationController"));
class AuthenticationRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/signin', authenticationController_1.default.signin);
        this.router.post('/signup', authenticationController_1.default.signup);
        this.router.get('/profile', authenticationController_1.default.profile);
        this.router.post('/signin', authenticationController_1.default.signin);
        this.router.get('/logout', authenticationController_1.default.logout);
        this.router.post('/changeLang', authenticationController_1.default.changeLanguage);
    }
}
const indexRoutes = new AuthenticationRoutes();
exports.default = indexRoutes.router;
