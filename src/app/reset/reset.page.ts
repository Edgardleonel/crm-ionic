import { LoadingProvider } from './../providers/loading';
import { AuthProvider } from './../providers/auth';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  userEmail = '';
  form: NgForm ;

  constructor(
    public modalCtrl: ModalController,
    private auth: AuthProvider,
    public alertCtrl: AlertController,
    public loading: LoadingProvider
  ) { }

  ngOnInit() {
  }

reset() {
    this.auth.resetPassword(this.userEmail).then(() => {
      this.loading.presentLoadingWithOptions().then(() => {
        this.AlertReset().then(() => {
          this.dismiss();
        });
      });
    }).catch(() => {
      this.Alert();
    });
}


async Alert() {
  const alert = await this.alertCtrl.create({
    header: 'Email não existe!',
    subHeader: 'Verifique o email correto para recuperar sua senha.',
    buttons: ['OK']
  });
  await alert.present();
}

async AlertReset() {
  const alert = await this.alertCtrl.create({
    header: 'Email enviado com sucesso!',
    subHeader: 'Verifique na sua caixa de email.',
    buttons: ['OK']
  });
  await alert.present();
}

dismiss() {
  this.modalCtrl.dismiss({
  'dismissed': true
  });
}
}
