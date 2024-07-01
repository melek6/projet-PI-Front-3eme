import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InscritformationService } from 'src/app/_services/inscritformation/inscritformation.service'; 

@Component({
  selector: 'app-inscritformation',
  templateUrl: './inscritformation.component.html',
  styleUrls: ['./inscritformation.component.css']
})
export class InscritFormationComponent implements OnInit {  

  // inscription: any = { id : 0 ,registrationDate: '', status: '' };
  inscription: any = { id : 0 , status: '' };

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
    }
  }

  // onSubmit(): void {
  //   if (this.isEdit) {
  //     this.inscritformationService.updateInscription(this.inscription.id!, this.inscription).subscribe(() => {
  //       this.router.navigate(['/inscrit']);
  //     });
  //   } else {
  //     this.inscritformationService.createInscription(this.inscription.id!,this.inscription).subscribe(() => {
  //       this.router.navigate(['/inscrit']);
  //     });
  //   }
  // }
}