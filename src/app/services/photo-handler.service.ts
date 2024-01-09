import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoHandlerService {

  public AllPhotos:string[] = [];
  constructor(private localStorage: LocalService) { }

  loadData() {
    let value = this.localStorage.getData('AllPhotos');
    if (typeof(value) == 'string'){
      this.AllPhotos = JSON.parse(value);
    }
  }

  public addPhoto(photo: string) {
    this.AllPhotos.push(photo);
    this.localStorage.saveData('AllPhotos', JSON.stringify(this.AllPhotos));
  }

  // returns the index of the photo that was deleted
  public deletePhoto(photo: string): number{
    let index = this.AllPhotos.indexOf(photo)
    if (index > -1){
      this.AllPhotos.splice(index, 1);
    }
    this.localStorage.saveData('AllPhotos', JSON.stringify(this.AllPhotos));
    console.log("deleted photo at index", index, this.AllPhotos);
    return index;
  }
}
