import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionSnapshots, docSnapshots, doc, updateDoc, deleteDoc, collectionData } from '@angular/fire/firestore';
import { Gig } from "./gig.model";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class GigService {
/*
  constructor(private firestore: Firestore) {}

  getGigs(): Observable<Gig[]> {
    const gigsCollection = collection(this.firestore, 'gigs');
    // returns a stream of documents mapped to their payload and id
    return collectionData(gigsCollection, {idField: 'id'})
    .pipe(
    map(gigs => gigs as Gig[])
    );
    }
*/
    collection = 'gigs';

    constructor(private firestore: Firestore) {}

    getDocument(id: string) {
        return docSnapshots( doc(this.firestore, `${this.collection}/${id}`) );
    }

    getList() {
        return collectionSnapshots( collection(this.firestore, this.collection) );
    }

}