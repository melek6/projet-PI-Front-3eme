import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from 'src/app/_services/question/question.service';
import { StorageService } from 'src/app/_services/storage.service';
import { QuestionModalComponent } from '../question-modal/question-modal.component';

@Component({
  selector: 'app-gestion-questions',
  templateUrl: './gestion-questions.component.html',
  styleUrls: ['./gestion-questions.component.css']
})
export class GestionquestionsComponent implements OnInit {
  question: any[] = [];
  currentPagequestion: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  nouvellesquestion: number = 0;
  questionExpirees: number = 0;
  userId:any
  constructor(private questionService: QuestionService, private modalService: NgbModal,private storageService:StorageService) { }

  ngOnInit(): void {
    this.loadAllquestion();
   this.userId= this.storageService.getUser()
  }

  loadAllquestion(): void {
    this.questionService.getAllQuestions().subscribe(
      (data: any[]) => {
        this.question = data;
        this.calculateStatistics();
        this.updateCurrentPagequestion();
      },
      error => {
        console.error('Erreur lors de la récupération des question :', error);
      }
    );
  }

  calculateStatistics(): void {
    const currentDate = new Date();

    this.nouvellesquestion = this.question.filter(question => {
      const createDate = new Date(question.createDate);
      return (currentDate.getTime() - createDate.getTime()) <= (30 * 24 * 60 * 60 * 1000);
    }).length;

    this.questionExpirees = this.question.filter(question => {
      const expiryDate = new Date(question.expiryDate);
      return expiryDate < currentDate;
    }).length;
  }

  updateCurrentPagequestion(): void {
    this.totalPages = Math.ceil(this.question.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPagequestion = this.question.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPagequestion();
    }
  }
  deletequestion(id: number): void {
    this.questionService.deleteQuestionById(id).subscribe(() => {
      this.question = this.question.filter(question => question.id !== id);
      this.calculateStatistics();
      this.updateCurrentPagequestion();
    }, error => {
      console.error('Erreur lors de la suppression de l\'question :', error);
    });
  }

  openModal(isEditing: boolean, question?: any): void {
    const modalRef = this.modalService.open(QuestionModalComponent);
    modalRef.componentInstance.question = question || {}; // Initialiser l'question avec celle fournie ou un objet vide
    modalRef.componentInstance.isEditing = isEditing;

    modalRef.componentInstance.save.subscribe((result: any) => {
      //result.user=this.userId
       console.log(result)
      this.questionService.createOrUpdateQuestion(result).subscribe((newquestion: any) => {
        console.log('question ajoutée avec succès', newquestion);
        this.question.push(newquestion);
      })
      modalRef.close();
    });

    modalRef.componentInstance.cancel.subscribe(() => {
      modalRef.close(); // Fermer la modal en cas d'annulation
    });
  }

  addquestion(question: any): void {
    this.questionService.createOrUpdateQuestion(question).subscribe((newquestion: any) => {
      this.question.push(newquestion);
      this.calculateStatistics();
      this.updateCurrentPagequestion();
    }, error => {
      console.error('Erreur lors de l\'ajout de l\'question :', error);
    });
  }

  updatequestion(question: any): void {
    this.questionService.updateQuestion(question.id, question).subscribe(() => {
      const index = this.question.findIndex(o => o.id === question.id);
      if (index !== -1) {
        this.question[index] = { ...question };
      }
      this.calculateStatistics();
      this.updateCurrentPagequestion();
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'question :', error);
    });
  }
}
