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
  inscrit: any = { status: '', registrationDate: '' }; // Initialisation avec des valeurs par défaut
  showModal: boolean = false;
  dataSource : any;

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

  openModal(editing: boolean, courseId: number): void {
    // if (editing) {
    //   // Si vous avez besoin de récupérer et d'afficher les détails de l'inscription existante
    //   this.inscritService.getInscriptionById(courseId).subscribe(
    //     data => {
    //       this.inscrit = data || { status: '', registrationDate: '' }; // Assurez-vous que data n'est pas null
    //       this.showModal = true;
    //     },
    //     error => {
    //       console.error('Failed to fetch inscription details:', error);
    //       // Gérez les erreurs si nécessaire
    //     }
    //   );
    // } else {
    //   // Pour créer une nouvelle inscription avec les valeurs par défaut
    //   this.inscrit = { status: '', registrationDate: '' };
    //   this.showModal = true;
    // }
  }

  onCloseModal(): void {
    this.showModal = false;
  }

    // Implémentez ici la logique pour sauvegarder l'inscription
    // this.inscritService.createInscription(this.inscrit).subscribe(
    //   response => {
    //     console.log('Inscription saved successfully:', response);
    //     // Réinitialisez l'état de l'inscription ou effectuez une action supplémentaire si nécessaire
    //     this.inscrit = { status: '', registrationDate: '' };
    //     this.showModal = false;
    //   },
    //   error => {
    //     console.error('Failed to save inscription:', error);
    //     // Gérez les erreurs si nécessaire
    //   }
    // );

    onSaveInscription( inscrit?: any): void {
      const modalRef = this.modalService.open(InscritModalComponent);
      modalRef.componentInstance.inscrit = inscrit || {}; 
     
  
      modalRef.componentInstance.save.subscribe((result: any) => {
        this.inscritService.createInscription(result).subscribe((newformation: any) => {
          console.log('inscription ajoutée avec succès', newformation);
          console.log(this.inscrit);
           this.inscrit=(newformation);
          modalRef.close();
        });
      });
  
      modalRef.componentInstance.cancel.subscribe(() => {
        modalRef.close(); 
      });
    }
  
  }

