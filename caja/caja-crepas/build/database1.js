"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const keysproducts_1 = __importDefault(require("./keysproducts"));
const pool = mysql2_1.default.createPool(keysproducts_1.default.database);
pool.getConnection(function (err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('DB is connected');
});
exports.default = pool;
