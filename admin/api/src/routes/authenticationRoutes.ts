import { Router } from 'express';
import passport from 'passport';


import authenticationController from '../controllers/authenticationController';



class AuthenticationRoutes {

    public router: Router = Router();

    constructor() {
        this.config(); 
    }

    config(): void {
        this.router.get('/signin',  authenticationController.signin);
        this.router.post('/signup',  authenticationController.signup)
        this.router.get('/profile',  authenticationController.profile);
        this.router.post('/signin', authenticationController.signin)
        this.router.get('/logout',  authenticationController.logout)
        this.router.post('/changePassword',  authenticationController.changePassword)
        this.router.post('/changeUsername',  authenticationController.changeUsername)
        this.router.post('/changeLang',  authenticationController.changeLanguage)
    }
}

const indexRoutes = new AuthenticationRoutes();
export default indexRoutes.router;