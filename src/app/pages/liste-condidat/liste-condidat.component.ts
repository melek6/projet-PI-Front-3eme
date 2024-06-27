import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/_services/candidat/candidat.service';

@Component({
  selector: 'app-liste-condidat',
  templateUrl: './liste-condidat.component.html',
  styleUrls: ['./liste-condidat.component.css']
})
export class ListeCondidatComponent implements OnInit {
  candidats: any[] = [];

  constructor(private candidatService: CandidatService) { }

  ngOnInit(): void {
    this.candidatService.getAllCandidats().subscribe((candidats: any[]) => {
      this.candidats = candidats;
    });
  }

  // Méthode pour générer l'URL du PDF à partir du base64
  dataURItoPDF(dataURI: string): string {
    return 'data:application/pdf;base64,' + dataURI;
  }
}
