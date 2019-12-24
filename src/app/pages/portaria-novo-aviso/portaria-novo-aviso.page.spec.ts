import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PortariaNovoAvisoPage } from './portaria-novo-aviso.page';

describe('PortariaNovoAvisoPage', () => {
  let component: PortariaNovoAvisoPage;
  let fixture: ComponentFixture<PortariaNovoAvisoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortariaNovoAvisoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PortariaNovoAvisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
