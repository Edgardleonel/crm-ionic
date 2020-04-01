import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseProvider {

  constructor(public db: AngularFirestore) {}

//Create
createUser = data => this.db.collection('users').add(data);

createClient = data => this.db.collection('clients').add(data);

createMsg = data => this.db.collection('message').add(data);


//Delete

deleteClients(key) {
  return this.db.collection('clients').doc(key).delete();
}
deleteMessage(key) {
  return this.db.collection('message').doc(key).delete();
}


//Get

getCurrentUser(uid) {
  return this.db.collection('users', ref => ref.where('uid', '==', uid))
  .valueChanges();
}

getCurrentMsg(uid) {
  return this.db.collection('message', ref => ref.where('uid', '==', uid))
  .snapshotChanges();
}

getCurrentUserDoc(uid) {
  return this.db.collection('users', ref => ref.where('uid', '==', uid))
  .snapshotChanges();
}

getCurrentClientDoc(uid) {
  return this.db.collection('clients', ref => ref.where('uid', '==', uid))
  .snapshotChanges();
}



//Update

saveUser(data, key) {
  return this.db.collection('users').doc(key).update(data);
}

saveClients(data, key) { 
  return this.db.collection('clients').doc(key).update(data);
}

saveMessages(data, key) {
  return this.db.collection('message').doc(key).update(data);
}

}