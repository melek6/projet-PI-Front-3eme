// gestion-quiz.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizService } from 'src/app/_services/quiz/quiz.service';
import { StorageService } from 'src/app/_services/storage.service';
import { QuizModalComponent } from '../quiz-modal/quiz-modal.component';
import { ModalAffQuestionComponent } from '../modal-aff-question/modal-aff-question.component';

@Component({
  selector: 'app-gestion-quiz',
  templateUrl: './gestion-quiz.component.html',
  styleUrls: ['./gestion-quiz.component.css']
})
export class GestionQuizComponent implements OnInit {
  quiz: any[] = [];
  question: any[] = [];
  currentPagequiz: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  nouvellesquiz: number = 0;
  quizExpirees: number = 0;
  userId: any;

  constructor(
    private quizService: QuizService,
    private modalService: NgbModal,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadAllquiz();
    this.userId = this.storageService.getUser();
  }

  loadAllquiz(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data: any[]) => {
        this.quiz = data;
        this.calculateStatistics();
        this.updateCurrentPagequiz();
      },
      error => {
        console.error('Erreur lors de la récupération des quiz :', error);
      }
    );
  }

  calculateStatistics(): void {
    const currentDate = new Date();

    this.nouvellesquiz = this.quiz.filter(quiz => {
      const createDate = new Date(quiz.createDate);
      return (currentDate.getTime() - createDate.getTime()) <= (30 * 24 * 60 * 60 * 1000);
    }).length;

    this.quizExpirees = this.quiz.filter(quiz => {
      const expiryDate = new Date(quiz.expiryDate);
      return expiryDate < currentDate;
    }).length;
  }

  updateCurrentPagequiz(): void {
    this.totalPages = Math.ceil(this.quiz.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPagequiz = this.quiz.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPagequiz();
    }
  }

  deletequiz(id: number): void {
    this.quizService.deleteQuizById(id).subscribe(() => {
      this.quiz = this.quiz.filter(quiz => quiz.id !== id);
      this.calculateStatistics();
      this.updateCurrentPagequiz();
    }, error => {
      console.error('Erreur lors de la suppression de l\'quiz :', error);
    });
  }

  openModal(isEditing: boolean, quiz?: any): void {
    const modalRef = this.modalService.open(QuizModalComponent);
    modalRef.componentInstance.quiz = quiz || {}; // Initialiser l'quiz avec celle fournie ou un objet vide
    modalRef.componentInstance.isEditing = isEditing;

    modalRef.componentInstance.save.subscribe((result: any) => {
      this.quizService.createOrUpdateQuiz(result).subscribe((newquiz: any) => {
        console.log('quiz ajoutée avec succès', newquiz);
        this.quiz.push(newquiz);
        this.calculateStatistics();
        this.updateCurrentPagequiz();
      });
      modalRef.close();
    });

    modalRef.componentInstance.cancel.subscribe(() => {
      modalRef.close(); // Fermer la modal en cas d'annulation
    });
  }

  addquiz(quiz: any): void {
    this.quizService.createOrUpdateQuiz(quiz).subscribe((newquiz: any) => {
      this.quiz.push(newquiz);
      this.calculateStatistics();
      this.updateCurrentPagequiz();
    }, error => {
      console.error('Erreur lors de l\'ajout de l\'quiz :', error);
    });
  }

  updatequiz(quiz: any): void {
    this.quizService.updateQuiz(quiz.id, quiz).subscribe(() => {
      const index = this.quiz.findIndex(o => o.id === quiz.id);
      if (index !== -1) {
        this.quiz[index] = { ...quiz };
      }
      this.calculateStatistics();
      this.updateCurrentPagequiz();
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'quiz :', error);
    });
  }

  openModal2(question: any): void {
    const modalRef = this.modalService.open(ModalAffQuestionComponent);
    modalRef.componentInstance.question = question || []; // Pass the questions to the modal

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close(); // Close the modal on close event
    });
  }

  getQuiz(id: any): void {
    this.quizService.getQuestionsByQuizId(id).subscribe((question: any) => {
      this.openModal2(question); // Open the modal with the questions
    }, error => {
      console.error('Erreur lors de la récupération des questions :', error);
    });
  }
}
