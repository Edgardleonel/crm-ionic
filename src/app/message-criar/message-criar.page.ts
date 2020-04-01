import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { FirebaseProvider } from './../providers/firebase';
import { LoadingProvider } from './../providers/loading';



@Component({
  selector: 'app-message-criar',
  templateUrl: './message-criar.page.html',
  styleUrls: ['./message-criar.page.scss'],
})
export class MessageCriarPage implements OnInit {

  
  formulario: FormGroup;
  uid: any;
  favorito;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private firebaseProvider: FirebaseProvider,
    private loading: LoadingProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getUid();
  }


  getUid() {
    this.storage.get('user').then((res) => {
      this.uid = res.uid;
      console.log(this.uid);
    });
  }

  buildForm() {
    this.formulario = this.formBuilder.group({
      titulo: ['', Validators.required],
      texto: ['', Validators.required],
    });
  }

  createMsg = () => {
    const data = {
      titulo: this.formulario.value.titulo,
      texto: this.formulario.value.texto,
      uid: this.uid
    };
    this.firebaseProvider.createMsg(data).then(res => {
    this.presentToast();
    this.loading.presentLoadingWithOptions().then(() => {
      this.dismiss();
    });
    }).catch(() => {
      this.presentAlert();
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Mensagem adicionado com sucesso!',
      duration: 2000,
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Ops',
      subHeader: 'Algo deu errado. Por favor, tente mais uma vez.',
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
