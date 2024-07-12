import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/_services/formation/formation.service';
import { InscritformationService } from 'src/app/_services/inscritformation/inscritformation.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EvalformationModalComponent } from 'src/app/pages/evalformation-modal/evalformation-modal.component';
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
  categories: string[] = []; // Pour stocker les catégories de formation
  selectedCategory: string = ''; // Catégorie sélectionnée par l'utilisateur
  completedCourses: any[] = [];
  showingCompletedCourses: boolean = false;
  constructor(
    private formationService: FormationService,
    private inscritService: InscritformationService,
    private modalService: NgbModal,
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.getAllFormations();
    this.getRecommendedFormations();
    this.getCategories();
    this.getCompletedFormations();
  }

  getAllFormations(): void {
    this.formationService.getAllFormations().subscribe(data => {
      this.courses = data;
    });
  }
  getFormationsByCategory(category: string): void {
    this.formationService.getFormationsByCategory(category).subscribe(data => {
      this.courses = data;
    });
  }
  getCategories(): void {
    this.formationService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    if (category === '') {
      this.getAllFormations();
    } else {
      this.getFormationsByCategory(category);
    }
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
          // Navigate to the payment component with formation data
          this.router.navigate(['/payment'], { queryParams: { price: course.price, title: course.title, id: course.id } });
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
  
  getCompletedFormations(): void {
    const user = this.storageService.getUser(); // Obtenez l'utilisateur actuel
    const userId = user ? user.id : null;
    if (userId) {
      this.formationService.getCompletedFormationsByUser(userId).subscribe(data => {
        this.completedCourses = data;
      });
    } else {
      console.error('User not found.');
    }
  }
  showCompletedCourses(): void {
    this.showingCompletedCourses = !this.showingCompletedCourses;
  }
  openEvaluationModal(course: any): void {
    const modalRef = this.modalService.open(EvalformationModalComponent);
    modalRef.componentInstance.course = course;

    modalRef.componentInstance.save.subscribe((evaluation: any) => {
      this.formationService.addEvaluationToFormation(course.formation.id, evaluation).subscribe(
        response => {
          console.log('Évaluation ajoutée avec succès', response);
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'évaluation:', error);
        }
      );
    });
  }
}
