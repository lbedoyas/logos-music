import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credentials){
    return new Promise((accept, reject) => {
      if (credentials.email == "test@test.com" && credentials.password == "12345") {
        accept("login Correcto")
      }else {
        reject("login incorrecto")
      }
    })
  }

}
