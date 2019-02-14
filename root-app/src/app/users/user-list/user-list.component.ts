import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  users$: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.users$ = db.collection('customers').snapshotChanges()
  }

  ngOnInit() {
  }

}
