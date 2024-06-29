import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidatService } from 'src/app/_services/candidat/candidat.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {

  candidatures: any[] = [];
  candidature: any = { nom: '', prenom: '', cv: null };
  selectedFile: File = null;
  offreId: number = null;

  constructor(
    private candidatService: CandidatService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getAllCandidatures();
    this.route.params.subscribe(params => {
      this.offreId = +params['id']; // Récupère l'ID de l'offre depuis l'URL
    });
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
    // formData.append('nom', this.candidature.nom);
    // formData.append('prenom', this.candidature.prenom);
     formData.append('nom', this.storageService.getUser().username);
     console.log(this.storageService.getUser().username);
     formData.append('mail', this.storageService.getUser().email);
    formData.append('cv', this.selectedFile);

    if (this.offreId) {
      formData.append('offre_id', this.offreId.toString());
    }

    this.candidatService.addCandidat(formData)
      .subscribe(
        (response) => {
          console.log('Candidature ajoutée avec succès :', response);
          this.candidature = { nom: '', prenom: '', cv: null };
          this.selectedFile = null;
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
