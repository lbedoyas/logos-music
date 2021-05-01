import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as dataArtists from '../../assets/JSON/artist.json';

@Injectable({
  providedIn: 'root'
})
export class PlatziMusicService {

  private urlNewRelease = 'https://platzi-music-api.herokuapp.com/browse/new-releases';

  constructor(private httpClient: HttpClient) { }

  getNewReleases(){
    return fetch(this.urlNewRelease).then(response => {
      response.json()
    })
  }

  public getNewReleases$(): Observable<any> {
    return this.httpClient.get<any>(this.urlNewRelease ).pipe(catchError(err => of(err)));
  }

  getArtists(){
    return dataArtists.items;
  }





}
