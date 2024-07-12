import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InscritformationService } from 'src/app/_services/inscritformation/inscritformation.service';
import { InscriptionFormation } from './inscription-formation.model';
import { InscritModalComponent } from '../inscrit-modal/inscrit-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-liste-inscrit',
  templateUrl: './liste-inscrit.component.html',
  styleUrls: ['./liste-inscrit.component.css']
})
export class ListeInscritComponent implements OnInit {
  inscriptions: InscriptionFormation[] = [];
  formations: string[] = []; // Liste des noms de formations uniques
  selectedFormation: string = ''; // Formation sélectionnée pour le filtre
  @Input() inscrit: InscriptionFormation;
  @Output() save = new EventEmitter<InscriptionFormation>();
  constructor(private inscritService: InscritformationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.inscritService.getAllInscriptions().subscribe((inscriptions: any[]) => {
      this.inscriptions = inscriptions.reverse();
      this.formations = this.getUniqueFormations();
    });
  }

  // Méthode pour récupérer les noms de formations uniques
  getUniqueFormations(): string[] {
    const formations = this.inscriptions.map(i => i.formation?.title);
    return formations.filter((formation, index) => formations.indexOf(formation) === index && formation);
  }

  // Méthode pour filtrer les inscriptions par nom de formation
  filterInscriptionsByFormation(formation: string): void {
    this.selectedFormation = formation;
  }

  // Méthode pour ouvrir le modal et modifier le statut
  openModal(inscription: InscriptionFormation): void {
    const modalRef = this.modalService.open(InscritModalComponent);
    modalRef.componentInstance.inscrit = inscription;

    modalRef.componentInstance.save.subscribe((updatedInscription: InscriptionFormation) => {
      this.inscritService.updateInscription(updatedInscription.id, updatedInscription).subscribe(() => {
        console.log(`Status updated to ${updatedInscription.etat}`);
        this.inscritService.getAllInscriptions().subscribe((inscriptions: InscriptionFormation[]) => {
          this.inscriptions = inscriptions.reverse();
        });
      });
    });
  }

  // Méthode pour réinitialiser le filtre
  resetFilter(): void {
    this.selectedFormation = '';
  }
}
