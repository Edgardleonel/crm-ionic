import { MessageDetalhePage } from './../message-detalhe/message-detalhe.page';
import { FirebaseProvider } from './../providers/firebase';
import { Storage } from '@ionic/storage';
import { MessageCriarPage } from './../message-criar/message-criar.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceService } from './../service/service.service';



@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

uid;
user;
messages;


  constructor(
    public modalController: ModalController,
    private storage: Storage,
    private firebaseProvider: FirebaseProvider,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  this.getMessages();
  }




  getMessages() {
  this.storage.get('user')
    .then((user) => {
      this.user = user;
      this.firebaseProvider.getCurrentMsg(this.user.uid)
     .subscribe((obj) => {
    this.messages = obj;
    this.messages = this.messages.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
    this.messages.sort(function (a, b) {
      return (a.titulo > b.titulo) ? 1 : ((b.titulo > a.titulo) ? -1 : 0);
    });
    console.log(this.messages);
    this.service.messageList = this.messages;

    });
  });
}

  async presentModal() {
    const modal = await this.modalController.create({
      component: MessageCriarPage
    });
    return await modal.present();
  }


async open(message) {
  this.service.messageSelected = message;

  console.log('mensagem selecionado', this.service.messageSelected);
  const modal = await this.modalController.create({
    component: MessageDetalhePage
  });
  return await modal.present();
}


}
