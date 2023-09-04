import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FurnitureServiceService } from '../furniture-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  error: string = '';

  constructor(private service: FurnitureServiceService, private router: Router){}

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required),
      }
    );

    // We want to clear any previous error message in the Service, then subscribe for any
    // error message to display if it occurs.
    this.service.error.next('');
    this.service.error.subscribe((error: any) => this.error = error);
  }

  onSubmit(){
    var user = this.loginForm.controls['username'].value;
    var pass = this.loginForm.controls['password'].value;

    this.service.signIn(
      user, pass).subscribe(
        
      (responseData: any) => {
        console.log('User signed in successfully:', responseData);

        // For the Header component to reflect signedIn status as true
        this.service.signedIn.next(true);
        this.router.navigate(['/furnitures']);
      }
      ,
      (error: any) => {
        localStorage.removeItem('userData');
        clearTimeout(this.service.logOutTimer);
      }
      );

  }
}
