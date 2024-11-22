import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  books: any[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.apiService.getLibros().subscribe((data: any) => {
      this.books = data.results; 
      this.books.forEach((book, index) => {
        if (index % 2 === 0) {

          this.apiService.getRandomDog().subscribe((dogData: any) => {
            book.dogImage = dogData.message; 
            this.checkIfLoadingFinished();
          });
        } else {

          this.apiService.getRandomRobot(book.title).subscribe((robotBlob: Blob) => {
            book.robotImage = URL.createObjectURL(robotBlob);
            this.checkIfLoadingFinished(); 
          });
        }
      });
    });
  }

  checkIfLoadingFinished() {
    if (this.books.every(book => book.dogImage || book.robotImage)) {
      this.loading = false;
    }
  }

  saveBook(book: any) {
    const bookData = {
      title: book.title,
      image: book.dogImage || book.robotImage
    };

    this.apiService.saveBook(bookData).then(() => {
      alert('Se guardó el libro exitosamente!');
    }).catch((error) => {
      alert('No se pudo guardar el libro');
    });
  }
}
