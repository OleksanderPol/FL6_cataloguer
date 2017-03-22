import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { RequestService } from '../services/request.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private RequestService: RequestService) { }

  ngOnInit() {
    console.log(this.RequestService.user)
  }

}
