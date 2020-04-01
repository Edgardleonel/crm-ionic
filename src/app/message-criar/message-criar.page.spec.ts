import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessageCriarPage } from './message-criar.page';

describe('MessageCriarPage', () => {
  let component: MessageCriarPage;
  let fixture: ComponentFixture<MessageCriarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCriarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageCriarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
