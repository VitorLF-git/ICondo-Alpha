import { Component, OnInit } from '@angular/core';
import { AvisoDatabaseService, Aviso } from 'src/app/services/db-services/aviso-database.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-avisos-novo-aviso',
  templateUrl: './avisos-novo-aviso.page.html',
  styleUrls: ['./avisos-novo-aviso.page.scss'],
})
export class AvisosNovoAvisoPage implements OnInit {

  aviso: Aviso = {
    title: "",
    content: "",
    category: "Condominio",
    date: "no date"
  }

  constructor(private avisoDatabaseService: AvisoDatabaseService, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  createAviso() {

    this.avisoDatabaseService.addAviso(this.aviso).then(() => {
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

}
