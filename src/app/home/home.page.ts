import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  books: any[] = [];
  loading: boolean = true;

  constructor(
    private apiService: ApiService,
    private alertController: AlertController // Inyectamos AlertController
  ) {}

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

  async saveBook(book: any) {
    const bookData = {
      title: book.title,
      image: book.dogImage || book.robotImage,
    };

    try {
      await this.apiService.saveBook(bookData);
      this.showAlert('¡Éxito!', 'El libro se guardó exitosamente.');
    } catch (error) {
      this.showAlert('Error', 'No se pudo guardar el libro.');
    }
  }

  // Método para mostrar el alert de Ionic
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'], // Botón de cierre
    });
    await alert.present();
  }
}
