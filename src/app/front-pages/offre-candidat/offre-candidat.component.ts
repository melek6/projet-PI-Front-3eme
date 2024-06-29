import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/_services/offre/offre.service';

@Component({
  selector: 'app-offre-candidat',
  templateUrl: './offre-candidat.component.html',
  styleUrls: ['./offre-candidat.component.css']
})
export class OffreCandidatComponent implements OnInit {
  offres: any[] = []; // Array to hold the list of offers
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
    this.getAllOffres();
  }

  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe(
      (data: any[]) => {
        // Sort offers by createDate in descending order
        data.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
        this.offres = data; // Assign received data to the component property
      },
      (error) => {
        console.error('Error fetching offers:', error);
        // Handle error if needed
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.offres.length / this.pageSize);
  }

  get displayedOffres(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.offres.slice(startIndex, startIndex + this.pageSize);
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
}
