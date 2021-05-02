import { Component, OnInit } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  artists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  songs$: any;
  song = {
    name: '',
    playing: false,
    preview_url: ''
  }
  currentSong;
  newTime;
  duration: any;
  currentTime: any;

  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };

  constructor(private musicService: PlatziMusicService, private modalController: ModalController) {}

  ngOnInit(): void {
    this.ionViewDidEnter$();
    this.getArtists()
    // if (this.currentSong.duration == undefined) {
    //   this.currentSong.duration = 0;
    // }
    // console.log(this.currentSong.duration);
    
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

  async openModal(artist){
    let modal =  await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: this.songs$.tracks,
        artist: artist.name
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      console.log(dataReturned);
      this.song = dataReturned.data;
    })

    return await modal.present();
  }

  async showSongs(artist){
    console.log(artist);
    await this.musicService.getArtistTopTracks(artist.id).subscribe((data)=> {
      this.songs$ = data;
      console.log(this.songs$);
      this.openModal(artist)
    }, (error) => (console.log(error)),
    () => this.openModal(artist))
  }


  play(){
    console.log(this.song.preview_url);
    this.currentSong = new Audio(this.song.preview_url)
    this.currentSong.play();
    console.log(this.currentSong);
    
    this.currentSong.addEventListener('timeupdate', ()=> {
      console.log(this.currentSong.duration);
      this.newTime = (this.currentSong.currentTime * (this.currentSong.duration / 10))/100;
      this.duration = this.currentSong.duration;
      this.currentTime = this.currentSong.currentTime;
    })
    this.song.playing = true;
  }

  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time="0.00"){
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime/60).toString();
      if (minutes.length == 1 ) {
        minutes = "0" + minutes;
      }
      let seconds = (partTime%60).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  }

}
