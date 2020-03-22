import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredioChamadoPage } from './predio-chamado.page';

describe('PredioChamadoPage', () => {
  let component: PredioChamadoPage;
  let fixture: ComponentFixture<PredioChamadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredioChamadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredioChamadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
