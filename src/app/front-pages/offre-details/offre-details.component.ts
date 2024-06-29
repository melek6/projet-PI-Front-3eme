import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffreService } from 'src/app/_services/offre/offre.service';

@Component({
  selector: 'app-offre-details',
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.css']
})
export class OffreDetailsComponent implements OnInit {

  offreId: number; // Pour stocker l'ID de l'offre récupéré depuis l'URL
  offre: any; // Pour stocker les détails de l'offre récupérés via le service (exemple)

  constructor(private route: ActivatedRoute, private offreService: OffreService) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'offre depuis l'URL
    this.offreId = +this.route.snapshot.paramMap.get('id');

    // Charger les détails de l'offre en utilisant un service (exemple)
    this.loadOffreDetails();
  }

  loadOffreDetails(): void {
    // Utiliser un service pour charger les détails de l'offre en fonction de l'ID
    this.offreService.getOffreById(this.offreId).subscribe(
      (data) => {
        this.offre = data; // Mettre à jour les détails de l'offre
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des détails de l\'offre:', error);
      }
    );
  }

}
