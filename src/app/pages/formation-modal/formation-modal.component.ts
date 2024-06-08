import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-formation-modal',
  templateUrl: './formation-modal.component.html',
  styleUrls: ['./formation-modal.component.css']
})
export class FormationModalComponent implements OnInit {

    ngOnInit(): void {
  
    }
    @Input() formation: any;
    @Input() isEditing: boolean;
    @Output() save = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();
  
    onSave(): void {
      this.save.emit(this.formation);
    }
  
    onCancel(): void {
      this.cancel.emit();
    }
  }
