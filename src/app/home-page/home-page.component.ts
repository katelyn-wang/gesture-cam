import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam/public_api';
import { PhotoHandlerService } from '../services/photo-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  private isProcessingGesture: boolean = false;

  isTakingPicture: boolean = false;
  countdown: number = 3;

  private trigger: Subject<void> = new Subject();
  public webcamImage!: WebcamImage;
  captureImage = '';

  facingMode: string = 'user';

  constructor(private photohandlerservice:PhotoHandlerService, private router: Router) { }

  ngOnInit(): void {
    //console.log(this.photohandlerservice.AllPhotos);
  }

  async prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();

    if (!this.isProcessingGesture){

      this.isProcessingGesture = true;
      try{
        if(this.gesture == "Two Open Hands"){ // take a picture
          // await this.delay(3000); // wait 3 seconds
          this.isTakingPicture = true;
          await this.delay(1000);
          this.countdown = 2;
          await this.delay(1000);
          this.countdown = 1;
          await this.delay(1000);

          this.triggerSnapshot();
          this.countdown = 3;
          this.isTakingPicture = false;
        }

        else if (this.gesture == "Two Hands Pointing"){ // navigate to view page
          await this.delay(1000); // wait 1 seconds
          this.router.navigate(['/view']);
        }
        
      } 
      finally {
        this.isProcessingGesture = false;
      }
    }

  }
  
  delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  // methods for camera
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.captureImage = webcamImage!.imageAsDataUrl;
    this.photohandlerservice.addPhoto(this.captureImage);
    console.log(this.photohandlerservice.AllPhotos)
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


  // open front camera by default
  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
        result.facingMode = { ideal: this.facingMode };
    }
    return result;
}

}
