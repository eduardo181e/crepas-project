import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { SigninAdminService } from 'src/app/services/signin-admin.service';
import { TranslateService } from 'src/app/translate/translate.service';
@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.css']
})
export class AccountConfigComponent {
  constructor(private signinAdminService: SigninAdminService, private router: Router, private alertService: AlertDialogService, private translateService: TranslateService) { }
  token:any
  username:any
  fullname:any
  password:any
  lang:any


  ngOnInit(){
    this.token = localStorage.getItem('token');
    const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
    const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
   console.log(tokenData)
    // Accede a los datos del usuario
    const userData = {
      fullname: decodedTokenData.fullname,
      username: decodedTokenData.username,
      id: decodedTokenData.id,
      lang: decodedTokenData.lang,
      password: decodedTokenData.password
      // Agrega otros datos del usuario si los necesitas
    };
    this.username = userData.username;
    this.lang = userData.lang;
    this.password = userData.password;
    this.fullname = userData.fullname;
    console.log(userData)
  }

  redirectUpdatePass(){
    this.router.navigate(['changePassword'])
  }

  updateUsuario(){
    this.signinAdminService.changeUsername(this.username, this.fullname).subscribe(
      (res: any) => {
        if(this.lang === 'es'){
          this.alertService.mostrarAlerta('Usuario actualizado correctamente');
        }
        else{
          this.alertService.mostrarAlerta('User updated correctly');
        }
        
        this.token = res.token;
        const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
        const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
       console.log(tokenData)
        // Accede a los datos del usuario
        const userData = {
          fullname: decodedTokenData.fullname,
          username: decodedTokenData.username,
          id: decodedTokenData.id,
          lang: decodedTokenData.lang,
          password: decodedTokenData.password
          // Agrega otros datos del usuario si los necesitas
        };
        this.username = userData.username;
        this.lang = userData.lang;
        this.password = userData.password;
        this.fullname = userData.fullname;
        console.log(userData)
        
      },
      err => {
        if(err.error.message === 'Token expired'){
          this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
          this.router.navigate(['admin']);
        }else {
          this.alertService.mostrarAlerta(err.error.message);
        }
      }
      )
  }
  changeLanguage(){
    this.signinAdminService.changelang(this.lang).subscribe(
      (res: any) => {
        this.token = res.token;
        const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
        const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
       console.log(tokenData)
        // Accede a los datos del usuario
        const userData = {
          fullname: decodedTokenData.fullname,
          username: decodedTokenData.username,
          id: decodedTokenData.id,
          lang: decodedTokenData.lang,
          password: decodedTokenData.password
          // Agrega otros datos del usuario si los necesitas
        };
        this.lang = userData.lang;
        console.log(userData)
        this.changeLanguage1(userData.lang)
        
      },
      err => {
        console.log(err)
        if(err.error.message === 'Token expired'){
          this.token = localStorage.getItem('token');
          const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
          const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
        
          // Accede a los datos del usuario
          const userData = {
            fullname: decodedTokenData.fullname,
            username: decodedTokenData.username,
            id: decodedTokenData.id,
            lang: decodedTokenData.lang
            // Agrega otros datos del usuario si los necesitas
          };
          
          console.log(userData)
          if(userData.lang === 'es'){
          this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
          }else if(userData.lang === 'en'){
            this.alertService.mostrarAlerta('Your session has expired, log in again');
          }
          this.router.navigate(['admin']);
        }else { 
          this.token = localStorage.getItem('token');
          const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
          const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
        
          // Accede a los datos del usuario
          const userData = {
            fullname: decodedTokenData.fullname,
            username: decodedTokenData.username,
            id: decodedTokenData.id,
            lang: decodedTokenData.lang
            // Agrega otros datos del usuario si los necesitas
          };
          
          console.log(userData)
          if(userData.lang === 'es'){
          if(err.error.message === '406'){
            this.alertService.mostrarAlerta('Token inválido');
          }else if (err.error.message === '405'){
            this.alertService.mostrarAlerta('Token inválido');
          }
        }else if(userData.lang === 'en'){
          if(err.error.message === '406'){
            this.alertService.mostrarAlerta('Invalid token');
          }else if (err.error.message === '405'){
            this.alertService.mostrarAlerta('Token inválido');
          }
        }
        }
      }
    )

  }
  async changeLanguage1(language: string) {
    await this.translateService.getData('assets/i18n/', language);
  }
}
