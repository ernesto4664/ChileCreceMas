import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Noticia } from '../models/noticia';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  noticias: Noticia[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    register(); // Mover el registro dentro de ngOnInit
    this.apiService.getNoticias().subscribe(
      (data: Noticia[]) => {
        this.noticias = data;
      },
      (error) => {
        console.error('Error al obtener noticias:', error);
      }
    );
  }

  verDetalles(noticiaId: number) {
    this.router.navigate(['/noticia', noticiaId]);
  }

  getFullImageUrl(image: string | undefined): string {
    return image ? `http://127.0.0.1:8000${image}` : 'assets/default-image.png';
  }
}
