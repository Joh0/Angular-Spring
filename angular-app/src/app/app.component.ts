import { Component, OnInit } from '@angular/core';
import { FurnitureServiceService } from './furniture-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'angular-app';

  constructor(private service: FurnitureServiceService){}

  // For autologin
  ngOnInit(): void {
    this.service.autoLogin();
  }
}
