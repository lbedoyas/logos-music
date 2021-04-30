import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router){
    this.init();
  }

  async init(){
    this.storage.create();
  }

  async canActivate(){
    let isUserLoggedIn = null;
    await this.storage.get('isUserLoggedIn').then(data => {
      isUserLoggedIn = data;
    })
    if (isUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  
}
