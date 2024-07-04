import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormationCategory } from 'src/app/pages/gestion-formation/formation-category.enum';

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
  @Output() uploadPlanning = new EventEmitter<any>();
  categories: string[] = Object.values(FormationCategory);

  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    if (!this.formation) {
      this.formation = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        price: null,
        numberOfHours: null,
        category: '',
        bestSeller: false
      };
    }
  }

  onSave(): void {
    if (new Date(this.formation.startDate) >= new Date(this.formation.endDate)) {
      this.errorMessage = 'La date de début doit être antérieure à la date de fin';
    } else {
      this.errorMessage = '';
      this.save.emit(this.formation);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onUploadPlanning(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadPlanning.emit({ file: file });
    }
  }
}
