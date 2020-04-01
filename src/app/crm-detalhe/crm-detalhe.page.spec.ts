import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrmDetalhePage } from './crm-detalhe.page';

describe('CrmDetalhePage', () => {
  let component: CrmDetalhePage;
  let fixture: ComponentFixture<CrmDetalhePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmDetalhePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrmDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
