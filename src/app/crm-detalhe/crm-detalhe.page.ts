import { FirebaseProvider } from './../providers/firebase';
import { LoadingProvider } from './../providers/loading';
import { ServiceService } from './../service/service.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Cliente } from './../model/client';

@Component({
  selector: 'app-crm-detalhe',
  templateUrl: './crm-detalhe.page.html',
  styleUrls: ['./crm-detalhe.page.scss'],
})
export class CrmDetalhePage implements OnInit {

open;
client;
clients;


constructor(
  private service: ServiceService,
  public modalCtrl: ModalController,
  public loading: LoadingProvider,
  private firebaseProvider: FirebaseProvider,
  public toastController: ToastController,
  public alertController: AlertController
) {}

ngOnInit() {
  console.log('crm selecionado', this.service.selected);
  this.client = this.service.selected;
  this.open = true;
}

isFavorite() {
  this.client.favorito = true;
}

noFavorite() {
  this.client.favorito = false;
}

edit() {
  this.open = false;
}

excluir() {
  this.presentToastExcluir().then(() => {
    this.loading.presentLoadingWithOptions().then(() => {
      this.firebaseProvider.deleteClients(this.client.key).then(() => {
          this.dismiss();
        });
    });
      }).catch((error: any) => console.error(error));
}

save() {
  this.clients = this.service.list;
  const telefone = this.clients.filter((c: Cliente) => c.telefone === this.client.telefone);
  console.log('lista com telefone que já existe', telefone);
  console.log('list atual', this.clients);
  if (telefone.length === 0 || telefone.length === 1) {
    this.update();
  } else {
    this.Alert();
  }
}

update() {
  this.presentToast().then(() => {
  this.loading.presentLoadingWithOptions().then(() => {
    console.log(this.client);
    console.log(this.client.uid);
    this.firebaseProvider.saveClients(this.client, this.client.key).then(() => {
        this.dismiss();
      });
  });
  }).catch((error: any) => console.error(error));
}

async Alert() {
  const alert = await this.alertController.create({
    header: 'Cliente já existe',
    subHeader: 'Cadastre outro número de telefone, para realizar a alteração.',
    buttons: ['OK']
  });
  await alert.present();
}


async presentToast() {
  const toast = await this.toastController.create({
    message: 'Cliente alterado com sucesso!',
    duration: 2000,
  });
  toast.present();
}


async presentToastExcluir() {
  const toast = await this.toastController.create({
    message: 'Cliente excluído com sucesso!',
    duration: 2000,
  });
  toast.present();
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Excluir Cliente',
    message: 'Tem certeza que deseja excluir o cliente ' + this.client.nome + ' ?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancelar',
        cssClass: 'secondary',
        handler: data => {}
        }, {
        text: 'Confirmar',
        handler: data => {
          this.excluir();
        }
      }
    ]
  });
  await alert.present();
}


dismiss() {
  this.modalCtrl.dismiss({
  'dismissed': true
  });
}

}
