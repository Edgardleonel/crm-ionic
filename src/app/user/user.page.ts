import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from './../providers/firebase';
import { LoadingProvider } from './../providers/loading';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

public user = {
  key: '',
  name: '',
  email: '',
  cargo: '',
  loja: '',
  uid: ''
};

public open;

  constructor(
    private storage: Storage,
    public loading: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getUser();
    this.open = false;
  }


getUser() {
  this.storage.get('user')
    .then((user) => {
      this.user = user;
      console.log('usuário', this.user);
  });
}

edit() {
this.open = true;
}



save() {
  this.presentToast().then(() => {
  this.loading.presentLoadingWithOptions().then(() => {
    this.firebaseProvider.saveUser(this.user, this.user.key).then(() => {
      this.storage.set('user', this.user).then(() => {
        this.open = false;
      });
    });
  });
  }).catch((error: any) => console.error(error));
}


async presentToast() {
  const toast = await this.toastController.create({
    message: 'Seus dados foram alterados com sucesso!',
    duration: 2000,
  });
  toast.present();
}


}
