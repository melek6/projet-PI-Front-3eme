import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/_services/offre/offre.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  offres: any[] = [];

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
    this.getLatestOffres();
  }

  getLatestOffres(): void {
    this.offreService.getAllOffres().subscribe(
      (data: any[]) => {
        // Sort offers by createDate in descending order and take the first 5
        data.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
        this.offres = data.slice(0, 5); // Take the first 5 offers
      },
      (error) => {
        console.error('Error fetching offers:', error);
        // Handle error if needed
      }
    );
  }
}
