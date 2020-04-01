import { ResetPage } from './../reset/reset.page';
import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from './../providers/firebase';
import { LoadingProvider } from './../providers/loading';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../providers/auth';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  user;
  userCurrent;

  constructor(
    private formBuilder: FormBuilder,
    private loading: LoadingProvider,
    private auth: AuthProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private firebaseProvider: FirebaseProvider,
    private storage: Storage,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.buidForm();
  }

buidForm() {
  this.form = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  });
}

login() {
  this.loading.presentLoadingWithOptions().then(() => {
    const data = this.form.value;
    this.auth.login(data)
    .then((res) => {
    this.getAndSaveCurrentUser(res.user.uid);
    }).catch(() => {
    this.presentAlert();
    });
  }).catch((error: any) => console.error(error));
}

async presentModal() {
  const modal = await this.modalController.create({
    component: ResetPage
  });
  return await modal.present();
}


getAndSaveCurrentUser(uid) {
  this.firebaseProvider.getCurrentUserDoc(uid)
  .subscribe((res) => {
    this.userCurrent = res;
    const user = this.userCurrent.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
    this.user = user[0];
    this.storage.set('user', this.user);
    console.log(this.user);
    this.navCtrl.navigateForward('tabs');
  });
}



async presentAlert() {
  const alert = await this.alertCtrl.create({
    header: 'Ops',
    subHeader: 'Algo deu errado. Por favor, tente mais uma vez.',
    buttons: ['OK']
  });

  await alert.present();
}

}
