// reponse-modal.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionService } from 'src/app/_services/question/question.service';

@Component({
  selector: 'app-reponse-modal',
  templateUrl: './reponse-modal.component.html',
  styleUrls: ['./reponse-modal.component.css']
})
export class ReponseModalComponent implements OnInit {
  questions: any[] = [];
  selectedQuestionId: number;
  @Input() reponse: any;
  @Input() isEditing: boolean;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
    if (this.isEditing && this.reponse) {
      this.selectedQuestionId = this.reponse.questionId;
    }
  }

  onSave(): void {
    this.reponse.questionId = this.selectedQuestionId;
    this.save.emit(this.reponse);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      (questions) => {
        this.questions = questions;
      },
      (error) => {
        console.error('Erreur lors du chargement des questions', error);
      }
    );
  }
}
