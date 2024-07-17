import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mifamilia',
  templateUrl: './mifamilia.page.html',
  styleUrls: ['./mifamilia.page.scss'],
})
export class MifamiliaPage implements OnInit {
  familyMembers: FamilyMember[] = [];
  semanasEmbarazos: any[] = [];
  tiposDeRegistro: any[] = [];
  gestanteForm: FormGroup;
  ninoForm: FormGroup;
  pgestanteForm: FormGroup;
  editing = false;
  editingMemberId: number | null = null;
  selectedOption: number | null = null;
  currentUser: any;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.gestanteForm = this.formBuilder.group({
      tipo_registro: ['gestante', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      semanas_embarazo_id: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      tipoderegistro_id: [1, Validators.required]
    });
  
    this.ninoForm = this.formBuilder.group({
      tipo_registro: ['nino', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      parentesco: ['', Validators.required],
      tipoderegistro_id: [2, Validators.required]
    });
  
    this.pgestanteForm = this.formBuilder.group({
      tipo_registro: ['Pgestante', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      semanas_embarazo_id: ['', Validators.required],
      parentesco: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      tipoderegistro_id: [3, Validators.required]
    });
  }

  ngOnInit() {
    this.loadFamilyMembers();
    this.loadSemanasEmbarazos();
    this.loadTiposDeRegistro();
    this.loadCurrentUser();
  }

  onTipoRegistroChange(event: any) {
    this.selectedOption = event.detail.value;
    if (this.selectedOption === 1) { // Asumiendo que gestante tiene id 1
      this.gestanteForm.patchValue({
        nombres: this.currentUser.nombres,
        apellidos: this.currentUser.apellidos,
        fecha_nacimiento: this.currentUser.fecha_nacimiento
      });
    }
  }

  async loadFamilyMembers() {
    this.apiService.getFamilyMembers().subscribe(
      data => {
        this.familyMembers = data;
      },
      error => {
        console.error('Error al cargar miembros de la familia:', error);
        this.presentAlert('Error', 'Error al cargar miembros de la familia: ' + error);
      }
    );
  }

  async loadSemanasEmbarazos() {
    this.apiService.getSemanasEmbarazo().subscribe(
      data => {
        this.semanasEmbarazos = data;
      },
      error => {
        console.error('Error al cargar semanas de embarazo:', error);
        this.presentAlert('Error', 'Error al cargar semanas de embarazo: ' + error);
      }
    );
  }

  async loadTiposDeRegistro() {
    this.apiService.getTiposDeRegistro().subscribe(
      data => {
        this.tiposDeRegistro = data;
      },
      error => {
        console.error('Error al cargar tipos de registro:', error);
        this.presentAlert('Error', 'Error al cargar tipos de registro: ' + error);
      }
    );
  }

  async loadCurrentUser() {
    this.apiService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
      },
      error => {
        console.error('Error al cargar datos del usuario:', error);
        this.presentAlert('Error', 'Error al cargar datos del usuario: ' + error);
      }
    );
  }

  isGestanteOptionUsed(): boolean {
    return this.familyMembers.some(member => member.tipoderegistro_id === 1);
  }

  async addOrUpdateFamilyMember(form: FormGroup) {
    if (form.valid) {
      const formData = form.value;
      
      if (this.selectedOption === 1) {
        formData.fecha_nacimiento = this.currentUser.fecha_nacimiento;
      }
  
      formData.usuarioP_id = this.currentUser.id; // Añadir el usuarioP_id
  
      if (this.editing && this.editingMemberId !== null) {
        this.apiService.updateFamilyMember(this.editingMemberId, formData).subscribe(
          () => {
            this.loadFamilyMembers();
            form.reset();
            this.editing = false;
            this.editingMemberId = null;
            this.presentAlert('Éxito', 'Miembro de la familia actualizado satisfactoriamente.');
          },
          error => {
            console.error('Error al actualizar miembro de la familia:', error);
            this.presentAlert('Error', 'Error al actualizar miembro de la familia: ' + error);
          }
        );
      } else {
        this.apiService.addFamilyMember(formData).subscribe(
          () => {
            this.loadFamilyMembers();
            form.reset();
            this.presentAlert('Éxito', 'Miembro de la familia agregado satisfactoriamente.');
          },
          error => {
            console.error('Error al añadir miembro de la familia:', error);
            this.presentAlert('Error', 'Error al añadir miembro de la familia: ' + error);
          }
        );
      }
    } else {
      this.presentAlert('Error', 'Por favor, completa todos los campos correctamente.');
    }
  }

  async editFamilyMember(member: FamilyMember) {
    this.editing = true;
    this.editingMemberId = member.id;
    this.selectedOption = member.tipoderegistro_id;

    if (member.tipoderegistro_id === 1) {
      this.gestanteForm.patchValue(member);
    } else if (member.tipoderegistro_id === 2) {
      this.ninoForm.patchValue(member);
    } else if (member.tipoderegistro_id === 3) {
      this.pgestanteForm.patchValue(member);
    }
  }

  async deleteFamilyMember(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este familiar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.apiService.deleteFamilyMember(id).subscribe(
              () => {
                this.loadFamilyMembers();
                this.presentAlert('Éxito', 'Miembro de la familia eliminado satisfactoriamente.');
              },
              error => {
                console.error('Error al eliminar miembro de la familia:', error);
                this.presentAlert('Error', 'Error al eliminar miembro de la familia: ' + error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  cancelEdit() {
    this.editing = false;
    this.editingMemberId = null;
    this.selectedOption = null;
    this.gestanteForm.reset();
    this.ninoForm.reset();
    this.pgestanteForm.reset();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  calculateAge(fecha_nacimiento: string): number {
    const today = new Date();
    const birthDate = new Date(fecha_nacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}

interface FamilyMember {
  id: number;
  nombres: string;
  apellidos: string;
  parentesco?: string;
  edad?: number;
  sexo?: string;
  fecha_nacimiento?: string;
  semanas_embarazo_id?: number;
  tipoderegistro_id: number;
}
