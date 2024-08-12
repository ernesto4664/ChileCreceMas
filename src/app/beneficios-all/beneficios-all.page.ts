import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beneficios-all',
  templateUrl: './beneficios-all.page.html',
  styleUrls: ['./beneficios-all.page.scss'],
})
export class BeneficiosAllPage implements OnInit {

  beneficiosForm: FormGroup;
  beneficios: any[] = [];
  filteredBeneficios: any[] = [];
  regiones: any[] = [];
  comunas: { id: number; nombre: string }[] = [];

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.beneficiosForm = this.fb.group({
      region: [''],
      comuna: [''],
      tipoPersona: [''],
    });
  }

  ngOnInit() {
    this.loadBeneficios();
  }

  loadBeneficios() {
    this.http.get<any[]>(`${this.apiUrl}/public-beneficios`).subscribe((data: any[]) => {
      this.beneficios = data;
      this.loadRegiones(); // Carga las regiones después de cargar los beneficios
    });
  }

  loadRegiones() {
    this.regiones = this.beneficios.reduce((acc: any[], beneficio: any) => {
      beneficio.regiones.forEach((region: any) => {
        if (!acc.find((r: any) => r.id === region.id)) {
          acc.push(region);
        }
      });
      return acc;
    }, []);
  }

  onRegionChange(event: any) {
    const regionId = event.detail.value;
    console.log('Región seleccionada:', regionId);

    this.http.get<{ id: number; nombre: string }[]>(`${this.apiUrl}/public-regiones/${regionId}/comunas`)
      .subscribe((comunas: { id: number; nombre: string }[]) => {
        // Filtrar comunas para que solo se muestren las que tienen beneficios
        const comunasConBeneficios = comunas.filter(comuna =>
          this.beneficios.some(beneficio => 
            beneficio.ubicaciones.some((ubicacion: any) => ubicacion.comuna_id === comuna.id)
          )
        );

        this.comunas = comunasConBeneficios;
        console.log('Comunas filtradas con beneficios:', this.comunas);

        this.beneficiosForm.patchValue({ comuna: '' });
        this.filterBeneficios(); // Filtra beneficios según los criterios seleccionados
      }, error => {
        console.error('Error fetching comunas:', error);
      });
  }

  onComunaChange(event: any) {
    this.filterBeneficios();
  }

  onTipoPersonaChange(event: any) {
    this.filterBeneficios();
  }

  filterBeneficios() {
    const filters = this.beneficiosForm.value;

    this.filteredBeneficios = this.beneficios.filter((beneficio: any) => {
      const matchRegion = beneficio.ubicaciones.some(
        (ubicacion: any) => ubicacion.region_id === filters.region
      );

      const matchComuna = beneficio.ubicaciones.some(
        (ubicacion: any) => this.comunas.some(comuna => comuna.id === ubicacion.comuna_id)
      );

      const matchTipoPersona = !filters.tipoPersona || beneficio.tipo_registro_id === +filters.tipoPersona;

      return matchRegion && matchComuna && matchTipoPersona;
    });

    console.log('Beneficios filtrados:', this.filteredBeneficios);
  }

  goToDetalle(beneficioId: number) {
    const regionControl = this.beneficiosForm.get('region');
    const comunaControl = this.beneficiosForm.get('comuna');
  
    if (regionControl && comunaControl) {
      const selectedRegionId = regionControl.value;
      const selectedComunaId = comunaControl.value;
  
      this.router.navigate(['/beneficio-detalle', beneficioId], {
        queryParams: { regionId: selectedRegionId, comunaId: selectedComunaId }
      });
    } else {
      console.error('Region or Comuna control does not exist.');
    }
  }

}
