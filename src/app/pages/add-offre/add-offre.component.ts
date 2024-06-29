import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/_services/offre/offre.service';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {
  offre = {
    title: '',
    description: '',
    location: '',
    createDate: new Date(), // Utiliser la date actuelle
    expiryDate: null,
    status: '',
    user: {
      id: null // Remplacer par l'identifiant de l'utilisateur connecté
    }
  };

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.offreService.addOffre(this.offre)
      .subscribe(
        response => {
          console.log(response);
          // Logique de gestion de la réponse réussie
        },
        error => {
          console.log(error);
          // Logique de gestion des erreurs
        }
      );
  }
}
