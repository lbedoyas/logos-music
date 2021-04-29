import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  private _storage: Storage;


  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  };

  slides = [{
    title: 'Escucha tu musica',
    subTitle: 'EN CUALQUIER LUGAR',
    description: `Disfruta cada momento de musica,
    escucha y comparte en cualquier momento`,
    icon: 'play'
  },{
    title: 'Escucha tu postcast',
    subTitle: 'EN CUALQUIER LUGAR',
    description: `Disfruta cada momento tu postcast,
    escucha y comparte en cualquier momento`,
    icon: 'musical-note'
  },
  {
    title: 'Escucha en tu gym',
    subTitle: 'EN CUALQUIER LUGAR',
    description: `Disfruta haciendo ejercicio con logos music`,
    icon: 'infinite-outline'
  }
]

  constructor(private router: Router, private storage: Storage) { }

  async ngOnInit() {
    const storageInit = await this.storage.create();
    this._storage = storageInit;
  }

  finish(){
    this._storage.set('isIntroShowed', true);
    this.router.navigateByUrl("/home");
  }

}
