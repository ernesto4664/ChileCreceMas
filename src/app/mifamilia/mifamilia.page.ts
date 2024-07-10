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
  familyMembers: any[] = [];
  familyForm: FormGroup;
  editing = false;
  editingMemberId: number | null = null;
  hasPregnantMember = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.familyForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      sexo: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      semanas_embarazo: [''],
      parentesco: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadFamilyMembers();
  }

  async loadFamilyMembers() {
    this.apiService.getFamilyMembers().subscribe(
      data => {
        this.familyMembers = data;
        this.hasPregnantMember = this.familyMembers.some(member => member.semanas_embarazo > 0);
      },
      error => {
        console.error('Error al cargar miembros de la familia:', error);
        this.presentAlert('Error', 'Error al cargar miembros de la familia: ' + error);
      }
    );
  }

  async addOrUpdateFamilyMember() {
    if (this.familyForm.valid) {
      if (this.editing && this.editingMemberId !== null) {
        this.apiService.updateFamilyMember(this.editingMemberId, this.familyForm.value).subscribe(
          () => {
            this.loadFamilyMembers();
            this.familyForm.reset();
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
        this.apiService.addFamilyMember(this.familyForm.value).subscribe(
          () => {
            this.loadFamilyMembers();
            this.familyForm.reset();
            this.presentAlert('Éxito', 'Miembro de la familia agregado satisfactoriamente.');
          },
          error => {
            console.error('Error al añadir miembro de la familia:', error);
            this.presentAlert('Error', 'Error al añadir miembro de la familia: ' + error);
          }
        );
      }
    }
  }

  async editFamilyMember(member: any) {
    this.editing = true;
    this.editingMemberId = member.id;
    this.familyForm.patchValue(member);
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
    this.familyForm.reset();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
