import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredioGaragemPage } from './predio-garagem.page';

describe('PredioGaragemPage', () => {
  let component: PredioGaragemPage;
  let fixture: ComponentFixture<PredioGaragemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredioGaragemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredioGaragemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
