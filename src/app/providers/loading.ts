import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingProvider {
    constructor(public loadingController: LoadingController) {}

    async presentLoadingWithOptions() {
      const loading = await this.loadingController.create({
        spinner: 'crescent',
        duration: 2000,
        message: 'Aguarde...',
      });
      return await loading.present();
    }
  }