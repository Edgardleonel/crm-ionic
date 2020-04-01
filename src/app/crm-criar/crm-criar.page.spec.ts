import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrmCriarPage } from './crm-criar.page';

describe('CrmCriarPage', () => {
  let component: CrmCriarPage;
  let fixture: ComponentFixture<CrmCriarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmCriarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrmCriarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
