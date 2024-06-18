
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    if (!this.evalformation) {
      this.evalformation = {
        id: 0,
    trainingTitle: '',
    date: '', 
    location: '',
    trainer: '',
    participant: '',
    score: 4, 
    comments: ''
      };
    }
  }

  onSave(): void {
    this.save.emit(this.evalformation);
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
