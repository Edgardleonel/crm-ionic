import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrmPage } from './crm.page';

describe('CrmPage', () => {
  let component: CrmPage;
  let fixture: ComponentFixture<CrmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
