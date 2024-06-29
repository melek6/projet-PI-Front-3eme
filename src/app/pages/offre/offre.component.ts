import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/_services/offre/offre.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  offres: any[] = [];
  nouvellesOffres: number = 0;
  offresExpirees: number = 0;

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
    this.offreService.getAllOffres().subscribe(
      (data: any[]) => {
        this.offres = data;
        console.log('Résultat de getAllOffres :', this.offres); // Vérifiez les données dans la console
        this.calculateStatistics();
      },
      error => {
        console.error('Erreur lors de la récupération des offres :', error);
      }
    );
  }

  calculateStatistics(): void {
    const currentDate = new Date();

    this.nouvellesOffres = this.offres.filter(offre => {
      const createDate = new Date(offre.createDate);
      return (currentDate.getTime() - createDate.getTime()) <= (30 * 24 * 60 * 60 * 1000); // Dernier mois
    }).length;

    this.offresExpirees = this.offres.filter(offre => {
      const expiryDate = new Date(offre.expiryDate);
      return expiryDate < currentDate;
    }).length;
  }

  deleteOffre(id: number): void {
    this.offreService.deleteOffre(id).subscribe(() => {
      console.log('Offre supprimée avec succès');
      this.offres = this.offres.filter(offre => offre.id !== id);
      this.calculateStatistics(); // Recalculer les statistiques après suppression
    }, error => {
      console.error('Erreur lors de la suppression de l\'offre :', error);
    });
  }

}
