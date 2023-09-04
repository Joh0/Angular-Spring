import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Furniture } from '../furniture.model';
import { FurnitureServiceService } from '../furniture-service.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-furniture',
  templateUrl: './edit-furniture.component.html',
  styleUrls: ['./edit-furniture.component.css']
})
export class EditFurnitureComponent implements OnInit, OnDestroy, AfterViewInit {

  // Accessing the form
  @ViewChild('f', {static: false})
  signUpForm!: NgForm;

  furniture: Furniture = {
    id: 16, 
    name: 'BOMB',
    description: 'Chilli',
    price: 10};

  constructor(private service: FurnitureServiceService, private http: HttpClient, private router: Router){
    service.furnitureToTransferEmitted$.subscribe(f => {
      this.furniture = f;
      console.log("In editFurniture component, subscribed to update of the transferredFurniture")});
  }

  ngAfterViewInit(): void {
    // There are no form controls registered with this group yet
    // (if you use OnInit to set values to the form). If you're using ngModel,
    // you may want to check next tick (e.g. use setTimeout).
    setTimeout(
      () => {
        this.signUpForm.setValue({
          id: this.furniture['id'],
          name: this.furniture['name'],
          description: this.furniture['description'],
          price: this.furniture['price']
        });
        console.log(this.signUpForm);
      }, 0);
    }

  ngOnDestroy(): void {
    console.log("Edit Component is Destroyed!");
  }

  ngOnInit(): void {
    console.log("Edit Component is Created!");
    console.log(this.service.transferredFurniture);

    this.furniture = this.service.transferredFurniture;
    console.log(this.furniture);
    // In this Constructor, we subscribed to the furnitureToTransferEmitted observable
    // so that any other clicks to edit another furniture in the FurnitureList Component
    // whilst the EditFurniture Component has already been intialised shall allow the
    // EditFurniture Component to automatically be updated with the respective furniture
    // to be edited, by updating the furniture in Service from the FurnitureList Component.
    // However, when the EditFurniture Component is initialised for the first time, it has
    // not yet subscribed and will need another way for the FurnitureList Component to 
    // This is to immediately replace the stand-in furniture data to be displayed in this
    // Edit Component. This Edit Furniture component has only just subscribed to the 
    // furnitureToTransferEmiited observable and will not be able to replace the stand-in
    // furniture data to be displayed for edit. Thus, there is a need for the FurnitureList
    // Component to also update a furniture object in Service called transferredFurniture so that it
    // can overwrite the stand-in furniture data in this EditFurniture Component.

  }

    onEditFurniture(form: NgForm){
      var furnitureData: Furniture = {
        'id': form.value.id,
        'name': form.value.name,
        'description': form.value.description,
        'price': form.value.price
        };
      console.log("Checking furniture Data to be edited");
      console.log(furnitureData);


      // Calling the REST API to edit the furniture. It will also trigger the destruction of the Edit Component.
      // removing the true from editFurniture
      this.service.editFurniture(furnitureData).subscribe(
        (responseData: any) => {
          console.log('Furniture edited successfully:', responseData);

          // Only emit false for editingInProgress here if it is successful, instead of passing it
          // as a parameter and emitting it in Service. Meant to destroy EditFurnitureComponent.
          this.service.emitEditingInProgress.next(false);
          // Filling service furnitures with updated furniture list so FurnitureList Component can get it
          this.service.getFurnitures().subscribe(data => {this.service.furnitures = data;});
        },
        () => {
          // We navigate to FurnitureList Component without using *ngIf to destroy the edit component.
          console.log("In finally!")
          this.router.navigate(['/furnitures']);
          // The furniture list is not destroyed so we must still refresh the list to update it.
        }
      );
    }

    // Meant to destroy EditFurnitureComponent.
    onDiscardEdit(){
      this.service.emitEditingInProgress.next(false);
    }
}
