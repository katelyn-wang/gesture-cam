import { Component,Input } from '@angular/core';
import { PhotoHandlerService } from 'src/app/services/photo-handler.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {

  @Input()PhotoURL:string;
  constructor() { }

  ngOnInit(): void {
  }
}
