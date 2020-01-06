import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { User, UserDbService } from 'src/app/services/user-db.service';

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
 
  userId = null;
 
  constructor(private route: ActivatedRoute, private nav: NavController, private userService: UserDbService, private loadingController: LoadingController) { }
 
  ngOnInit() {
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
        /** this.nav.back('home'); ROUTE TO APP, SAME AS LOGIN */
      });
    } else {
      this.userService.addUser(this.user).then(() => {
        loading.dismiss();
        /**this.nav.goBack('home'); ROUTE TO APP, SAME AS LOGIN*/
      });
    }
  }
 
}