import { AuthProvider } from './../providers/auth';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    private auth: AuthProvider
  ) { }

  ngOnInit() {}

  logout() {
    this.storage.set('user', '');
    this.auth.logout();
  }
}
