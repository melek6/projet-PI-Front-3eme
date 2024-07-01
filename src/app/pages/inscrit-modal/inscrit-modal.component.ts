import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inscrit-modal',
  templateUrl: './inscrit-modal.component.html',
  styleUrls: ['./inscrit-modal.component.css']
})
export class InscritModalComponent implements OnInit {
  @Input() inscrit: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor() { }
  ngOnInit(): void {
    console.log(this.inscrit)
  }
  onSave(): void {
    this.save.emit(this.inscrit);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
