import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFurnitureComponent } from './search-furniture.component';

describe('SearchFurnitureComponent', () => {
  let component: SearchFurnitureComponent;
  let fixture: ComponentFixture<SearchFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFurnitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
