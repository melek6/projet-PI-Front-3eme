import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { AdduserComponent } from '../adduser/adduser.component';

@Component({
  selector: 'app-gestionuser',
  templateUrl: './gestionuser.component.html',
  styleUrls: ['./gestionuser.component.css']
})
export class GestionuserComponent implements OnInit {

  users: any[] = [];
  currentPageUsers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private userService: AdminService, private modalService: NgbModal, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  getUserRoles(user: any): string {
    return user.roles.map((role: any) => role.name).join(', ');
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.updateCurrentPageUsers();
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }

  updateCurrentPageUsers(): void {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPageUsers = this.users.slice(startIndex, endIndex);
    this.cdr.detectChanges(); // Ensure changes are detected
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPageUsers();
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.updateCurrentPageUsers();
    }, error => {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    });
  }

  blockUser(userId: number): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.userService.blockUser(userId).subscribe(updatedUser => {
        user.blocked = !user.blocked; // Toggle the blocked status
      }, error => {
        console.error('Erreur lors du blocage/deblocage de l\'utilisateur :', error);
      });
    }
  }

  openModal(isEditing: boolean, user?: any): void {
    const modalRef = this.modalService.open(AdduserComponent);
    modalRef.componentInstance.user = user || {};
    modalRef.componentInstance.isEditing = isEditing;

    modalRef.componentInstance.save.subscribe((result: any) => {
      if (isEditing) {
        this.updateUser(result);
      } else {
        this.addUser(result);
      }
      modalRef.close();
    });

    modalRef.componentInstance.cancel.subscribe(() => {
      modalRef.close();
    });
  }
  addUser(user: any): void {
    this.userService.addUser(user).subscribe((newUser: any) => {
      this.users.push(newUser);
      this.updateCurrentPageUsers();
    }, error => {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
    });
  }
  
  updateUser(user: any): void {
    this.userService.updateUser(user.id, user).subscribe(() => {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.users[index] = { ...user };
      }
      this.updateCurrentPageUsers();
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    });
  }
  
  // addUser(user: any): void {
  //   this.userService.addUser(user).subscribe((newUser: any) => {
  //     this.users.push(newUser);
  //     this.updateCurrentPageUsers();
  //   }, error => {
  //     console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
  //   });
  // }

  // updateUser(user: any): void {
  //   this.userService.updateUser(user.id, user).subscribe(() => {
  //     const index = this.users.findIndex(u => u.id === user.id);
  //     if (index !== -1) {
  //       this.users[index] = { ...user };
  //     }
  //     this.updateCurrentPageUsers();
  //   }, error => {
  //     console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
  //   });
  // }
}
