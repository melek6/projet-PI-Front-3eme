import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  recommendedCourses: any[] = [];
  inscrit: any = { status: '', formationId: 0 };
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private formationService: FormationService,
    private inscritService: InscritformationService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllFormations();
    this.getRecommendedFormations();
  }

  getAllFormations(): void {
    this.formationService.getAllFormations().subscribe(data => {
      this.courses = data;
    });
  }

  getRecommendedFormations(): void {
    this.formationService.getRecommendedFormations().subscribe(data => {
      this.recommendedCourses = data;  // Affichez les 5 meilleures formations
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
         // Navigate to the payment component
         this.router.navigate(['/payment']);
        },
        error => {
          console.error('Failed to save inscription:', error);
        }
      );
    });
  }

  isExpired(course: any): boolean {
    const today = new Date();
    const endDate = new Date(course.endDate);
    return endDate < today;
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

  get totalPages(): number {
    return Math.ceil(this.courses.length / this.pageSize);
  }
}
