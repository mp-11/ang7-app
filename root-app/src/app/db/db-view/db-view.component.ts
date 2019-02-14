import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-db-view',
  templateUrl: './db-view.component.html',
  styleUrls: ['./db-view.component.less']
})
export class DbViewComponent implements OnInit {
  users: Observable<any[]>;
  customers: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.users = db.collection('users').snapshotChanges()
    this.customers = db.collection('customers').snapshotChanges()
  }

  ngOnInit(){}
}
