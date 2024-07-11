import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InscritformationService } from 'src/app/_services/inscritformation/inscritformation.service'; 
import { InscriptionFormation } from 'src/app/pages/liste-inscrit/inscription-formation.model';

@Component({
  selector: 'app-inscritformation',
  templateUrl: './inscritformation.component.html',
  styleUrls: ['./inscritformation.component.css']
})
export class InscritFormationComponent implements OnInit {  

  inscriptions: InscriptionFormation[] = [];
  filteredInscriptions: InscriptionFormation[] = [];
  selectedEtat: string = '';
  inscription: any = { id: 0, status: '', etat: '' };
  isEdit = false;

  constructor(
    private inscritformationService: InscritformationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.inscritformationService.getInscriptionById(+id).subscribe((data: any) => {
        this.inscription = data;
      });
    } else {
      this.loadInscriptions();
    }
  }

  loadInscriptions(): void {
    this.inscritformationService.getAllInscriptions().subscribe((inscriptions: InscriptionFormation[]) => {
      this.inscriptions = inscriptions;
      this.filterInscriptions(this.selectedEtat);
    });
  }

  filterInscriptions(etat: string): void {
    this.selectedEtat = etat;
    this.filteredInscriptions = this.inscriptions.filter(inscrit => inscrit.etat === etat || etat === '');
  }

  onEtatChange(etat: string): void {
    this.filterInscriptions(etat);
  }
}
