import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Noticia } from '../models/noticia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-home',
  templateUrl: './guest-home.page.html',
  styleUrls: ['./guest-home.page.scss'],
})
export class GuestHomePage implements OnInit {
  noticias: Noticia[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getNoticias().subscribe(
      (data: Noticia[]) => {
        this.noticias = data;
      },
      (error) => {
        console.error('Error al obtener noticias:', error);
      }
    );
  }

  getFullImageUrl(imagePath: string | undefined): string {
    return imagePath ? `http://127.0.0.1:8000${imagePath}` : 'assets/default-image.png';
  }

  verDetalles(noticiaId: number) {
    this.router.navigate(['/noticia', noticiaId]);
  }
}
