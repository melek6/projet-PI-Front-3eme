import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/_services/offre/offre.service';
@Component({
  selector: 'app-offre-candidat',
  templateUrl: './offre-candidat.component.html',
  styleUrls: ['./offre-candidat.component.css']
})
export class OffreCandidatComponent implements OnInit {
  offres: any[] = []; // Array to hold the list of offers

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
    this.getAllOffres();
  }

  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe(
      (data: any[]) => {
        this.offres = data; // Assign received data to the component property
      },
      (error) => {
        console.error('Error fetching offers:', error);
        // Handle error if needed
      }
    );
  }
}
