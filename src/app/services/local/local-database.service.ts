import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDatabaseService {

  currentCondominio: string;

  getCurrentCondominio(){
    return this.currentCondominio;
  }
  setCurrentCondominio(condominio: string){
    this.currentCondominio = condominio;
  }

  userType: string;

  getUserType(){
    return this.userType;
  }
  setUserType(condominio: string){
    this.userType = condominio;
  }


  constructor() { }
}
