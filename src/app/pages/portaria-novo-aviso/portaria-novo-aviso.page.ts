import { Component, OnInit } from '@angular/core';
import { Portaria, PortariaDatabaseService } from 'src/app/services/db-services/portaria-database.service';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalDatabaseService } from './../../services/local/local-database.service';

@Component({
  selector: 'app-portaria-novo-aviso',
  templateUrl: './portaria-novo-aviso.page.html',
  styleUrls: ['./portaria-novo-aviso.page.scss'],
})
export class PortariaNovoAvisoPage implements OnInit {

  user: User = {
    name: '',
    email: '',
    apt: '',
    garage: '',
    type: 'morador',
    notes: '',
    token: 'notoken',
    condominio: '',
    date: "no date"
  };
   users: Observable<User[]>;
   userslist: Observable<User[]>;
   portarias: Observable<Portaria[]>;


  portaria: Portaria = {
    apt: "",
    content: "Encomenda",
    email: "",
    notes: "",
    custom: false,
    confirmed: 'false',
    confirmed2: 'false',
    token: 'notoken',
    condominio: '',
    date: "no date"
  }

  portaria2: Portaria = {
    apt: "",
    content: "Encomenda",
    email: "",
    notes: "",
    custom: false,
    confirmed: 'false',
    confirmed2: 'false',
    token: 'notoken',
    condominio: '',
    date: "no date"
  }
  custom: boolean = false;

  constructor(private toastCtrl: ToastController,
    private portariaDatabaseService: PortariaDatabaseService,
    private userDatabaseService: UserDatabaseService,
    public modalController: ModalController,
    private router: Router,
    private loadingController: LoadingController,
    private localDatabaseService: LocalDatabaseService, ) { }

  ngOnInit() {
    console.log(this.custom);
    this.user.condominio = this.localDatabaseService.getCurrentCondominio();
    this.portaria.condominio = this.localDatabaseService.getCurrentCondominio();
    this.userslist = this.userDatabaseService.getAllUsersOfCondominio(this.user.condominio);

    this.portarias = this.portariaDatabaseService.getLastPortarias();

    this.portarias.pipe(
      map(actions => {
        actions.map(a => {
          console.log("inside Pipe");
          console.log(a.apt);

          this.portaria.apt = a.apt;
          this.user.apt = a.apt;
          const id = '1';
        });
      })).subscribe((val) => {
        console.log("subscribe")
      }, (error) => {
        console.log('Error: ', error);
      });


  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();


    loading.dismiss();



  }


  async createAviso() {

    const loading = await this.loadingController.create({
      message: 'Criando aviso..'
    });
    await loading.present();


    this.users = this.userDatabaseService.getUsersByApt(this.portaria.apt, this.user.condominio);
    console.log("Check Pipe");
    this.users.pipe(
      map(actions => {
        actions.map(a => {
          console.log("inside Pipe")
          this.portaria.email = a.email;
          this.portaria.token = a.token;
          const id = '1';
          this.portariaDatabaseService.addPortaria(this.portaria).then(() => {
            console.log("finish Pipe")

            this.showToast('Aviso Criado com sucesso!');


            loading.dismiss();
            // this.router.navigateByUrl('/app/portaria');
          }, err => {
            this.showToast('Ocorreu um erro (portaria-novo-aviso.page.ts) :(');
          });
        });
      })).subscribe((val) => {
        console.log("subscribe")
      }, (error) => {
        console.log('Error: ', error);
      });

  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      keyboardClose: true,
      color: "primary",
      showCloseButton: true,
      closeButtonText: "Fechar"
    }).then(toast => toast.present());
  }

  clearContent(){
    if (this.portaria.content == ""){
      this.portaria.content = "Encomenda";
    }
    else{
      this.portaria.content = "";
    }
  }

  // async presentModal() {

  //   this.users = this.userDatabaseService.getUsersByApt(this.portaria.apt);


  //   const modal = await this.modalController.create({
  //     component: PortariaConfirmationPage,
  //     componentProps: {
  //       'portaria': this.portaria,
  //       'user': this.users,
  //       'apt': this.portaria.apt
  //     }
  //   });
  //   return await modal.present();
  // }


}
