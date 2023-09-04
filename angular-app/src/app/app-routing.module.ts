import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FurnitureListComponent } from './furniture-list/furniture-list.component';
import { AddFurnitureComponent } from './add-furniture/add-furniture.component';
import { EditFurnitureComponent } from './edit-furniture/edit-furniture.component';
import { SearchFurnitureComponent } from './search-furniture/search-furniture.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch:'full'},
  {path: 'furnitures', component: FurnitureListComponent, canActivate: [AuthGuard], children: [
    {path: 'editFurniture', component: EditFurnitureComponent}
  ]},
  {path: 'addFurniture', component: AddFurnitureComponent, canActivate: [AuthGuard]},
  {path: 'searchFurniture', component: SearchFurnitureComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
