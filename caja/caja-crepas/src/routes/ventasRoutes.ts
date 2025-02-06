import { Router } from 'express';
import { ventasController } from '../controllers/ventasControle';

class VentasRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.post('/sales/:now/:mesa', ventasController.sales);
    }
}

const ventasRoutes = new VentasRoutes();
export default ventasRoutes.router;
