import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  private _storage: Storage;

  constructor(private storage: Storage, private router: Router){
    this.init();
  }
  async init(){
    this.storage.create();
  }
  async canActivate() {
    let isIntroShowed = null;
    await this.storage.get('isIntroShowed').then(data => {
      isIntroShowed = data;
    });
    if (isIntroShowed) {
      return true;
    }else {
      this.router.navigateByUrl('/intro');
    }
  }
  
}
