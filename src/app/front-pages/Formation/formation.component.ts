
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
  currentPage: number = 1;
  pageSize: number = 5;

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
  get totalPages(): number {
    return Math.ceil(this.courses.length / this.pageSize);
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
  get displayedOffres(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.courses.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}


