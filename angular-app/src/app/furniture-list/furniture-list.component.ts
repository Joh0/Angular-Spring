import { Component, OnInit } from '@angular/core';
import { FurnitureServiceService } from '../furniture-service.service';
import { Router } from '@angular/router';
import { Furniture } from '../furniture.model';

@Component({
  selector: 'app-furniture-list',
  templateUrl: './furniture-list.component.html',
  styleUrls: ['./furniture-list.component.css'],
})
export class FurnitureListComponent implements OnInit{

  furnitures: any;

  // For deleting
  furniture: any;

  // For removal of EditFurnitureComponent
  editing: boolean = false;
  
  error: any;

  constructor(private service: FurnitureServiceService, private router: Router){
    service.editInProgressEmitted$.subscribe(editedStatus => {
      this.editing = editedStatus;
    });
    this.service.getFurnitures().subscribe(data => {this.furnitures = data;});
  }

  ngOnInit(): void {
    this.service.error.next('');
    this.service.error.subscribe((error: any) => this.error = error);
  }

  onDeleteFurniture(id: number){
    // Removes any error message (such as unauthorised editing error) once this button is clicked
    this.service.error.next('');

    this.service.deleteFurniture(id).subscribe(
      responseData => {
        this.furniture = responseData;
        console.log("Furniture of ID: " + this.furniture.id + " has been deleted");

      // Deleting involves removing furniture from 'furnitures' here instead of reloading the whole list.
      
      // Checking the furniture list before deleting
      console.log("Before manual removal, Furniture list id(s) is/are: ");
      this.furnitures.forEach((f: { id: any; })=> {console.log(f.id)});

      // Only works for id possibly because objects point to different space in memory.
      this.furnitures = this.furnitures.filter((tempFurniture: Furniture) => tempFurniture.id !== id);
      console.log("Removed " + this.furniture.id + " from furnitures!");

      // Checking the furniture list after deleting
      console.log("Furniture list id(s) is/are now: ");
      this.furnitures.forEach((f: { id: any; })=> { console.log(f.id)});

      // We also want to destroy the EditComponent when we click Delete
      this.editing = false;
      }
    );
  }

  onEditFurniture(f: Furniture){
    // Removes the error message (such as unauthorised deletion error) once this button is clicked
    this.service.error.next('');

    // It is here where you want the EditFurniture component to appear, 
    // hence pass the editing status as true.
    this.service.emitEditingInProgress.next(true);

    this.service.transferredFurniture = f;
    console.log("Sent the furniture f from list to service");
    this.service.emitFurnitureToTransfer.next(f);
    console.log("Sent the furniture f as data to the Subject");

    // Then display the EditComponent which will take the transferred furniture from services and load it.
    this.router.navigate(['/furnitures', 'editFurniture']);
    console.log("Furniture list created the Edit Component!");
  }
  
  // Because we do not navigate away from our Furniture List page during editing, we have
  // to refresh every time we do a successful edit.
  onRefreshFurnitureList(){
    this.furnitures = this.service.furnitures;
  }
}
