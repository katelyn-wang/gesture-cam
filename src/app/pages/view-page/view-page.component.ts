import { Component } from '@angular/core';
import { PhotoHandlerService } from 'src/app/services/photo-handler.service';
import { PhotoComponent } from 'src/app/components/photo/photo.component';
import { PredictionEvent } from 'src/app/prediction-event';
import { Router } from '@angular/router';
import { PhotoCarouselComponent } from 'src/app/components/photo-carousel/photo-carousel.component';
import { CarouselControlService } from 'src/app/services/carousel-control.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent {

  public photos:string[] =  [];
  gesture = "";
  prevGesture = "";
  prevGesture2 = "";
  prevGesture3 = "";
  isDeletingPic: boolean = false;
  private isProcessingGesture: boolean = false;
  public layout:String = "Carousel";
  activeImageSrc: string | null = null;

  constructor(private photoHandlerService: PhotoHandlerService, private router: Router,
    private carouselControl: CarouselControlService) { }

  ngOnInit(): void {
    this.photoHandlerService.loadData();
    
    console.log("all photos: ", this.photoHandlerService.AllPhotos);
    this.photos = this.photoHandlerService.AllPhotos;

    this.activeImageSrc = this.photos[0];
  }

  async prediction(event: PredictionEvent){
    this.prevGesture3 = this.prevGesture2;
    this.prevGesture2 = this.prevGesture;
    this.prevGesture = this.gesture;
    this.gesture = event.getPrediction();

    if (!this.isProcessingGesture){

      this.isProcessingGesture = true;
      try{

        // navigate to camera page
        if(this.gesture == "Two Open Hands"){
          await this.delay(1000); // wait 1 second
          this.router.navigate(['/']);
        }

        // point left and right to navigate through carousel
        else if (this.gesture == "Right Point" && this.layout == "Carousel"){
          this.carouselControl.triggerNextPhoto();
        }
        else if (this.gesture == "Left Point" && this.layout == "Carousel"){
          this.carouselControl.triggerPrevPhoto();
        }

        // pinch to toggle between carousel and gallery view
        else if (this.gesture == "Hand Pinching"){
          await this.delay(1000);
          if (this.layout == 'Carousel'){
            this.layout = 'All Photos';
          }
          else{
            this.layout = 'Carousel';
          }
        }

        // hold open hand for 2 seconds to save current active photo in carousel
        else if (this.gesture == "Open Hand" && this.prevGesture == "Open Hand"
          && this.prevGesture2 == "Open Hand" && this.prevGesture3 == "Open Hand"
          && this.layout == 'Carousel'){
          
          this.prevGesture3 = "";
          this.prevGesture2 = "";
          this.prevGesture = "";
          
          if (this.activeImageSrc != null){
            this.downloadImage(this.activeImageSrc);
            console.log("downloaded image");
          }
        }

        // hold two closed hands for 2 seconds to delete current active photo in carousel
        else if (this.layout == 'Carousel' && this.gesture == "Two Closed Hands" 
          && this.prevGesture == "Two Closed Hands" && this.prevGesture2 == "Two Closed Hands"
          && this.prevGesture3 == "Two Closed Hands"){

          this.isDeletingPic = true;
          this.prevGesture3 = "";
          this.prevGesture2 = "";
          this.prevGesture = "";

          if (this.activeImageSrc != null) {
            this.deletePicture(this.activeImageSrc);
            // this.isDeletingPic = true;
            console.log("deleting pic", this.isDeletingPic);
            
            console.log("deleted image");
          }

          this.delay(1000);
          this.isDeletingPic = false;
        }
        
      } 
      finally {
        this.isProcessingGesture = false;
      }
    }
  }

  // called whenever the carousel's active image changes
  activeImgSrc(src: string | null) {
    this.activeImageSrc = src;
  }

  delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  layoutchange(event:any){
    this.layout = event.target.value;
    console.log(this.layout);
  }


  downloadImage(imageSrc: string){
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'gesture_camera_download.jpg';

    // append the link to the body
    document.body.appendChild(link);

    // simulate a click on the link to trigger the download
    link.click();
    // remove the link from the document
    document.body.removeChild(link);
  }

  deletePicture(imageSrc: string){
    let index = this.photoHandlerService.deletePhoto(imageSrc);

    // reload data
    this.photoHandlerService.loadData();
    console.log("all photos: ", this.photoHandlerService.AllPhotos);
    this.photos = this.photoHandlerService.AllPhotos;

    // if was last photo, go to first image in carousel
    if (index == this.photos.length){
      this.carouselControl.triggerNextPhoto();
    }
  }
}
