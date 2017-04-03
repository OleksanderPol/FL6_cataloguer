import { Component, NgZone, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() userPhoto: string;
  @Output() changePhoto = new EventEmitter<string>();
  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;

  constructor(@Inject(NgZone) private zone: NgZone) {
    this.options = new NgUploaderOptions({
      url: '/upload',
      autoUpload: false
    });
  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.userPhoto = JSON.parse(data.response).path;
          this.changePhoto.emit(this.userPhoto);
          console.log(data.response);
        }
      });
    });
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }
}