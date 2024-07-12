
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  @Input() course: any;
  constructor(public activeModal: NgbActiveModal) { }

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
    this.save.emit(evaluation);
    this.activeModal.close();
  }
  onCancel(): void {
    this.activeModal.dismiss();
  }

}
