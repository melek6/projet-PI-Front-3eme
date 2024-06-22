import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizService } from 'src/app/_services/quiz/quiz.service';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css']
})
export class QuestionModalComponent implements OnInit {
  quizzes: any[] = [];
  @Input() question: any;
  @Input() isEditing: boolean;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
    
  }

  onSave(): void {
    this.save.emit(this.question);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  loadQuizzes() {
    this.quizService.getAllQuizzes().subscribe(
      (quizzes) => {
        this.quizzes = quizzes;
       
      },
      (error) => {
        console.error('Erreur lors du chargement des quizzes', error);
      }
    );
  }
}
