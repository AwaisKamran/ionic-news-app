import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  public photo;

  constructor(private camera: Camera, private sanitizer: DomSanitizer) {
    this.capturePhoto();
  }

  capturePhoto() {
    const config = {
      quality: 75,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
    }

    this.camera.getPicture(config).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }
}
