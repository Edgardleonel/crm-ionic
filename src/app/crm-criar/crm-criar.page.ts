import { ServiceService } from './../service/service.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { FirebaseProvider } from './../providers/firebase';
import { LoadingProvider } from './../providers/loading';
import { Cliente } from './../model/client';

@Component({
  selector: 'app-crm-criar',
  templateUrl: './crm-criar.page.html',
  styleUrls: ['./crm-criar.page.scss'],
})
export class CrmCriarPage implements OnInit {

  formulario: FormGroup;
  uid: any;
  key: any;
  favorito;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private firebaseProvider: FirebaseProvider,
    private loading: LoadingProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage,
    private service: ServiceService,
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getUid();
    this.favorito = false;
    console.log('lista de clientes', this.service.list);
  }

  isFavorite() {
    this.favorito = true;
  }

  noFavorite() {
    this.favorito = false;
  }


  getUid() {
    this.storage.get('user').then((res) => {
      this.uid = res.uid;
      console.log(this.uid);
    });
  }

  buildForm() {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.compose([Validators.minLength(12), Validators.maxLength(13), Validators.required])],
      classificacao: [''],
      profissao: [''],
      motivo: [''],
      costume: [''],
      camisa: [''],
      sapato: [''],
    });
  }


  createClient = () => {
      const data = {
        nome: this.formulario.value.nome,
        telefone: this.formulario.value.telefone,
        classificacao: this.formulario.value.classificacao,
        favorito: this.favorito,
        profissao: this.formulario.value.profissao,
        motivo: this.formulario.value.motivo,
        costume: this.formulario.value.costume,
        camisa: this.formulario.value.camisa,
        sapato: this.formulario.value.sapato,
        uid: this.uid,
      };

      const clientes = this.service.list;
      const telefoneCliente = clientes.filter((cliente: Cliente) => cliente.telefone === data.telefone );
      console.log(telefoneCliente);

      if (telefoneCliente.length === 0 ) {
        this.presentToast().then(() => {
          this.firebaseProvider.createClient(data);
          this.loading.presentLoadingWithOptions().then(() => {
            this.dismiss();
          }).catch(() => {
            this.presentAlert();
          });
        });
      } else {
        this.Alert();
    }
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cliente adicionado com sucesso!',
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

  async Alert() {
    const alert = await this.alertCtrl.create({
      header: 'Cliente já existe',
      subHeader: 'Cadastre outro número de telefone, para realizar o cadastro.',
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
