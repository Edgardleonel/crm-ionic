import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { FirebaseProvider } from './../providers/firebase';
import { LoadingProvider } from './../providers/loading';
import { AuthProvider } from '../providers/auth';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  formulario: FormGroup;
  uid: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseProvider: FirebaseProvider,
    private loading: LoadingProvider,
    private authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    this.buildForm();
   }

  ngOnInit() {}

  buildForm() {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  register() {
    this.loading.presentLoadingWithOptions().then(() => {
      const data = this.formulario.value;
      this.authProvider
        .register(data)
        .then(res => {
          this.uid = res.user.uid;
          this.createUserOnFirestore();
          this.navCtrl.navigateForward('/login');
        })
        .catch(() => {
          this.presentAlert();
        });
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

  createUserOnFirestore = () => {
    const data = {
      name: this.formulario.value.name,
      email: this.formulario.value.email,
      uid: this.uid
    };
    this.firebaseProvider.createUser(data).then(res => {
      this.getAndSaveCurrentUser();
    });
  }

  getAndSaveCurrentUser = () => {
    this.firebaseProvider.getCurrentUser(this.uid).subscribe(res => {
      const user = res[0];
      console.log(user);
    });
  }

}
