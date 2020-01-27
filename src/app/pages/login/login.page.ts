import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userEmail: string = '';
  userToken: string = '';

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(

    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController

  ) { }

  ngOnInit() {


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

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();


    loading.dismiss();



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


  loginUser(value) {

    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.router.navigateByUrl('/app');
      }, err => {
        this.errorMessage = "Por favor verifique se o email e a senha estão digitados corretamente! (" + err.code + ")";

      })
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

}