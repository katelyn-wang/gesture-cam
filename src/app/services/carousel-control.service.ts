import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselControlService {

  private triggerNextPhotoSource = new BehaviorSubject<boolean>(false);
  triggerNextPhoto$: Observable<boolean> = this.triggerNextPhotoSource.asObservable();

  private triggerPrevPhotoSource = new BehaviorSubject<boolean>(false);
  triggerPrevPhoto$: Observable<boolean> = this.triggerPrevPhotoSource.asObservable();

  triggerNextPhoto() {
    this.triggerNextPhotoSource.next(true);
  }

  triggerPrevPhoto() {
    this.triggerPrevPhotoSource.next(true);
  }
}
