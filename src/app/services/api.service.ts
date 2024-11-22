import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private LibroApi = 'https://gutendex.com/books?ids=1,2,3,4,5,6,7,8,9,10';
  private PerroApi = 'https://dog.ceo/api/breed/affenpinscher/images/random';
  private RobotApi = 'https://robohash.org/';

  constructor(private http: HttpClient) {}

  // Obtener libros
  getLibros(): Observable<string[]> {
    return this.http.get<any>(this.LibroApi).pipe(
      map((response) => response.results.map((libro: any) => libro.title))
    );
  }

  // Obtener imagen
  getImagen(index: number): Observable<string> {
    if (index % 2 === 0) {
      return this.http.get<{ message: string }>(this.PerroApi).pipe(
        map((res) => res.message)
      );
    } else {
      return new Observable((observer) => {
        observer.next(`${this.RobotApi}${index}.png`);
        observer.complete();
      });
    }
  }

  // Obtener libros combinados con imágenes
  getLibrosconImagenes(): Observable<{ title: string; image: string }[]> {
    return this.getLibros().pipe(
      switchMap((titles) => {
        const requests = titles.map((title, index) =>
          this.getImagen(index).pipe(
            map((image) => ({ title, image }))
          )
        );
        return forkJoin(requests);
      })
    );
  }
}
