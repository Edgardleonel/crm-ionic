import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    initialSlide: 0,
  };

  constructor(
    public navCtrl: NavController,
    private storage: Storage
  ) {
    this.persistence();
  }

  persistence() {
    this.storage.get('user').then((res) => {
      const user = res;
      if (user) {
        this.navCtrl.navigateRoot('tabs');
      }
    });
  }

  cadastre() {
    this.navCtrl.navigateForward('cadastro');
  }

  login() {
    this.navCtrl.navigateForward('login');
  }

}
