import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredioPerfilPage } from './predio-perfil.page';

describe('PredioPerfilPage', () => {
  let component: PredioPerfilPage;
  let fixture: ComponentFixture<PredioPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredioPerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredioPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
