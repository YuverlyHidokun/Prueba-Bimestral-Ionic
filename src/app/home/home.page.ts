import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: { title: string; image: string }[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarItems()
  
  }
  cargarItems(){
    this.apiService.getLibros().subscribe((titles) => {
      titles.forEach((title, index) => {
        this.apiService.getImagen(index).subscribe((image) => {
          this.items.push({ title, image });
        });
      });
    });
  }

  // Guardar en Firebase
  saveItem(data: string) {
    this.apiService
      .guardarenFirebase(data)
      .then(() => alert('Guardado: ' + data))
      .catch((error) => alert('Error al guardar: ' + error));
  }
}
