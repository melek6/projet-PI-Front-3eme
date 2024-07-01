
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inscrit-modal',
  templateUrl: './inscrit-modal.component.html',
  styleUrls: ['./inscrit-modal.component.css']
})
export class InscritModalComponent {
  @Input() inscrit: any;
  @Output() save = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal) {}

  onSave(): void {
    this.save.emit(this.inscrit);
    this.activeModal.close();
  }

  onClose(): void {
    this.activeModal.dismiss();
  }
}



