import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/_services/storage.service';
import { EvalformationService } from 'src/app/_services/evalformation/evalformation.service';
import { EvalformationModalComponent } from '../evalformation-modal/evalformation-modal.component';

@Component({
  selector: 'app-gestion-evalformation',
  templateUrl: './gestion-evalformation.component.html',
  styleUrls: ['./gestion-evalformation.component.css']
})
export class GestionEvalformationComponent implements OnInit {

  evalformations: any[] = [];
  currentPageEvalformations: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  nouvellesevalformations: number = 0;
  evalformationsExpirees: number = 0;
  userId:any
  constructor(private evalformationService: EvalformationService, private modalService: NgbModal,private storageService:StorageService) { }

  ngOnInit(): void {
    this.loadAllevalformations();
   this.userId= this.storageService.getUser()
  }

  loadAllevalformations(): void {
    this.evalformationService.getAllEvaluations().subscribe(
      (data: any[]) => {
        this.evalformations = data;
        this.calculateStatistics();
        this.updateCurrentPageevalformations();
      },
      error => {
        console.error('Erreur lors de la récupération des formations :', error);
      }
    );
  }

  calculateStatistics(): void {
    const currentDate = new Date();

    this.nouvellesevalformations = this.evalformations.filter(evalformation => {
      const createDate = new Date(evalformation.createDate);
      return (currentDate.getTime() - createDate.getTime()) <= (30 * 24 * 60 * 60 * 1000);
    }).length;

    this.evalformationsExpirees = this.evalformations.filter(evalformation => {
      const expiryDate = new Date(evalformation.expiryDate);
      return expiryDate < currentDate;
    }).length;
  }

  updateCurrentPageevalformations(): void {
    this.totalPages = Math.ceil(this.evalformations.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPageEvalformations = this.evalformations.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPageevalformations();
    }
  }
  deleteEvaluation(id: number): void {
    console.log(`Deleting evaluation with id: ${id}`);
    this.evalformationService.deleteEvaluation(id)
      .subscribe(() => {
        this.evalformations = this.evalformations.filter(item => item.id !== id);
        console.log(`Evaluation with id ${id} deleted.`);
        this.updateCurrentPageevalformations();
      });
  }

  openModal(isEditing: boolean, evalformation?: any): void {
    const modalRef = this.modalService.open(EvalformationModalComponent);
    modalRef.componentInstance.evalformation = evalformation || {}; // Initialiser l'formation avec celle fournie ou un objet vide
    modalRef.componentInstance.isEditing = isEditing;

    modalRef.componentInstance.save.subscribe((result: any) => {
      //result.user=this.userId
       console.log(result)
      this.evalformationService.addEvaluation(result).subscribe((newevalformation: any) => {
        console.log('evaluation de formation ajoutée avec succès', newevalformation);
        this.evalformations.push(newevalformation);
      })
      modalRef.close();
    });

    modalRef.componentInstance.cancel.subscribe(() => {
      modalRef.close(); // Fermer la modal en cas d'annulation
    });
  }

  addEvaluation(evalformation: any): void {
    this.evalformationService.addEvaluation(evalformation).subscribe((newevalformation: any) => {
      this.evalformations.push(newevalformation);
      this.calculateStatistics();
      this.updateCurrentPageevalformations();
    }, error => {
      console.error('Erreur lors de l\'ajout de l\'formation :', error);
    });
  }

  updateEvaluation(evalformation: any): void {
    this.evalformationService.updateEvaluation(evalformation.id, evalformation).subscribe(() => {
      const index = this.evalformations.findIndex(o => o.id === evalformation.id);
      if (index !== -1) {
        this.evalformations[index] = { ...evalformation };
      }
      this.calculateStatistics();
      this.updateCurrentPageevalformations();
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'formation :', error);
    });
  }
}
