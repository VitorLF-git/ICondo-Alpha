import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { UserDatabaseService } from 'src/app/services/db-services/user-database.service';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.page.html',
  styleUrls: ['./primeiro-acesso.page.scss'],
})
export class PrimeiroAcessoPage implements OnInit {


  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private userService: UserDatabaseService) { }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }

  }

}
