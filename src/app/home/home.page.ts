import { Component, OnInit } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  artists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];

  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };

  constructor(private musicService: PlatziMusicService) {}

  ngOnInit(): void {
    this.ionViewDidEnter();
    this.ionViewDidEnter$();
    this.getArtists()
  }

  // example promise javascript
  ionViewDidEnter(){
    this.musicService.getNewReleases().then((data)=> {
      console.log(data);
      //console.log(data.albums.items);
    })
  }

  // example Observables
  ionViewDidEnter$(){
    this.musicService.getNewReleases$().subscribe((data)=> {
      this.songs = data.albums.items.filter(e => e.album_type == "single");
      this.albums = data.albums.items.filter(e => e.album_type == "album");
    })
  }

  getArtists(){
    this.artists = this.musicService.getArtists();
    console.log(this.artists);
    
  }


}
