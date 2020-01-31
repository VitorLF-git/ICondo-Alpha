import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PortariaPage } from './portaria.page';

describe('PortariaPage', () => {
  let component: PortariaPage;
  let fixture: ComponentFixture<PortariaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortariaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PortariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
