import { Component, OnInit } from '@angular/core';
import { Portaria, PortariaDatabaseService } from 'src/app/services/db-services/portaria-database.service';
import { ToastController, ModalController } from '@ionic/angular';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { Observable } from 'rxjs';
import { PortariaConfirmationPage } from './../../popups/portaria-confirmation/portaria-confirmation.page';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    date: "no date"
  };
  private users: Observable<User[]>;

  portaria: Portaria = {
    apt: "",
    content: "Encomenda",
    email: "",
    notes: "",
    custom: false,
    date: "no date"
  }
  custom: boolean = false;

  constructor(private toastCtrl: ToastController,
    private portariaDatabaseService: PortariaDatabaseService,
    private userDatabaseService: UserDatabaseService,
    public modalController: ModalController,
    private router: Router, ) { }

  ngOnInit() {
    console.log(this.custom);
  }

  createAviso() {

    this.users = this.userDatabaseService.getUsersByApt(this.portaria.apt);
    console.log("Check Pipe");
    this.users.pipe(
      map(actions => {
        actions.map(a => {
          console.log("inside Pipe")
          this.portaria.email = a.email;
          const id = '1';
          this.portariaDatabaseService.addPortaria(this.portaria).then(() => {
            console.log("finish Pipe")

            this.showToast('Aviso Criado com sucesso!');


            this.router.navigateByUrl('/app/portaria');
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
      duration: 2000
    }).then(toast => toast.present());
  }

  async presentModal() {

    this.users = this.userDatabaseService.getUsersByApt(this.portaria.apt);


    const modal = await this.modalController.create({
      component: PortariaConfirmationPage,
      componentProps: {
        'portaria': this.portaria,
        'user': this.users,
        'apt': this.portaria.apt
      }
    });
    return await modal.present();
  }


}
