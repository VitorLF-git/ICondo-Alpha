import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import { User, UserDbService } from 'src/app/services/user-db.service';

import { LocalstorageService } from './../../services/localstorage.service';

@Component({
  selector: 'app-first-acess',
  templateUrl: './first-acess.page.html',
  styleUrls: ['./first-acess.page.scss'],
})
export class FirstAcessPage implements OnInit { 
  user: User = {
    name: "Nome",
    email: "naoexiste@gmail.com",
    type: "Morador",
    parking: "0",
    apt: "0",
    createdAt: new Date().getTime(),
    
  };

  localUserId = null;
  loggedIn = false;
  var = "25";
  userId = null;
 
  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private userService: UserDbService, 
    private loadingController: LoadingController,
    private router: Router, 
    private localstorageService: LocalstorageService,
    ) { }
    
 
  ngOnInit() {
    this.localUserId = this.route.snapshot.paramMap.get('id');
    this.userId = this.route.snapshot.params['id'];
    if (this.userId)  {
      this.loadUser();
    }
  }
 
  async loadUser() {
    const loading = await this.loadingController.create({
      message: 'Loading User..'
    });
    await loading.present();
 
    this.userService.getUser(this.userId).subscribe(res => {
      loading.dismiss();
      this.user = res;
    });
  }
 
  async saveUser() {
 
    const loading = await this.loadingController.create({
      message: 'Saving User..'
    });
    await loading.present();
 
    if (this.userId) {
      this.userService.updateUser(this.user, this.userId).then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/app');
        /** this.nav.back('home'); ROUTE TO APP, SAME AS LOGIN */
      });
    } else {
      /**this.userService.addUser(this.user).then(() => {
        loading.dismiss();
        this.router.navigate(['/app/' + this.var]);
        /**this.nav.goBack('home'); ROUTE TO APP, SAME AS LOGIN
      });*/
      loading.dismiss();
      this.router.navigateByUrl('/app');
    }
  }
 
}