"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require("./lib/passport");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./databaseproduct");
require("./database");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
const bebidasCalientesRoutes_1 = __importDefault(require("./routes/productsRoutes/BebidasCalientes/bebidasCalientesRoutes"));
const bebidasFriasRoutes_1 = __importDefault(require("./routes/productsRoutes/BebidasFrias/bebidasFriasRoutes"));
const waflesRoutes_1 = __importDefault(require("./routes/productsRoutes/Wafles/waflesRoutes"));
const crepaDulceRoutes_1 = __importDefault(require("./routes/productsRoutes/CrepaDulce/crepaDulceRoutes"));
const crepaSaladaRoutes_1 = __importDefault(require("./routes/productsRoutes/CrepaSalada/crepaSaladaRoutes"));
const carritoRoutes_1 = __importDefault(require("./routes/carritoRoutes"));
const waffleCanastaRotes_1 = __importDefault(require("./routes/wafflesCanasta/waffleCanastaRotes"));
const ventasRoutes_1 = __importDefault(require("./routes/ventasRoutes"));
// Ahora puedes acceder a process.env.TZ
console.log(process.env.TZ); // Debería imprimir 'America/Mexico_City'
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', 3001);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)({
            origin: 'http://192.168.0.9:8080',
            credentials: true
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, express_session_1.default)({
            secret: 'mysecret',
            resave: false,
            saveUninitialized: false,
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    routes() {
        this.app.use('/ventas', ventasRoutes_1.default);
        this.app.use('/carrito', carritoRoutes_1.default);
        this.app.use('/auth', authenticationRoutes_1.default);
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/bebidasCalientes', bebidasCalientesRoutes_1.default);
        this.app.use('/bebidasFrias', bebidasFriasRoutes_1.default);
        this.app.use('/wafle', waflesRoutes_1.default);
        this.app.use('/crepaDulce', crepaDulceRoutes_1.default);
        this.app.use('/crepaSalada', crepaSaladaRoutes_1.default);
        this.app.use('/waffleCanasta', waffleCanastaRotes_1.default);
    }
    start() {
        const puertoDeseado = this.app.get('port');
        const servidor = this.app.listen(puertoDeseado, () => {
            console.log('Server on port', puertoDeseado);
        });
        servidor.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                // El puerto está en uso, intentar con un puerto diferente
                const puertoAlternativo = puertoDeseado + 1;
                console.log(`El puerto ${puertoDeseado} está en uso. Intentando con el puerto ${puertoAlternativo}`);
                this.app.set('port', puertoAlternativo);
                // Volver a intentar iniciar el servidor
                this.start();
            }
            else {
                console.error('Error al iniciar el servidor:', err);
            }
        });
    }
}
const server = new Server();
server.start();
