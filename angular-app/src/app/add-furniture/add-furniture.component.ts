import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Furniture } from '../furniture.model';
import { FurnitureServiceService } from '../furniture-service.service';

@Component({
  selector: 'app-add-furniture',
  templateUrl: './add-furniture.component.html',
  styleUrls: ['./add-furniture.component.css']
})
export class AddFurnitureComponent implements OnInit {

  // To display error when trying to add furnitures despite not authorised
  error: any;

  constructor(private service: FurnitureServiceService){}

  ngOnInit(): void {
    this.service.error.next('');
    this.service.error.subscribe((error: any) => this.error = error);
  }

  onSubmit(f: NgForm){
    var furnitureData: Furniture = {
      'id':0,
      'name':f.controls['name'].value,
      'description':f.controls['description'].value,
      'price':f.controls['price'].value
      }
    this.service.addFurniture(furnitureData).subscribe(
      (responseData: any) => {
        console.log('Furniture added successfully:', responseData);
      }
    );
  }
  
}
