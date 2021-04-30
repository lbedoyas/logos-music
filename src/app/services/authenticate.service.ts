import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  userCurrent: any;

  constructor(private storage: Storage) {
    this.init();
  }


  init(){
    this.storage.create();
  }

  loginUser(credentials){

    return new Promise((accept, reject) => {
      if (credentials.email == "test@test.com" && credentials.password == "12345") {
        accept("login Correcto")
      }else {
        reject("login incorrecto")
      }
    })
  }

  registerUser(userData){
    userData.password = btoa(userData.password);
    return this.storage.set('user', userData);
  }

}
