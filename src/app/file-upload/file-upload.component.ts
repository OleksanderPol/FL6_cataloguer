import { Component, OnInit, NgZone, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { User, NotLogedInUser } from '../app.model';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  public user: NotLogedInUser;
  private loggedUser: User;
  // @Output() changePhoto: EventEmitter<string> = new EventEmitter<string>();
  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;

  constructor(@Inject(NgZone) private zone: NgZone,
              private dataService: DataService,
              private requestService: RequestService,
              private router: Router) {
    this.options = new NgUploaderOptions({
      url: '/upload'
    });
  }

  ngOnInit() {
    this.user = this.dataService.getUser();
    this.loggedUser = this.dataService.getLogedInUser();
  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.response = "Photo uploaded. Click on 'Save changes' to update photo on site.";
          this.requestService.changeUserRequest(this.user.username,
                                            this.user.email, this.user.info,
                                            this.user.telephone, this.user.city,
                                            JSON.parse(data.response).path,
                                            this.receiveResponseChange.bind(this));
        }
      });
    });
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }
  receiveResponseChange(status, response, username) {
    if (status === 200) {
      this.dataService.storeUser(response);
      this.dataService.storeLogedInUser(response);
      this.user = this.dataService.getUser();
      this.loggedUser = this.dataService.getLogedInUser();
      // this.router.navigate(['/home', username]);
    } else {
      this.response = response;
    }
  }
}