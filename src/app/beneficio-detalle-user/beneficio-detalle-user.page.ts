import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-beneficio-detalle-user',
  templateUrl: './beneficio-detalle-user.page.html',
  styleUrls: ['./beneficio-detalle-user.page.scss'],
})
export class BeneficioDetalleUserPage implements OnInit {
  beneficioId!: number;
  beneficio: any;
  googleMapsUrl: SafeResourceUrl | undefined;
  selectedFamiliar: any = null;
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

      // Obtener la información del familiar desde los parámetros de consulta (queryParams)
      const familiarParam = this.route.snapshot.queryParamMap.get('familiar');
      if (familiarParam) {
        this.selectedFamiliar = JSON.parse(familiarParam);
        console.log('Familiar seleccionado:', this.selectedFamiliar);
      }

      this.loadBeneficioDetalle();
    } else {
      console.error('ID del beneficio no encontrado en la URL');
    }
  }

  loadBeneficioDetalle() {
    this.http.get(`${this.apiUrl}/public-beneficios/${this.beneficioId}`).subscribe((data: any) => {
      this.beneficio = data;

      // Filtrar las ubicaciones según la región y comuna del familiar seleccionado
      if (this.selectedFamiliar) {
        const selectedRegionId = this.selectedFamiliar.usuario.comuna.region_id;
        const selectedComunaId = this.selectedFamiliar.usuario.comuna.id;

        this.filteredUbicaciones = this.beneficio.ubicaciones.filter((ubicacion: any) => {
          return ubicacion.region_id === selectedRegionId && ubicacion.comuna_id === selectedComunaId;
        });
      } else {
        // Si no hay familiar seleccionado, mostrar todas las ubicaciones
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
    this.router.navigate(['/beneficio-detalle-user', beneficioId]);
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
