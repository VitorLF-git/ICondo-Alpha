import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Portaria2Page } from './portaria2.page';

describe('Portaria2Page', () => {
  let component: Portaria2Page;
  let fixture: ComponentFixture<Portaria2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Portaria2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Portaria2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
