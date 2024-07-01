import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OffreService } from 'src/app/_services/offre/offre.service';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent  implements OnInit {
  ngOnInit(): void {
    console.log(this.offre)

  }
  @Input() offre: any;
  @Input() isEditing: boolean;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSave(): void {
    this.save.emit(this.offre);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}