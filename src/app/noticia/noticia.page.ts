import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Noticia } from '../models/noticia';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  noticia: Noticia | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private titleService: Title
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getNoticiaById(id).subscribe(
      (data: Noticia) => {
        this.noticia = data;
        this.updatePageTitle(data.titulo); // Actualiza el título de la página
      },
      (error) => {
        console.error('Error al obtener la noticia:', error);
      }
    );
  }

  getFullImageUrl(imagen: string | undefined): string {
    return imagen ? `http://127.0.0.1:8000${imagen}` : '';
  }

  goBack() {
    this.location.back();
  }

  updatePageTitle(titulo: string) {
    this.titleService.setTitle(titulo);
  }
}
