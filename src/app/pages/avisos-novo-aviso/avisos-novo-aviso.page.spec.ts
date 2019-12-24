import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisosNovoAvisoPage } from './avisos-novo-aviso.page';

describe('AvisosNovoAvisoPage', () => {
  let component: AvisosNovoAvisoPage;
  let fixture: ComponentFixture<AvisosNovoAvisoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosNovoAvisoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisosNovoAvisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
