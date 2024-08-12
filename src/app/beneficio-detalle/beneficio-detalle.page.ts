import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-beneficio-detalle',
  templateUrl: './beneficio-detalle.page.html',
  styleUrls: ['./beneficio-detalle.page.scss'],
})
export class BeneficioDetallePage implements OnInit {
  beneficioId!: number;
  beneficio: any;
  googleMapsUrl: SafeResourceUrl | undefined;
  selectedRegionId: number | null = null;
  selectedComunaId: number | null = null;
  filteredUbicaciones: any[] = [];

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.beneficioId = +id;

      // Obtener los parámetros de región y comuna desde la URL si existen
      const regionIdParam = this.route.snapshot.queryParamMap.get('regionId');
      const comunaIdParam = this.route.snapshot.queryParamMap.get('comunaId');

      if (regionIdParam) {
        this.selectedRegionId = +regionIdParam;
      }

      if (comunaIdParam) {
        this.selectedComunaId = +comunaIdParam;
      }

      this.loadBeneficioDetalle();
    } else {
      console.error('ID del beneficio no encontrado en la URL');
    }
  }

  loadBeneficioDetalle() {
    this.http.get(`${this.apiUrl}/public-beneficios/${this.beneficioId}`).subscribe((data: any) => {
      this.beneficio = data;

      console.log('Región seleccionada:', this.selectedRegionId);
      console.log('Comuna seleccionada:', this.selectedComunaId);

      // Filtrar las ubicaciones por región y comuna si están disponibles
      if (this.selectedRegionId && this.selectedComunaId) {
        this.filteredUbicaciones = this.beneficio.ubicaciones.filter((ubicacion: any) => {
          return ubicacion.region_id === this.selectedRegionId && ubicacion.comuna_id === this.selectedComunaId;
        });
      } else {
        // Si no se pasan parámetros de región y comuna, mostramos todas las ubicaciones
        this.filteredUbicaciones = this.beneficio.ubicaciones;
      }

      console.log('Ubicaciones filtradas:', this.filteredUbicaciones);

      // Si hay ubicaciones filtradas, genera la URL de Google Maps para la primera ubicación
      if (this.filteredUbicaciones.length > 0) {
        const ubicacion = this.filteredUbicaciones[0];
        this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getGoogleMapsEmbedUrl(ubicacion));
      }
    });
  }

  goToDetalle(beneficioId: number) {
    this.router.navigate(['/beneficio-detalle', beneficioId]);
  }

  getFullImageUrl(imagePath: string): string {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  }

  getGoogleMapsEmbedUrl(ubicacion: any): string {
    const baseMapsUrl = 'https://www.google.com/maps/embed/v1/place?key=';
    let mapsUrl = '';

    if (ubicacion.direccion) {
      const direccion = encodeURIComponent(`${ubicacion.direccion}, ${ubicacion.comuna?.nombre || ''}, ${ubicacion.region?.nombre || ''}`);
      mapsUrl = `${baseMapsUrl}${environment.googleMapsApiKey}&q=${direccion}`;
    } else if (ubicacion.lat && ubicacion.long) {
      mapsUrl = `${baseMapsUrl}${environment.googleMapsApiKey}&q=${ubicacion.lat},${ubicacion.long}`;
    }

    console.log('Generated Google Maps URL:', mapsUrl);
    return mapsUrl;
  }
}
