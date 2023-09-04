import { Component } from '@angular/core';
import { FurnitureServiceService } from '../furniture-service.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user: User = new User('', '');
  signedIn: boolean = false;

  constructor(private service: FurnitureServiceService, private router: Router){
    this.service.user$.subscribe(data => {
      this.user.username = data.username;
      this.user.password = data.password;})
  
    // The Welcome User message is only shown when the signedIn status is true. This is because
    // we want to fill the user field with data first before revealing the message. Otherwise,
    // it will show Welcome (blank) followed by Welcome (user) upon 
    // initialising the Header component as the component subscribes to the user data.
    this.service.signedInStatus$.subscribe(status => this.signedIn = status);
  }

  onLogout(){
    this.service.logOut();
  }
}
