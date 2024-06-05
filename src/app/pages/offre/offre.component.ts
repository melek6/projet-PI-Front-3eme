import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OffreService } from 'src/app/_services/offre/offre.service';
import { AddOffreComponent } from '../add-offre/add-offre.component';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  offres: any[] = [];
  currentPageOffres: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  nouvellesOffres: number = 0;
  offresExpirees: number = 0;
  userId:any
  constructor(private offreService: OffreService, private modalService: NgbModal,private storageService:StorageService) { }

  ngOnInit(): void {
    this.loadAllOffres();
   this.userId= this.storageService.getUser()
  }

  loadAllOffres(): void {
    this.offreService.getAllOffres().subscribe(
      (data: any[]) => {
        this.offres = data;
        this.calculateStatistics();
        this.updateCurrentPageOffres();
      },
      error => {
        console.error('Erreur lors de la récupération des offres :', error);
      }
    );
  }

  calculateStatistics(): void {
    const currentDate = new Date();

    this.nouvellesOffres = this.offres.filter(offre => {
      const createDate = new Date(offre.createDate);
      return (currentDate.getTime() - createDate.getTime()) <= (30 * 24 * 60 * 60 * 1000);
    }).length;

    this.offresExpirees = this.offres.filter(offre => {
      const expiryDate = new Date(offre.expiryDate);
      return expiryDate < currentDate;
    }).length;
  }

  updateCurrentPageOffres(): void {
    this.totalPages = Math.ceil(this.offres.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPageOffres = this.offres.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPageOffres();
    }
  }

  deleteOffre(id: number): void {
    this.offreService.deleteOffre(id).subscribe(() => {
      this.offres = this.offres.filter(offre => offre.id !== id);
      this.calculateStatistics();
      this.updateCurrentPageOffres();
    }, error => {
      console.error('Erreur lors de la suppression de l\'offre :', error);
    });
  }

  openModal(isEditing: boolean, offre?: any): void {
    const modalRef = this.modalService.open(AddOffreComponent);
    modalRef.componentInstance.offre = offre || {}; // Initialiser l'offre avec celle fournie ou un objet vide
    modalRef.componentInstance.isEditing = isEditing;

    modalRef.componentInstance.save.subscribe((result: any) => {
      //result.user=this.userId
       console.log(result)
      this.offreService.addOffre(result).subscribe((newOffre: any) => {
        console.log('Offre ajoutée avec succès', newOffre);
        this.offres.push(newOffre);
      })
      modalRef.close();
    });

    modalRef.componentInstance.cancel.subscribe(() => {
      modalRef.close(); // Fermer la modal en cas d'annulation
    });
  }

  addOffre(offre: any): void {
    this.offreService.addOffre(offre).subscribe((newOffre: any) => {
      this.offres.push(newOffre);
      this.calculateStatistics();
      this.updateCurrentPageOffres();
    }, error => {
      console.error('Erreur lors de l\'ajout de l\'offre :', error);
    });
  }

  updateOffre(offre: any): void {
    this.offreService.updateOffre(offre.id, offre).subscribe(() => {
      const index = this.offres.findIndex(o => o.id === offre.id);
      if (index !== -1) {
        this.offres[index] = { ...offre };
      }
      this.calculateStatistics();
      this.updateCurrentPageOffres();
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'offre :', error);
    });
  }
}
