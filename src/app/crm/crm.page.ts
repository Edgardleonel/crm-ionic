import { ServiceService } from './../service/service.service';
import { CrmCriarPage } from './../crm-criar/crm-criar.page';
import { CrmDetalhePage } from './../crm-detalhe/crm-detalhe.page';
import { FirebaseProvider } from './../providers/firebase';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-crm',
  templateUrl: './crm.page.html',
  styleUrls: ['./crm.page.scss'],
})
export class CrmPage implements OnInit {

user;
clients;
client;
key;
clients2;
messages;

constructor(
  public modalController: ModalController,
  public navCtrl: NavController,
  private firebaseProvider: FirebaseProvider,
  private service: ServiceService,
  public toastController: ToastController,
  private storage: Storage
) { }

ngOnInit() {
  this.getClients();
  this.getMessages();
}

async presentModal() {
  const modal = await this.modalController.create({
    component: CrmCriarPage
  });
  return await modal.present();
}


getClients() {
  this.storage.get('user')
    .then((user) => {
      this.user = user;
      this.firebaseProvider.getCurrentClientDoc(this.user.uid)
     .subscribe((obj) => {
    this.clients = obj;
    this.clients = this.clients.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
    this.clients.sort(function (a, b) {
      return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
    });
    console.log(this.clients);
    this.service.list = this.clients;
    this.clients2 = this.clients;

    });
  });
}


async favorite(client) {
  this.service.selected = client;
  console.log('crm selecionado', this.service.selected);
  if (client.favorito === true) {
    client.favorito = false;
  } else {
    client.favorito = true;
  }
  console.log('favorito', client.favorito);
  this.presentToast().then(() => {
  this.firebaseProvider.saveClients(client, client.key).then(() => {
    });
  }).catch((error: any) => console.error(error));
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



async presentToast() {
  const toast = await this.toastController.create({
    message: 'Favorito alterado com sucesso!',
    duration: 2000,
  });
  toast.present();
}


async open(client) {
  this.service.selected = client;
  const index = this.clients.indexOf(client);
  console.log('crm selecionado', this.service.selected, 'index', index);
  const modal = await this.modalController.create({
    component: CrmDetalhePage
  });
  return await modal.present();
}


public setFilteredItems(event) {
  const searchTerm = event.target.value;
  this.clients = this.filterItems(searchTerm);
  }

  public filterItems(searchTerm) {
    if ( searchTerm.length === 0 ) { return this.clients2; }
    return this.clients2.filter((item) => {
        return item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.motivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.classificacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.telefone.indexOf(searchTerm) > -1 ||
        item.camisa.indexOf(searchTerm) > -1 ||
        item.costume.indexOf(searchTerm) > -1 ||
        item.sapato.indexOf(searchTerm) > -1 });
    }

}
