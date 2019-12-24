import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredioSalaoPage } from './predio-salao.page';

describe('PredioSalaoPage', () => {
  let component: PredioSalaoPage;
  let fixture: ComponentFixture<PredioSalaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredioSalaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredioSalaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
