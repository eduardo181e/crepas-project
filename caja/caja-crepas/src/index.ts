import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './lib/passport';
import  dotenv from "dotenv";

dotenv.config();

import './databaseproduct'
import'./database';
import indexRoutes from './routes/indexRoutes';
import authenticationRoutes from './routes/authenticationRoutes';
import bebidasCalientesRoutes from './routes/productsRoutes/BebidasCalientes/bebidasCalientesRoutes';
import bebidasFriasRoutes from './routes/productsRoutes/BebidasFrias/bebidasFriasRoutes';
import waflesRoutes from './routes/productsRoutes/Wafles/waflesRoutes';
import crepaDulceRoutes from './routes/productsRoutes/CrepaDulce/crepaDulceRoutes';
import crepaSaladaRoutes from './routes/productsRoutes/CrepaSalada/crepaSaladaRoutes';
import carritoRoutes from './routes/carritoRoutes';
import waffleCanastaRotes from './routes/wafflesCanasta/waffleCanastaRotes';
import ventasRoutes from './routes/ventasRoutes';
declare module 'express-session' {
    interface SessionData {
      user: any; // Puedes utilizar un tipo más específico para el usuario
    }
  }

// Ahora puedes acceder a process.env.TZ
console.log(process.env.TZ); // Debería imprimir 'America/Mexico_City'
class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {

        this.app.set('port', 3001);
        this.app.use(morgan('dev'));
        this.app.use(cors(
            {
                origin: 'http://192.168.0.9:8080',
                credentials: true
            }
        ));
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
        this.app.use('/ventas', ventasRoutes);
        this.app.use('/carrito', carritoRoutes );
        this.app.use('/auth', authenticationRoutes );
        this.app.use('/', indexRoutes );
        this.app.use('/bebidasCalientes', bebidasCalientesRoutes)
        this.app.use('/bebidasFrias', bebidasFriasRoutes)
        this.app.use('/wafle', waflesRoutes)
        this.app.use('/crepaDulce', crepaDulceRoutes)
        this.app.use('/crepaSalada', crepaSaladaRoutes);
        this.app.use('/waffleCanasta', waffleCanastaRotes)
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