import { Component,Input,OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PhotoComponent } from '../photo/photo.component';
import { CarouselControlService } from 'src/app/services/carousel-control.service';

@Component({
  selector: 'app-photo-carousel',
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.css']
})
export class PhotoCarouselComponent implements OnInit{

  @Input()Photos:string[];
  @Output()activeImageSrcChange = new EventEmitter<string | null>();

  activeSlide: number = 0;
  activeImageSrc: string | null = null;

  constructor(private carouselControl: CarouselControlService) { }

  ngOnInit(): void {
    this.activeImageSrc = this.Photos.length > 0 ? this.Photos[0] : null;

    this.carouselControl.triggerNextPhoto$.subscribe((trigger) => {
      if (trigger) {
        this.nextPhoto();
      }
    });

    this.carouselControl.triggerPrevPhoto$.subscribe((trigger) => {
      if (trigger) {
        this.prevPhoto();
      }
    });
  }

  nextPhoto() {
    if (this.activeSlide < this.Photos.length - 1) {
      this.activeSlide++;
    }
    else{
      this.activeSlide = 0; // if reached end, go to first photo
    }
    this.activeImageSrc = this.Photos[this.activeSlide] || null;
    this.activeImageSrcChange.emit(this.activeImageSrc);
  }

  prevPhoto() {
    if (this.activeSlide > 0) {
      this.activeSlide--;
    }
    else{
      this.activeSlide = this.Photos.length-1;  // if reached beginning, go to last photo
    }
    this.activeImageSrc = this.Photos[this.activeSlide] || null;
    this.activeImageSrcChange.emit(this.activeImageSrc);
  }



}
