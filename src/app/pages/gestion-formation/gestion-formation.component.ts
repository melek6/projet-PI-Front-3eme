import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/_services/formation/formation.service';
import { StorageService } from 'src/app/_services/storage.service';
import { FormationModalComponent } from '../formation-modal/formation-modal.component';
import { FormationCategory } from 'src/app/pages/gestion-formation/formation-category.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gestion-formation',
  templateUrl: './gestion-formation.component.html',
  styleUrls: ['./gestion-formation.component.css']
})
export class GestionFormationComponent implements OnInit {
  formations: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['title', 'description', 'location', 'startDate', 'endDate', 'price', 'numberOfHours', 'category', 'bestSeller', 'newFormation', 'actions'];
  nouvellesformations: number = 0;
  formationsExpirees: number = 0;
  categories: string[] = Object.values(FormationCategory);
  selectedCategory: string = 'Toutes';
  userId: any;
  errorMessage: string = '';
  confirmationModalRef: NgbModalRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('confirmationModal') confirmationModal: TemplateRef<any>; // Ajoutez cette ligne

  constructor(private formationService: FormationService, private modalService: NgbModal, private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadAllformations();
    this.userId = this.storageService.getUser();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadAllformations(): void {
    this.formationService.getAllFormations().subscribe(
      (data: any[]) => {
        this.formations = data;
        this.dataSource.data = data;
        this.calculateStatistics();
      },
      error => {
        console.error('Erreur lors de la récupération des formations :', error);
      }
    );
  }

  calculateStatistics(): void {
    const currentDate = new Date();

    this.nouvellesformations = this.formations.filter(formation => {
      const createDate = new Date(formation.createDate);
      return (currentDate.getTime() - createDate.getTime()) <= (30 * 24 * 60 * 60 * 1000);
    }).length;

    this.formationsExpirees = this.formations.filter(formation => {
      const expiryDate = new Date(formation.expiryDate);
      return expiryDate < currentDate;
    }).length;
  }

  openModal(isEditing: boolean, formation?: any): void {
    const modalRef = this.modalService.open(FormationModalComponent);
    modalRef.componentInstance.formation = formation || {}; 
    modalRef.componentInstance.isEditing = isEditing;

    modalRef.componentInstance.save.subscribe((result: any) => {
      if (new Date(result.startDate) >= new Date(result.endDate)) {
        this.errorMessage = 'La date de début doit être antérieure à la date de fin';
        return;
      }

      if (isEditing) {
        this.updateFormation(result);
      } else {
        this.formationService.createFormation(result).subscribe((newformation: any) => {
          console.log('formation ajoutée avec succès', newformation);
          this.formations.push(newformation);
          this.dataSource.data = this.formations; // Mettre à jour le dataSource
          modalRef.close();
          this.openConfirmationModal();
        });
      }
    });

    modalRef.componentInstance.cancel.subscribe(() => {
      modalRef.close(); 
    });
  }

  openConfirmationModal(): void {
    this.confirmationModalRef = this.modalService.open(this.confirmationModal, { size: 'sm' });
  }

  closeConfirmationModal(): void {
    if (this.confirmationModalRef) {
      this.confirmationModalRef.close();
    }
  }

  deleteFormation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      this.formationService.deleteFormation(id).subscribe(() => {
        this.formations = this.formations.filter(formation => formation.id !== id);
        this.dataSource.data = this.formations; // Mettre à jour le dataSource
        this.calculateStatistics();
      }, error => {
        console.error('Erreur lors de la suppression de l\'formation :', error);
      });
    }
  }

  updateFormation(formation: any): void {
    this.formationService.updateFormation(formation.id, formation).subscribe(() => {
      const index = this.formations.findIndex(o => o.id === formation.id);
      if (index !== -1) {
        this.formations[index] = { ...formation };
        this.dataSource.data = this.formations; // Mettre à jour le dataSource
      }
      this.calculateStatistics();
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'formation :', error);
    });
  }

  uploadPlanning(event: any, formationId: number): void {
    const file: File = event.target.files[0];
    if (file) {
      this.formationService.uploadPlanning(formationId, file).subscribe(
        response => {
          console.log('Planning uploaded successfully', response);
        },
        error => {
          console.error('Error uploading planning:', error);
        }
      );
    }
  }

  filterByCategory(): void {
    if (this.selectedCategory === 'Toutes') {
      this.dataSource.data = this.formations;
    } else {
      this.dataSource.data = this.formations.filter(formation => formation.category === this.selectedCategory);
    }
    this.dataSource.paginator?.firstPage(); // Retour à la première page après le filtrage
  }
}
