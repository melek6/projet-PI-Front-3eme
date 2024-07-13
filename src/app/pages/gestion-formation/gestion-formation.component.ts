import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/_services/formation/formation.service';
import { StorageService } from 'src/app/_services/storage.service';
import { FormationModalComponent } from '../formation-modal/formation-modal.component';
import { FormationCategory } from 'src/app/pages/gestion-formation/formation-category.enum';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';


export interface Formation {
  id: number;
  title: string;
  description: string;
  trainer: string;
  startDate: string;
  endDate: string;
  location: string;
  price: number;
  numberOfHours: number;
  category: string;
  planning?: string;
  planningUrl?: string;
  bestSeller?: boolean;
  userId?: number;
  evaluations?: any[];
  inscriptions?: any[];
}

@Component({
  selector: 'app-gestion-formation',
  templateUrl: './gestion-formation.component.html',
  styleUrls: ['./gestion-formation.component.css']
})
export class GestionFormationComponent implements OnInit {
  formations: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['title', 'description', 'location', 'startDate', 'endDate', 'price', 'numberOfHours', 'category', 'trainer', 'actions'];
  categories: string[] = Object.values(FormationCategory);
  selectedCategory: string = 'Toutes';
  userId: any;
  errorMessage: string = '';
  confirmationModalRef: NgbModalRef;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number;
  selectedFile: File | null = null;
  uploadResponse: string | null = null;
  
  nouvellesformations: number = 0; // Ajouter cette ligne
  formationsExpirees: number = 0; // Ajouter cette ligne

  @ViewChild('confirmationModal') confirmationModal: TemplateRef<any>;

  constructor(private formationService: FormationService, private modalService: NgbModal, private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadAllFormations();
    this.userId = this.storageService.getUser();
  }

  loadAllFormations(): void {
    this.formationService.getAllFormations().subscribe(
      (data: any[]) => {
        this.formations = data;
        this.totalPages = Math.ceil(this.formations.length / this.pageSize);
        this.dataSource.data = this.getPaginatedData();
        this.calculateStatistics(); // Ajouter cette ligne
      },
      error => {
        console.error('Erreur lors de la récupération des formations :', error);
      }
    );
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.formations.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.dataSource.data = this.getPaginatedData();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.dataSource.data = this.getPaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.dataSource.data = this.getPaginatedData();
    }
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
        this.formationService.createFormation(result).subscribe((newFormation: any) => {
          this.formations.push(newFormation);
          this.totalPages = Math.ceil(this.formations.length / this.pageSize);
          this.dataSource.data = this.getPaginatedData();
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
        this.totalPages = Math.ceil(this.formations.length / this.pageSize);
        this.dataSource.data = this.getPaginatedData();
      }, error => {
        console.error('Erreur lors de la suppression de la formation :', error);
      });
    }
  }

  updateFormation(formation: any): void {
    this.formationService.updateFormation(formation.id, formation).subscribe(() => {
      const index = this.formations.findIndex(o => o.id === formation.id);
      if (index !== -1) {
        this.formations[index] = { ...formation };
        this.dataSource.data = this.getPaginatedData();
      }
    }, error => {
      console.error('Erreur lors de la mise à jour de la formation :', error);
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

  calculateStatistics(): void {
    const currentDate = new Date();

    this.nouvellesformations = this.formations.filter(formation => {
      const createDate = new Date(formation.startDate);
      return (currentDate.getTime() - createDate.getTime()) <= (30 * 24 * 60 * 60 * 1000); // Formations créées dans les 30 derniers jours
    }).length;

    this.formationsExpirees = this.formations.filter(formation => {
      const expiryDate = new Date(formation.endDate);
      return expiryDate < currentDate;
    }).length;
  }

  uploadPlanningfIREBASE(event: any, formationId: number): void {
    const file: File = event.target.files[0];
    if (file) {
      this.formationService.uploadPlanning(formationId, file).subscribe(
        response => {
          this.uploadResponse = 'File uploaded successfully!';
        },
        error => {
          this.uploadResponse = 'File upload failed!';
        }
      );
    }
  }

  downloadPlanning(fileName: string): void {
    if (!fileName) {
      console.error('File name is undefined or empty');
      return;
    }
  
    this.formationService.downloadPlanning(fileName).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
  }
  
  
}
