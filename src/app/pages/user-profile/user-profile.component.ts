import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { AdduserComponent } from '../adduser/adduser.component';
import { UserupdateService } from 'src/app/_services/updateuser/userupdate.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  users: any[] = [];
  currentPageUsers: any[] = [];
  currentPage: number = 1;
  currentUser: any;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  constructor(private userService: AdminService,private authService: AuthService,
     private modalService: NgbModal, private cdr: ChangeDetectorRef) {
      }
     

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current User:', this.currentUser); // Afficher les informations complètes de l'utilisateur dans la console

  
  }
  // user: any 
  
  // selectedFile: File | null = null;
  // currentUser: any;
  // editProfile: boolean = false;  // Ajoutez cette ligne

  // constructor(private userService: UserupdateService,private authService: AuthService,private storageService: StorageService) { }

  // ngOnInit(): void {
  //   // Load user details
  //   this.currentUser = this.authService.getCurrentUser();
  //   this.loadUserDetails();
  // }

  // loadUserDetails(): void {
  // //  const currentUser = this.storageService.getUser();
  //   if (this.currentUser && this.currentUser.id) {
  //     this.userService.getUserDetails(this.currentUser.id).subscribe(
  //       data => {
  //         this.user = data;
  //         console.log('User details loaded', this.user);
  //       },
  //       error => {
  //         console.error('Error loading user details', error);
  //       }
  //     );
  //   }
  // }

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  // onUpdate(): void {
  //   this.userService.updateUser(this.user.id, this.user).subscribe(data => {
  //     console.log('User updated successfully', data);
  //   });
  // }

  // onUpload(): void {
  //   if (this.selectedFile) {
  //     this.userService.uploadProfilePicture(this.user.id, this.selectedFile).subscribe(data => {
  //       this.user.profilePictureUrl = data;
  //       console.log('Profile picture uploaded successfully', data);
  //     });
  //   }
  // }
  
  // toggleEditProfile(): void {  // Ajoutez cette méthode
  //   this.editProfile = !this.editProfile;
  // }
}


