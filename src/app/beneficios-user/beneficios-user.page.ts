import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beneficios-user',
  templateUrl: './beneficios-user.page.html',
  styleUrls: ['./beneficios-user.page.scss'],
})
export class BeneficiosUserPage implements OnInit {
  familiares: any[] = [];
  beneficios: any[] = [];
  selectedFamiliar: any = null;
  errorMessage: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFamilyMembers();
  }

  getFamilyMembers() {
    this.apiService.getFamilyMembers().subscribe(
      (response: any) => {
        this.familiares = response;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los miembros de la familia; intente nuevamente más tarde.';
        console.error('An error occurred:', error);
      }
    );
  }

  onFamilyMemberChange(event: any) {
    const selectedId = event.detail.value;
    this.apiService.getFamilyMemberBenefits(selectedId).subscribe(
      (response: any) => {
        this.selectedFamiliar = response.familiar;
        this.selectedFamiliar.etapa = response.familiar.etapa_actual?.nombre || 'No definida';

        // Obtener la comuna del familiar o del usuario principal
        this.selectedFamiliar.comuna = response.familiar.comuna?.nombre || response.familiar.usuario?.comuna?.nombre || 'No aplica';

        this.beneficios = response.beneficios;

        console.log('Selected Familiar:', this.selectedFamiliar);
        console.log('Beneficios:', this.beneficios);
      },
      (error) => {
        this.errorMessage = 'Error al cargar los beneficios; intente nuevamente más tarde.';
        console.error('An error occurred:', error);
      }
    );
  }

  onClickTest() {
    console.log('Select fue clicado');
  }

  goToDetalle(beneficioId: number) {
    // Navegar a BeneficioDetalleUserPage con los detalles del familiar seleccionado
    this.router.navigate(['/beneficio-detalle-user', beneficioId], {
      queryParams: {
        familiar: JSON.stringify(this.selectedFamiliar)
      }
    });
  }
}
