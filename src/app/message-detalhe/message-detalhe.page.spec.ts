import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessageDetalhePage } from './message-detalhe.page';

describe('MessageDetalhePage', () => {
  let component: MessageDetalhePage;
  let fixture: ComponentFixture<MessageDetalhePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageDetalhePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
