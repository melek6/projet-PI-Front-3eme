import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReponseService } from 'src/app/_services/reponse/reponse.service';
import { StorageService } from 'src/app/_services/storage.service';
import { ReponseModalComponent } from '../reponse-modal/ReponseModalComponent';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent implements OnInit {
  reponses: any[] = [];
  currentPageReponses: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private reponseService: ReponseService, private modalService: NgbModal, private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadAllReponses();
  }

  loadAllReponses(): void {
    this.reponseService.getAllReponses().subscribe(
      (data: any[]) => {
        this.reponses = data;
        this.updateCurrentPageReponses();
      },
      error => {
        console.error('Erreur lors de la récupération des réponses :', error);
      }
    );
  }

  updateCurrentPageReponses(): void {
    this.totalPages = Math.ceil(this.reponses.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPageReponses = this.reponses.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPageReponses();
    }
  }

  deleteReponse(id: number): void {
    this.reponseService.deleteReponseById(id).subscribe(() => {
      this.reponses = this.reponses.filter(reponse => reponse.id !== id);
      this.updateCurrentPageReponses();
    }, error => {
      console.error('Erreur lors de la suppression de la réponse :', error);
    });
  }

  openModal(isEditing: boolean, reponse?: any): void {
    const modalRef = this.modalService.open(ReponseModalComponent);
    modalRef.componentInstance.reponse = reponse || {};
    modalRef.componentInstance.isEditing = isEditing;
    this.loadQuestions();

    modalRef.componentInstance.save.subscribe((result: any) => {
      if (isEditing) {
        this.updateReponse(result);
      } else {
        this.addReponse(result);
      }
      modalRef.close();
    });

    modalRef.componentInstance.cancel.subscribe(() => {
      modalRef.close();
    });
  }

  addReponse(result: any): void {
    this.reponseService.createOrUpdateReponseForQuestion(result, result.questionId).subscribe((newReponse: any) => {
      this.reponses.push(newReponse);
      this.updateCurrentPageReponses();
    }, error => {
      console.error('Erreur lors de l\'ajout de la réponse :', error);
    });
  }

  updateReponse(reponse: any): void {
    this.reponseService.updateReponse(reponse.id, reponse).subscribe((updatedReponse: any) => {
      const index = this.reponses.findIndex(r => r.id === reponse.id);
      if (index !== -1) {
        this.reponses[index] = { ...updatedReponse };
      }
      this.updateCurrentPageReponses();
    }, error => {
      console.error('Erreur lors de la mise à jour de la réponse :', error);
    });
  }

  private loadQuestions(): void {
    // Charger les questions depuis votre service si nécessaire
  }
}
