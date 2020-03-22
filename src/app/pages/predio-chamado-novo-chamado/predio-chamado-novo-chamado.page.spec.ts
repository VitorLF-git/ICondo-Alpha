import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredioChamadoNovoChamadoPage } from './predio-chamado-novo-chamado.page';

describe('PredioChamadoNovoChamadoPage', () => {
  let component: PredioChamadoNovoChamadoPage;
  let fixture: ComponentFixture<PredioChamadoNovoChamadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredioChamadoNovoChamadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredioChamadoNovoChamadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
