import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { NavController } from '@ionic/angular';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {

    name: '',
    email: '',
    apt: '',
    garage: '',
    type: 'morador',
    notes: '',
  };

  private users: Observable<User[]>;

 
 
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   'email': [
     { type: 'required', message: 'Por favor escreva um email.' },
     { type: 'pattern', message: 'Por favor coloque um email válido.' }
   ],
   'password': [
     { type: 'required', message: 'Por favor escreva a senha.' },
     { type: 'minlength', message: 'A senha deve ter pelo menos 5 caracteres.' }
   ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private userdatabaseservice: UserDatabaseService,
    private toastCtrl: ToastController
  ) {}
 
  ngOnInit(){
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

  saveOnDB(value){
    this.user.email = this.validations_form.controls['email'].value
    this.userdatabaseservice.addUser(this.user).then(() => {
      this.showToast('Criação de usuário concluida');
    }, err => {
      this.showToast('ERRO: POR FAVOR ENTRE EM CONTATO COM O SINDÍCO');
    });
    this.tryRegister(value);

  }
 
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
 
}