import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFurnitureComponent } from './edit-furniture.component';

describe('EditFurnitureComponent', () => {
  let component: EditFurnitureComponent;
  let fixture: ComponentFixture<EditFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFurnitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
