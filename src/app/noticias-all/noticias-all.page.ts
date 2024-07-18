import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-noticias-all',
  templateUrl: './noticias-all.page.html',
  styleUrls: ['./noticias-all.page.scss'],
})
export class NoticiasAllPage implements OnInit {
  noticias: any[] = [];
  currentPage = 1;
  totalPages = 0;
  router: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadNoticias();
  }

  loadNoticias(page: number = 1) {
    this.apiService.getNoticiasPaginadas(page).subscribe(
      data => {
        console.log('Data received from API:', data);
        this.noticias = data.data;
        this.currentPage = data.current_page;
        this.totalPages = data.last_page;
      },
      error => {
        console.error('Error al cargar noticias:', error);
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadNoticias(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadNoticias(this.currentPage);
    }
  }

  getFullImageUrl(imagePath: string | undefined): string {
    return imagePath ? `http://127.0.0.1:8000${imagePath}` : 'assets/default-image.png';
  }

  onImageError(event: any) {
    event.target.src = 'assets/default-image.png';
  }

  irAlDetalle(id: number) {
    this.router.navigate(['/noticia-detalle', id]);
  }
}
