import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements OnInit {

  @Input() songs: any[];
  @Input() artist: string;

  constructor(private modalcontroller: ModalController) { }

  ngOnInit() {
    console.log(this.songs);
    console.log(this.artist);
  }

  async selectSong(song?: any){
    await this.modalcontroller.dismiss(song);
  }


}
