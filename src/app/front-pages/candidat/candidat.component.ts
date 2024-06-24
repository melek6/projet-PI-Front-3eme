import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/_services/candidat/candidat.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {

  candidatures: any[] = [];
  candidature: any = { nom: '', prenom: '', offre_id: null };
  selectedFile: File = null;

  constructor(private candidatService: CandidatService) { }

  ngOnInit(): void {
    this.getAllCandidatures();
  }

  getAllCandidatures(): void {
    this.candidatService.getAllCandidats()
      .subscribe(
        (response) => {
          this.candidatures = response;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des candidatures :', error);
        }
      );
  }

  addCandidature(): void {
    const formData = new FormData();
    formData.append('nom', this.candidature.nom);
    formData.append('prenom', this.candidature.prenom);
    formData.append('offre_id', this.candidature.offre_id); // Assurez-vous que le nom est correct

    if (this.selectedFile) {
      formData.append('cv', this.selectedFile, this.selectedFile.name);
    }

    this.candidatService.addCandidat(formData)
      .subscribe(
        (response) => {
          console.log('Candidature ajoutée avec succès :', response);
          this.candidature = { nom: '', prenom: '', offre_id: null }; // Réinitialisez après l'ajout
          this.selectedFile = null;
          this.getAllCandidatures();
        },
        (error) => {
          console.log('Erreur lors de l\'ajout de la candidature :', error);
        }
      );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
