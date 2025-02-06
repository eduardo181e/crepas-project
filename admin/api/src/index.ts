import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './lib/passport';

import'./database';
import './databaseuser'
import indexRoutes from './routes/indexRoutes';
import crepaSaladaRoutes from './routes/productsRoutes/CrepaSalada/crepaSaladaRoutes';
import crepaDulceRoutes from './routes/productsRoutes/CrepaDulce/crepaDulceRoutes';
import waflesRoutes from './routes/productsRoutes/Wafles/waflesRoutes';
import BebidasFriasRoutes from './routes/productsRoutes/BebidasFrias/bebidasFriasRoutes';
import bebidasCalientesRoutes from './routes/productsRoutes/BebidasCalientes/bebidasCalientesRoutes';
import authenticationRoutes from './routes/authenticationRoutes';
import cajaRoutes from './routes/usuarioscajaRoutes';
import facturasCajaRoutes from './routes/facturasRoutes/facturasCajaRoutes';
import eccomerRoutes from './routes/usuariosEccomerRoutes';
import sucursalesRoutes from './routes/sucursalesRoutes';
import waffleCanastaRotes from './routes/productsRoutes/wafflesCanasta/waffleCanastaRotes';
// Stock
import bebidasCalientesStockRoutes from './routes/stockRoutes/bebidasCalientesRoutes/bebidasCalientesRoutes';
import bebidasFriasStockRoutes from './routes/stockRoutes/bebidasFriasRoutes/bebidasFriasRoutes';
import wafflesStockRoutes from './routes/stockRoutes/waffleRoutes/wafflesRoutes';
import waffleCanastaStockRoutes from './routes/stockRoutes/waffleCanastaRoutes/waffleCanastaRoutes';
import crepaDulceStockRoutes from './routes/stockRoutes/crepaDulceRoutes/crepaDulceRoutes';
import crepaSaladaStockRoutes from './routes/stockRoutes/crepaSaladaRoutes/crepaSaladaRoutes';
// Sales
import bebidasCalientesSalesRoutes from './routes/salesRoutes/bebidasCalientesRoutes/bebidasCalientesRoutes';
import bebidasFriasSalesRoutes from './routes/salesRoutes/bebidasFriasRoutes/bebidasFriasRoutes';
import wafflesSalesRoutes from './routes/salesRoutes/waffleRoutes/wafflesRoutes';
import waffleCanastaSalesRoutes from './routes/salesRoutes/waffleCanastaRoutes/waffleCanastaRoutes';
import crepaDulceSalesRoutes from './routes/salesRoutes/crepaDulceRoutes/crepaDulceRoutes';
import crepaSaladaSalesRoutes from './routes/salesRoutes/crepaSaladaRoutes/crepaSaladaRoutes';

// Sales Global
import bebidasCalientesGlobalSalesRoutes from './routes/salesGlobalRoutes/bebidasCalientesRoutes/bebidasCalientesRoutes';
import bebidasFriasGlobalSalesRoutes from './routes/salesGlobalRoutes/bebidasFriasRoutes/bebidasFriasRoutes';
import wafflesGlobalSalesRoutes from './routes/salesGlobalRoutes/waffleRoutes/wafflesRoutes';
import waffleCanastaGlobalSalesRoutes from './routes/salesGlobalRoutes/waffleCanastaRoutes/waffleCanastaRoutes';
import crepaDulceGlobalSalesRoutes from './routes/salesGlobalRoutes/crepaDulceRoutes/crepaDulceRoutes';
import crepaSaladaGlobalSalesRoutes from './routes/salesGlobalRoutes/crepaSaladaRoutes/crepaSaladaRoutes';
declare module 'express-session' {
    interface SessionData {
      user: any; // Puedes utilizar un tipo más específico para el usuario
    }
  }


class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {

        this.app.set('port', 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors(            {
          origin: 'http://localhost:4200',
          credentials: true
      }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false}));
        this.app.use(
            session({
              secret: 'mysecret',
              resave: false,
              saveUninitialized: false,
            })
          );        
        this.app.use(passport.initialize());
        this.app.use(passport.session());        

    }

    routes(): void {
        // Adminisrtracion global de ventas
        this.app.use('/salesGlobal/bebidasCalientes', bebidasCalientesGlobalSalesRoutes);
        this.app.use('/salesGlobal/bebidasFrias', bebidasFriasGlobalSalesRoutes);
        this.app.use('/salesGlobal/waffles', wafflesGlobalSalesRoutes);
        this.app.use('/salesGlobal/waffleCanasta', waffleCanastaGlobalSalesRoutes);
        this.app.use('/salesGlobal/crepaDulce', crepaDulceGlobalSalesRoutes);
        this.app.use('/salesGlobal/crepaSalada', crepaSaladaGlobalSalesRoutes);
        // Administracion de facturas
        this.app.use('/FacturasCaja', facturasCajaRoutes);
        // Administracion de stock
        this.app.use('/stock/bebidasCalientes', bebidasCalientesStockRoutes);
        this.app.use('/stock/bebidasFrias', bebidasFriasStockRoutes);
        this.app.use('/stock/waffles', wafflesStockRoutes);
        this.app.use('/stock/waffleCanasta', waffleCanastaStockRoutes);
        this.app.use('/stock/crepaDulce', crepaDulceStockRoutes);
        this.app.use('/stock/crepaSalada', crepaSaladaStockRoutes);
        // Administracion de ventas
        this.app.use('/sales/bebidasCalientes', bebidasCalientesSalesRoutes);
        this.app.use('/sales/bebidasFrias', bebidasFriasSalesRoutes);
        this.app.use('/sales/waffles', wafflesSalesRoutes);
        this.app.use('/sales/waffleCanasta', waffleCanastaSalesRoutes);
        this.app.use('/sales/crepaDulce', crepaDulceSalesRoutes);
        this.app.use('/sales/crepaSalada', crepaSaladaSalesRoutes);
        // Administracion de sucursales
        this.app.use('/sucursales', sucursalesRoutes)
        // Administraion de usuarios
        this.app.use('/eccomer', eccomerRoutes);
        this.app.use('/caja', cajaRoutes);
        // Administracion de productos
        this.app.use('/authentication', authenticationRoutes)
        this.app.use('/waffleCanasta', waffleCanastaRotes)
        this.app.use('/bebidasCalientes', bebidasCalientesRoutes)
        this.app.use('/bebidasFrias', BebidasFriasRoutes)
        this.app.use('/wafle', waflesRoutes)
        this.app.use('/crepaDulce', crepaDulceRoutes)
        this.app.use('/crepaSalada', crepaSaladaRoutes);
        this.app.use('/' ,indexRoutes);
    }

    start(): void {
      const puertoDeseado = this.app.get('port');
      
      const servidor = this.app.listen(puertoDeseado, () => {
          console.log('Server on port', puertoDeseado);
      });
  
      servidor.on('error', (err:any) => {
          if (err.code === 'EADDRINUSE') {
              // El puerto está en uso, intentar con un puerto diferente
              const puertoAlternativo = puertoDeseado + 1;
              console.log(`El puerto ${puertoDeseado} está en uso. Intentando con el puerto ${puertoAlternativo}`);
              this.app.set('port', puertoAlternativo);
  
              // Volver a intentar iniciar el servidor
              this.start();
          } else {
              console.error('Error al iniciar el servidor:', err);
          }
      });
  }
}

const server = new Server();

server.start();
