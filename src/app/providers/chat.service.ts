import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";


import { Mensaje } from '../interface/mensaje.interface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref=> ref.orderBy('fecha','desc').limit(5) );

    return this.itemsCollection.valueChanges().pipe(map( (mensajes: Mensaje[]) =>{
      console.log(mensajes);
      //this.chats = mensajes;
      this.chats = [];

      for (let mensaje of mensajes){
        this.chats.unshift( mensaje )
      }

      return this.chats;

    }));
  }

  agregarMensajes( texto:string ){
    // TODO FALTA EL UID DEL USUARIO
    let mensaje: Mensaje ={
        nombre: 'demo',
        mensaje: texto,
        fecha: new Date().getTime()
    }
    return this.itemsCollection.add(mensaje);
  }
}
