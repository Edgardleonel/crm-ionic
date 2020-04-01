import { ResetPageModule } from './reset/reset.module';
import { ServiceService } from './service/service.service';
import { MessageCriarPageModule } from './message-criar/message-criar.module';
import { MessageDetalhePageModule } from './message-detalhe/message-detalhe.module';
import { CrmCriarPageModule } from './crm-criar/crm-criar.module';
import { CrmDetalhePageModule } from './crm-detalhe/crm-detalhe.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoadingProvider } from './providers/loading';
import { AuthProvider } from './providers/auth';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { config } from '../configs/firebase';

import { FirebaseProvider } from './providers/firebase';

import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    CrmDetalhePageModule,
    CrmCriarPageModule,
    MessageDetalhePageModule,
    MessageCriarPageModule,
    ResetPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    FirebaseProvider,
    LoadingProvider,
    ServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
