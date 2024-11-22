import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private bookApi = 'https://gutendex.com/books?ids=1,2,3,4,5,6,7,8,9,10';
  private dogApi = 'https://dog.ceo/api/breed/affenpinscher/images/random';
  private robotApi = 'https://robohash.org/';

  constructor(private http: HttpClient) {}

  // Obtener libros
  getBooks(): Observable<string[]> {
    return this.http.get<any>(this.bookApi).pipe(
      map((response) => response.results.map((book: any) => book.title))
    );
  }

  // Obtener imagen
  getImage(index: number): Observable<string> {
    if (index % 2 === 0) {
      return this.http.get<{ message: string }>(this.dogApi).pipe(
        map((res) => res.message)
      );
    } else {
      return new Observable((observer) => {
        observer.next(`${this.robotApi}${index}.png`);
        observer.complete();
      });
    }
  }

  // Obtener libros combinados con imágenes
  getBooksWithImages(): Observable<{ title: string; image: string }[]> {
    return this.getBooks().pipe(
      switchMap((titles) => {
        const requests = titles.map((title, index) =>
          this.getImage(index).pipe(
            map((image) => ({ title, image }))
          )
        );
        return forkJoin(requests);
      })
    );
  }
}
