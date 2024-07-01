
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/_services/formation/formation.service';
import { InscritformationService } from 'src/app/_services/inscritformation/inscritformation.service';
import { InscritModalComponent } from 'src/app/pages/inscrit-modal/inscrit-modal.component';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  courses: any[] = [];
  inscrit: any = { status: '', formationId: 0 };

  constructor(
    private formationService: FormationService,
    private inscritService: InscritformationService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getAllFormations();
  }

  getAllFormations(): void {
    this.formationService.getAllFormations().subscribe(data => {
      this.courses = data;
    });
  }

  onSaveInscription(course: any): void {
    const modalRef = this.modalService.open(InscritModalComponent);
    modalRef.componentInstance.inscrit = { ...this.inscrit, formationId: course.id };

    modalRef.componentInstance.save.subscribe((result: any) => {
      this.inscritService.createInscription(result).subscribe(
        newInscription => {
          console.log('Inscription added successfully', newInscription);
          this.inscrit = newInscription;
          modalRef.close();
        },
        error => {
          console.error('Failed to save inscription:', error);
        }
      );
    });
  }
}


