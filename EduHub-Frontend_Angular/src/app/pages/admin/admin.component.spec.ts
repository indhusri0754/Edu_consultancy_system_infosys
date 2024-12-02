import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the admin page', () => {
    expect(component).toBeTruthy();
  });

  it('should call addUser on button click', () => {
    spyOn(component, 'addUser');
    const button = fixture.debugElement.nativeElement.querySelector('.btn');
    button.click();
    expect(component.addUser).toHaveBeenCalled();
  });

  // Add more test cases for other methods
});
