import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
 
  constructor(
 
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
 
  ) { }
 
  ngOnInit() {
/** If credentials are present navigate directly to the app, 
 * the details page will populate itself automactically */

 /** If credentials are not present navigate to login page, and when the user login for the first time
 * we will create the credentials, if the user is not in db, we will route to the firstacess page
 */
    this.router.navigateByUrl('/app');
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
 
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Por favor informe o email!' },
      { type: 'pattern', message: 'Por favor informe um email válido!' }
    ],
    'password': [
      { type: 'required', message: 'Por favor informe a senha!' },
      { type: 'minlength', message: 'A senha deve ter pelo menos 6 caracteres!' }
    ]
  };
 
 
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.router.navigateByUrl('/app');
    }, err => {
      this.errorMessage = err.message;
    })
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }
 
}