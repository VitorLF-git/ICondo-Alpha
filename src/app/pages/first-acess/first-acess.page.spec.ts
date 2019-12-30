import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirstAcessPage } from './first-acess.page';

describe('FirstAcessPage', () => {
  let component: FirstAcessPage;
  let fixture: ComponentFixture<FirstAcessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstAcessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstAcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
