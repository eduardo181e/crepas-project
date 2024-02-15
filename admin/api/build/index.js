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
require("./database");
require("./databaseuser");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const crepaSaladaRoutes_1 = __importDefault(require("./routes/productsRoutes/CrepaSalada/crepaSaladaRoutes"));
const crepaDulceRoutes_1 = __importDefault(require("./routes/productsRoutes/CrepaDulce/crepaDulceRoutes"));
const waflesRoutes_1 = __importDefault(require("./routes/productsRoutes/Wafles/waflesRoutes"));
const bebidasFriasRoutes_1 = __importDefault(require("./routes/productsRoutes/BebidasFrias/bebidasFriasRoutes"));
const bebidasCalientesRoutes_1 = __importDefault(require("./routes/productsRoutes/BebidasCalientes/bebidasCalientesRoutes"));
const authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
const usuarioscajaRoutes_1 = __importDefault(require("./routes/usuarioscajaRoutes"));
const facturasCajaRoutes_1 = __importDefault(require("./routes/facturasRoutes/facturasCajaRoutes"));
const usuariosEccomerRoutes_1 = __importDefault(require("./routes/usuariosEccomerRoutes"));
const sucursalesRoutes_1 = __importDefault(require("./routes/sucursalesRoutes"));
const waffleCanastaRotes_1 = __importDefault(require("./routes/productsRoutes/wafflesCanasta/waffleCanastaRotes"));
// Stock
const bebidasCalientesRoutes_2 = __importDefault(require("./routes/stockRoutes/bebidasCalientesRoutes/bebidasCalientesRoutes"));
const bebidasFriasRoutes_2 = __importDefault(require("./routes/stockRoutes/bebidasFriasRoutes/bebidasFriasRoutes"));
const wafflesRoutes_1 = __importDefault(require("./routes/stockRoutes/waffleRoutes/wafflesRoutes"));
const waffleCanastaRoutes_1 = __importDefault(require("./routes/stockRoutes/waffleCanastaRoutes/waffleCanastaRoutes"));
const crepaDulceRoutes_2 = __importDefault(require("./routes/stockRoutes/crepaDulceRoutes/crepaDulceRoutes"));
const crepaSaladaRoutes_2 = __importDefault(require("./routes/stockRoutes/crepaSaladaRoutes/crepaSaladaRoutes"));
// Sales
const bebidasCalientesRoutes_3 = __importDefault(require("./routes/salesRoutes/bebidasCalientesRoutes/bebidasCalientesRoutes"));
const bebidasFriasRoutes_3 = __importDefault(require("./routes/salesRoutes/bebidasFriasRoutes/bebidasFriasRoutes"));
const wafflesRoutes_2 = __importDefault(require("./routes/salesRoutes/waffleRoutes/wafflesRoutes"));
const waffleCanastaRoutes_2 = __importDefault(require("./routes/salesRoutes/waffleCanastaRoutes/waffleCanastaRoutes"));
const crepaDulceRoutes_3 = __importDefault(require("./routes/salesRoutes/crepaDulceRoutes/crepaDulceRoutes"));
const crepaSaladaRoutes_3 = __importDefault(require("./routes/salesRoutes/crepaSaladaRoutes/crepaSaladaRoutes"));
// Sales Global
const bebidasCalientesRoutes_4 = __importDefault(require("./routes/salesGlobalRoutes/bebidasCalientesRoutes/bebidasCalientesRoutes"));
const bebidasFriasRoutes_4 = __importDefault(require("./routes/salesGlobalRoutes/bebidasFriasRoutes/bebidasFriasRoutes"));
const wafflesRoutes_3 = __importDefault(require("./routes/salesGlobalRoutes/waffleRoutes/wafflesRoutes"));
const waffleCanastaRoutes_3 = __importDefault(require("./routes/salesGlobalRoutes/waffleCanastaRoutes/waffleCanastaRoutes"));
const crepaDulceRoutes_4 = __importDefault(require("./routes/salesGlobalRoutes/crepaDulceRoutes/crepaDulceRoutes"));
const crepaSaladaRoutes_4 = __importDefault(require("./routes/salesGlobalRoutes/crepaSaladaRoutes/crepaSaladaRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200',
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
        // Adminisrtracion global de ventas
        this.app.use('/salesGlobal/bebidasCalientes', bebidasCalientesRoutes_4.default);
        this.app.use('/salesGlobal/bebidasFrias', bebidasFriasRoutes_4.default);
        this.app.use('/salesGlobal/waffles', wafflesRoutes_3.default);
        this.app.use('/salesGlobal/waffleCanasta', waffleCanastaRoutes_3.default);
        this.app.use('/salesGlobal/crepaDulce', crepaDulceRoutes_4.default);
        this.app.use('/salesGlobal/crepaSalada', crepaSaladaRoutes_4.default);
        // Administracion de facturas
        this.app.use('/FacturasCaja', facturasCajaRoutes_1.default);
        // Administracion de stock
        this.app.use('/stock/bebidasCalientes', bebidasCalientesRoutes_2.default);
        this.app.use('/stock/bebidasFrias', bebidasFriasRoutes_2.default);
        this.app.use('/stock/waffles', wafflesRoutes_1.default);
        this.app.use('/stock/waffleCanasta', waffleCanastaRoutes_1.default);
        this.app.use('/stock/crepaDulce', crepaDulceRoutes_2.default);
        this.app.use('/stock/crepaSalada', crepaSaladaRoutes_2.default);
        // Administracion de ventas
        this.app.use('/sales/bebidasCalientes', bebidasCalientesRoutes_3.default);
        this.app.use('/sales/bebidasFrias', bebidasFriasRoutes_3.default);
        this.app.use('/sales/waffles', wafflesRoutes_2.default);
        this.app.use('/sales/waffleCanasta', waffleCanastaRoutes_2.default);
        this.app.use('/sales/crepaDulce', crepaDulceRoutes_3.default);
        this.app.use('/sales/crepaSalada', crepaSaladaRoutes_3.default);
        // Administracion de sucursales
        this.app.use('/sucursales', sucursalesRoutes_1.default);
        // Administraion de usuarios
        this.app.use('/eccomer', usuariosEccomerRoutes_1.default);
        this.app.use('/caja', usuarioscajaRoutes_1.default);
        // Administracion de productos
        this.app.use('/authentication', authenticationRoutes_1.default);
        this.app.use('/waffleCanasta', waffleCanastaRotes_1.default);
        this.app.use('/bebidasCalientes', bebidasCalientesRoutes_1.default);
        this.app.use('/bebidasFrias', bebidasFriasRoutes_1.default);
        this.app.use('/wafle', waflesRoutes_1.default);
        this.app.use('/crepaDulce', crepaDulceRoutes_1.default);
        this.app.use('/crepaSalada', crepaSaladaRoutes_1.default);
        this.app.use('/', indexRoutes_1.default);
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
