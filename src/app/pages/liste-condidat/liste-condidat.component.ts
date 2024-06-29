import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/_services/candidat/candidat.service';

@Component({
  selector: 'app-liste-condidat',
  templateUrl: './liste-condidat.component.html',
  styleUrls: ['./liste-condidat.component.css']
})
export class ListeCondidatComponent implements OnInit {
  candidats: any[] = [];
  offres: string[] = []; // Liste des noms d'offres uniques
  selectedOffre: string = ''; // Offre sélectionnée pour le filtre

  constructor(private candidatService: CandidatService) { }

  ngOnInit(): void {
    this.candidatService.getAllCandidats().subscribe((candidats: any[]) => {
      // Inverser l'ordre des candidats pour afficher le dernier ajouté en premier
      this.candidats = candidats.reverse();
      // Récupérer les noms d'offres uniques
      this.offres = this.getUniqueOffres();
    });
  }

  // Méthode pour générer l'URL du PDF à partir du base64
  dataURItoPDF(dataURI: string): string {
    return 'data:application/pdf;base64,' + dataURI;
  }

  // Méthode pour récupérer les noms d'offres uniques
  getUniqueOffres(): string[] {
    const offres = this.candidats.map(c => c.offre?.title);
    return offres.filter((offre, index) => offres.indexOf(offre) === index && offre); // Filtrer les doublons et les valeurs nulles
  }

  // Méthode pour filtrer les candidats par nom d'offre
  filterCandidatsByOffre(offre: string): void {
    this.selectedOffre = offre;
  }

  // Méthode pour réinitialiser le filtre
  resetFilter(): void {
    this.selectedOffre = '';
  }
}
