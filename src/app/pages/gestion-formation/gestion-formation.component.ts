import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/_services/formation/formation.service';
import { StorageService } from 'src/app/_services/storage.service';
import { FormationModalComponent } from '../formation-modal/formation-modal.component';

@Component({
  selector: 'app-gestion-formation',
  templateUrl: './gestion-formation.component.html',
  styleUrls: ['./gestion-formation.component.css']
})
export class GestionFormationComponent implements OnInit {
  formations: any[] = [];
  currentPageformations: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  nouvellesformations: number = 0;
  formationsExpirees: number = 0;
  userId:any
  constructor(private formationService: FormationService, private modalService: NgbModal,private storageService:StorageService) { }

  ngOnInit(): void {
    this.loadAllformations();
   this.userId= this.storageService.getUser()
  }

  loadAllformations(): void {
    this.formationService.getAllFormations().subscribe(
      (data: any[]) => {
        this.formations = data;
        this.calculateStatistics();
        this.updateCurrentPageformations();
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

  updateCurrentPageformations(): void {
    this.totalPages = Math.ceil(this.formations.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPageformations = this.formations.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPageformations();
    }
  }
  deleteFormation(id: number): void {
    this.formationService.deleteFormation(id).subscribe(() => {
      this.formations = this.formations.filter(formation => formation.id !== id);
      this.calculateStatistics();
      this.updateCurrentPageformations();
    }, error => {
      console.error('Erreur lors de la suppression de l\'formation :', error);
    });
  }

  openModal(isEditing: boolean, formation?: any): void {
    const modalRef = this.modalService.open(FormationModalComponent);
    modalRef.componentInstance.formation = formation || {}; // Initialiser l'formation avec celle fournie ou un objet vide
    modalRef.componentInstance.isEditing = isEditing;

    modalRef.componentInstance.save.subscribe((result: any) => {
      //result.user=this.userId
       console.log(result)
      this.formationService.createFormation(result).subscribe((newformation: any) => {
        console.log('formation ajoutée avec succès', newformation);
        this.formations.push(newformation);
      })
      modalRef.close();
    });

    modalRef.componentInstance.cancel.subscribe(() => {
      modalRef.close(); // Fermer la modal en cas d'annulation
    });
  }

  addFormation(formation: any): void {
    this.formationService.createFormation(formation).subscribe((newformation: any) => {
      this.formations.push(newformation);
      this.calculateStatistics();
      this.updateCurrentPageformations();
    }, error => {
      console.error('Erreur lors de l\'ajout de l\'formation :', error);
    });
  }

  updateFormation(formation: any): void {
    this.formationService.updateFormation(formation.id, formation).subscribe(() => {
      const index = this.formations.findIndex(o => o.id === formation.id);
      if (index !== -1) {
        this.formations[index] = { ...formation };
      }
      this.calculateStatistics();
      this.updateCurrentPageformations();
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'formation :', error);
    });
  }
}
