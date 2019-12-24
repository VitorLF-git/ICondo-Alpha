import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredioPage } from './predio.page';

describe('PredioPage', () => {
  let component: PredioPage;
  let fixture: ComponentFixture<PredioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
