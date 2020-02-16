import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { NavController } from '@ionic/angular';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Condominio, CondominioDatabaseService } from './../../services/db-services/condominio-database.service';
import { map } from 'rxjs/internal/operators/map';


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
    type: 'sindico',
    notes: '',
    token: 'notoken',
    condominio: '',
    date: "no date"
  };

  condominio: Condominio = {
    name: '',
    code: '',
  }

   users: Observable<User[]>;
   code: string = '';
   condominioIsTrue: boolean = false;
   condominios: Observable<Condominio[]>;

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
    private toastCtrl: ToastController,
    private condominiodatabaseservice: CondominioDatabaseService,
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

  checkCode() {

    console.log("checkCode");
    console.log(this.code);


    this.condominios = this.condominiodatabaseservice.getCondominiosByCode(this.code);

    this.condominios.pipe(
      map(actions => {
        actions.map(a => {
          console.log("inside Pipe")
          this.condominio.code = a.code;
          this.condominio.name = a.name;
          this.user.condominio = a.name;
          if(this.user.condominio != ''){
            this.condominioIsTrue = true;
          }
          const id = '1';
        });
      })).subscribe((val) => {
        console.log("subscribe")
      }, (error) => {
        console.log('Error: ', error);
      });



  }

  saveOnDB(value) {
    /** It would be better to do the same thing you're doing for the email to name and apt! */
    this.user.email = this.validations_form.controls['email'].value
    this.userdatabaseservice.addUser(this.user).then(() => {
      this.showToast('Criação de usuário concluida');
    }, err => {
      this.showToast('ERRO: POR FAVOR ENTRE EM CONTATO COM O SINDÍCO');
    });
    this.tryRegister(value);

  }

  tryRegister(value) {
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

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}