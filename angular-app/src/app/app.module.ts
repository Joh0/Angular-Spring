import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FurnitureListComponent } from './furniture-list/furniture-list.component';
import { FurnitureServiceService } from './furniture-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFurnitureComponent } from './add-furniture/add-furniture.component';
import { EditFurnitureComponent } from './edit-furniture/edit-furniture.component';
import { SearchFurnitureComponent } from './search-furniture/search-furniture.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FurnitureListComponent,
    AddFurnitureComponent,
    EditFurnitureComponent,
    SearchFurnitureComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FurnitureServiceService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
