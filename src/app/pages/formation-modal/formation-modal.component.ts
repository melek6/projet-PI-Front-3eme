import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-formation-modal',
  templateUrl: './formation-modal.component.html',
  styleUrls: ['./formation-modal.component.css']
})
export class FormationModalComponent implements OnInit {

  @Input() formation: any;
  @Input() isEditing: boolean;
  @Input() users: any[]; 

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    // Initialize formation object if needed
    if (!this.formation) {
      this.formation = {
        title: '',
        description: '',
        schedule: '',
        startDate: '',
        endDate: '',
        location: '',
        price: null,
        numberOfHours: null,
        category: '',
        newFormation: false,
        bestSeller: false
      };
    }
  }

  onSave(): void {
    this.save.emit(this.formation);
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
