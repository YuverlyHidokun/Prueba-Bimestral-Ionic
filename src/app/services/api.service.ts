import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private bookUrl = 'https://gutendex.com/books?ids=2,4,6,8,10,12,14,16,18,20';
  private dogUrl = 'https://dog.ceo/api/breed/beagle/images/random';
  private robotUrl = 'https://robohash.org/hola';

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  getLibros(): Observable<any> {
    return this.http.get(this.bookUrl);
  }

  getRandomDog(): Observable<any> {
    return this.http.get(this.dogUrl);
  }

  getRandomRobot(title: string): Observable<any> {
    return this.http.get(`https://robohash.org/${title}`, { responseType: 'blob' });
  }

  saveBook(book: any) {
    return this.firestore.collection('Libros').add(book);
  }
}
