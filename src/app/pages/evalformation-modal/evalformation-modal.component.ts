import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EvalformationService } from 'src/app/_services/evalformation/evalformation.service';

@Component({
  selector: 'app-evalformation-modal',
  templateUrl: './evalformation-modal.component.html',
  styleUrls: ['./evalformation-modal.component.css']
})
export class EvalformationModalComponent implements OnInit {

  @Input() evalformation: any;
  @Input() isEditing: boolean;
  @Input() users: any[]; // Assuming users is an array of objects with username property

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  comments: string = '';
  score: number | null = null;
  @Input() course: any; // Assuming this is the course object which contains formationId

  constructor(public activeModal: NgbActiveModal, private evalformationService: EvalformationService) { }

  ngOnInit(): void {
    if (!this.evalformation) {
      this.evalformation = {
        id: 0,
        score: 4, 
        comments: ''
      };
    }
  }

  onSave(): void {
    const evaluation = {
      comments: this.comments,
      score: this.score,
      createDate: new Date(),
      formation: this.course.formation
    };

    this.evalformationService.addEvaluationToFormation(this.course.formationId, evaluation).subscribe(
      response => {
        console.log('Évaluation ajoutée avec succès:', response);
        this.save.emit(evaluation);
        this.activeModal.close();
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'évaluation:', error);
      }
    );
  }


  onCancel(): void {
    this.activeModal.dismiss();
  }
}
