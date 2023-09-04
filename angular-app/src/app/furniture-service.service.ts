import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Furniture } from './furniture.model';
import { BehaviorSubject, Observable, Subject, catchError, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FurnitureServiceService{

  // For autoLogout
  logOutTimer: any;

  
  public userSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
    username: '',
    password: ''
  });
  // For Header Component to subscribe show Welcome message.
  user$: Observable<any> = this.userSubject.asObservable();

  // In Login component after success it will trigger this to true.
  public signedIn: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  // For Header Component to subscribe show Welcome message.
  signedInStatus$: Observable<any> = this.signedIn.asObservable();


  // For FurnitureList Component to EditFurniture Component
  transferredFurniture: Furniture = {
    id: 0, 
    name: '',
    description: '',
    price: 0};

  emitFurnitureToTransfer = new Subject<any>;
  furnitureToTransferEmitted$ = this.emitFurnitureToTransfer.asObservable();

  // To indicate if editing is in progress or completed/discarded. If so, EditFurnitureComponent
  // shall be destroyed.
  emitEditingInProgress = new Subject<any>;
  editInProgressEmitted$ = this.emitEditingInProgress.asObservable();

  // Put any error messages here so it can be subscribed by the components
  error: BehaviorSubject<any> = new BehaviorSubject<any>('');

  // This is for FurnitureList Component after editing in EditFurniture Component
  furnitures: any;

  constructor(private http: HttpClient, private router: Router) {}

  signIn(username: string, password: string){
    const tempUser = new User(username, password);

    console.log(username);
    console.log(password);

    this.userSubject.next(tempUser);
    console.log("userSubject has been updated with new data!");
    console.log(this.userSubject);
    // Although updating the userSubject should be done during successful login only, you need
    // to update the userSubject here in order for auth-interceptor to use the user data
    // to attempt authentication. Otherwise, userSubject will be blank and all sign-in will
    // not be authenticated even if the credentials are right.
    // However, this will cause a brief glimpse of the welcome page with the user name even for
    // wrong credentials. To resolve this, you need only show the welcome message if the log in
    // is successful.

    // Put user in local storage
    localStorage.setItem('userData', JSON.stringify(tempUser));

    // For autologout
    this.autoLogOut(600000);

    // var headerContent = {authorization: 'Basic ' + window.btoa(username + ":" + password)}
    // return this.http.get<any>('http://localhost:8080/api/login', {headers: headerContent, responseType: 'text' as 'json'});

    // const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)})
    // console.log(headers);
    // return this.http.get<any>('http://localhost:8080/api/login', {headers, responseType: 'text' as 'json'});

    // [IMPORTANT] After Basic there must be a space!! You must also change the responseType!!!

    return this.http.get<any>('http://localhost:8080/api/login', {responseType: 'text' as 'json'})
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  handleAuthentication(){
        let user: User = new User('', '');
        this.user$.subscribe(data => user = data);
        if(user.username == ''){
            alert("Access Denied! Please login to access this link!")
            this.router.navigate(['/login'])
        }
  }

  // For refresh of Application
  autoLogin(){
    var userData = localStorage.getItem('userData');
    if(!userData){
      return;
    }
    const user: User = JSON.parse(userData);
    this.userSubject.next(user);

    // Also keep the signedIn status on, otherwise refresh will make signedIn status false again
    this.signedIn.next(true);
  }

  logOut(){
    const tempUser: User = new User('', '');
    this.userSubject.next(tempUser);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    clearTimeout(this.logOutTimer);
    alert("You have been logged out!");

    // You have to also make the signedIn false again, otherwise now if you try to login and
    // it is wrong credentials, it will reveal welcome (wrong name)
    this.signedIn.next(false);
  }

  autoLogOut(expirationTimer: number){
    // setTimeout(this.logOut, expirationTimer);

    // In this method, you are calling setTimeout and passing this.logOut as the callback function 
    // to be executed after the specified expirationTimer duration. 
    // However, when you use this.logOut as the callback, it loses its 
    // reference to the FurnitureServiceService instance, and when the timeout 
    // triggers, the context of this will not be the FurnitureServiceService instance anymore. 
    // As a result, the logOut method won't work as expected.

    this.logOutTimer = setTimeout(() => {
      this.logOut();
    }, expirationTimer);

  }

  getFurnitures(){
    return this.http.get<any>('http://localhost:8080/api/furnitures')
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  getFurniture(id: number){
    var stringId: String = id.toString();
    return this.http.get<any>('http://localhost:8080/api/furnitures/' + stringId)
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  addFurniture(furnitureData: Furniture){
    return this.http.post<any>('http://localhost:8080/api/furnitures', furnitureData)
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error, " [Add]")));
  }

  editFurniture(furnitureData: Furniture){
    return this.http.put<any>('http://localhost:8080/api/furnitures', furnitureData)
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error, " [Edit]")));
  }

  deleteFurniture(id: number){
    var stringId: String = id.toString();
    return this.http.delete("http://localhost:8080/api/furnitures/" + stringId)
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error, " [Delete]")));
  }
  // Remember to put slash after 'furnitures'


  private handleError(error: HttpErrorResponse, operation?: string): any{
    console.log(error.status);
    let errorMessage = 'An unknown error occurred!';
    switch(error.status){
      case 403:
        errorMessage = 'You are not authorised to perform this action!' + operation;
        break;
      case 401:
        errorMessage = 'Invalid Credentials!';
        break;
    }
    this.error.next(errorMessage);
    return throwError(new Error(errorMessage));
  }

  // When using the handleError method in the FurnitureServiceService class, 
  // make sure you're calling it within the context of the class itself. 
  // If you're calling it from an HTTP request observable's error handler, 
  // the context might be lost, leading to this.error being undefined.
}
