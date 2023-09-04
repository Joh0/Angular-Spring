import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FurnitureServiceService } from './furniture-service.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  user: User = new User('', '');

  constructor(private service: FurnitureServiceService){
    this.service.user$.subscribe( data => {
      this.user.username = data.username;
      this.user.password = data.password;})
  }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Request from ' + req.url + ' is intercepted!');
    
    const modifiedRequest = req.clone(
      {
        setHeaders: {
          Authorization: 'Basic ' + btoa(this.user.username + ":" + this.user.password)
        }
      }
    )
    return next.handle(modifiedRequest);
  }
}