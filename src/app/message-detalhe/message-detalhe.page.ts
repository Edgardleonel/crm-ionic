import { FirebaseProvider } from './../providers/firebase';
import { LoadingProvider } from './../providers/loading';
import { ServiceService } from './../service/service.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-message-detalhe',
  templateUrl: './message-detalhe.page.html',
  styleUrls: ['./message-detalhe.page.scss'],
})
export class MessageDetalhePage implements OnInit {

  open;
  message;
  messages;


constructor(
  private service: ServiceService,
  public modalCtrl: ModalController,
  public loading: LoadingProvider,
  private firebaseProvider: FirebaseProvider,
  public toastController: ToastController,
  public alertController: AlertController
) {}

ngOnInit() {
  console.log('messagem selecionada', this.service.messageSelected);
  this.message = this.service.messageSelected;
  this.open = true;
}

edit() {
  this.open = false;
}

excluir() {
  this.presentToastExcluir().then(() => {
    this.loading.presentLoadingWithOptions().then(() => {
      this.firebaseProvider.deleteMessage(this.message.key).then(() => {
          this.dismiss();
        });
    });
      }).catch((error: any) => console.error(error));
}



save() {
  this.presentToast().then(() => {
  this.loading.presentLoadingWithOptions().then(() => {
    this.firebaseProvider.saveMessages(this.message, this.message.key).then(() => {
        this.dismiss();
      });
  });
  }).catch((error: any) => console.error(error));
}


async presentToast() {
  const toast = await this.toastController.create({
    message: 'Mensagem alterado com sucesso!',
    duration: 2000,
  });
  toast.present();
}


async presentToastExcluir() {
  const toast = await this.toastController.create({
    message: 'Mensagem excluído com sucesso!',
    duration: 2000,
  });
  toast.present();
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Excluir Mensagem',
    message: 'Tem certeza que deseja excluir a mensagem ' + this.message.titulo + ' ?',
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
