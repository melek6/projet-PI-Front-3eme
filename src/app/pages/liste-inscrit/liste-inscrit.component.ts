import { Component, OnInit } from '@angular/core';
import { InscritformationService } from 'src/app/_services/inscritformation/inscritformation.service';

@Component({
  selector: 'app-liste-inscrit',
  templateUrl: './liste-inscrit.component.html',
  styleUrls: ['./liste-inscrit.component.css']
})
export class ListeInscritComponent implements OnInit {
  inscriptions: any[] = [];
  formations: string[] = []; // Liste des noms de formations uniques
  selectedFormation: string = ''; // Formation sélectionnée pour le filtre

  constructor(private inscritService: InscritformationService) { }

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

  // Méthode pour réinitialiser le filtre
  resetFilter(): void {
    this.selectedFormation = '';
  }
}
