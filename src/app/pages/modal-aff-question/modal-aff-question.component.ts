// modal-aff-question.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-aff-question',
  templateUrl: './modal-aff-question.component.html',
  styleUrls: ['./modal-aff-question.component.css']
})
export class ModalAffQuestionComponent implements OnInit {
  @Input() question: any;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.question);
  }

  closeModal(): void {
    this.close.emit();
  }
}
