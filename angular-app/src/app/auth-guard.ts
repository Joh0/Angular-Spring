import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { FurnitureServiceService } from "./furniture-service.service";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private service: FurnitureServiceService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean|UrlTree> | Promise<boolean|UrlTree>{
        this.service.handleAuthentication();
        return true;
    }
    
}