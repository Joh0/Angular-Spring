import { Component } from '@angular/core';
import { FurnitureServiceService } from '../furniture-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-furniture',
  templateUrl: './search-furniture.component.html',
  styleUrls: ['./search-furniture.component.css']
})
export class SearchFurnitureComponent {

  error: string = '';
  furniture: any;
  hasSearched: boolean = false;

  constructor(private service: FurnitureServiceService){
    this.service.error.next('');
  }

  onSubmit(f: NgForm){
    this.service.getFurniture(f.controls['id'].value).subscribe(
      (responseData: any) => {

        if(!responseData){
          this.error = "There is no furniture with Id: " + f.controls['id'].value;
          throw new Error("There is no furniture with Id: " + f.controls['id'].value);
        }
        // The following won't occur if an error is thrown. The successfully searched
        // furniture will only be shown if hasSearched is true.
        this.furniture = responseData;
        this.hasSearched = true;
      }
    )
  }

}
