import { Component, OnInit } from '@angular/core';
import { Portaria, PortariaDatabaseService } from 'src/app/services/db-services/portaria-database.service';
import { ToastController, ModalController } from '@ionic/angular';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { Observable } from 'rxjs';
import { PortariaConfirmationPage } from './../../popups/portaria-confirmation/portaria-confirmation.page';
import { map, take } from 'rxjs/operators';

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
    content: "",
    email: "",
    date: "no date"
  }

  constructor(private toastCtrl: ToastController,
    private portariaDatabaseService: PortariaDatabaseService,
    private userDatabaseService: UserDatabaseService,
    public modalController: ModalController) { }

  ngOnInit() {
  }

  createAviso() {

    this.users = this.userDatabaseService.getUsersByApt(this.portaria.apt);
    console.log("Check Pipe");
    return this.users.pipe(
      map(actions => {
        return actions.map(a => {
          console.log("inside Pipe")
          this.portaria.email = a.email;
          const id = '1';
          this.portariaDatabaseService.addPortaria(this.portaria).then(() => {
            this.showToast('Aviso Criado com sucesso!');
          }, err => {
            this.showToast('Ocorreu um erro (avisos-novo-aviso.page.ts) :(');
          });
          return { id };
        });
      })).subscribe((val) => {
      }, (error) => {
        console.log('Error: ', error);
      });

    this.portariaDatabaseService.addPortaria(this.portaria).then(() => {
      this.showToast('Aviso Criado com sucesso!');
    }, err => {
      this.showToast('Ocorreu um erro (avisos-novo-aviso.page.ts) :(');
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
