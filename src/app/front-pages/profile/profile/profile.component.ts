import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';
import { BlogPostService } from 'src/app/_services/blog/blog-post.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  selectedFile: File | null = null;
  oldPassword: string;
  newPassword: string;
  message: string;
  updateUserForm: FormGroup;
  updateUserDTO: any = {
    username: '',
    email: '',
    phone: '',
    adresse: ''
  };
  blogPosts: any= [];
  // updateForm:any;
  @ViewChild('profilePictureModal') profilePictureModal: ElementRef;
  @ViewChild('updateprofile') updateprofile: ElementRef;
  @ViewChild('resetmdp') resetmdp: ElementRef;
  constructor(private router: Router,private  userservice:UserService,private authService: AuthService,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.updateUserDTO=this.authService.getCurrentUser();
    console.log(this.user);
    
  }
  // getBlogPostsByUserId(): void {
  //   this.userservice.getBlogPostsByUserId(this.user.id).subscribe(
  //     (data: any) => {
  //       this.blogPosts = data;
  //       console.log('Blog Posts:', this.blogPosts);
  //     },
  //     error => {
  //       console.error('Error fetching blog posts:', error);
  //     }
  //   );
  // }
  
  
  onUpdateUser() {
    

    this.authService.updateUser(this.user.id, this.updateUserDTO).subscribe(
      response => {
        console.log('User updated successfully', response);
        this.closeModal2();
      },
      error => {
        console.error('Error updating user', error);
      }
    );
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  updateProfilePicture(): void {
    if (this.selectedFile && this.user.id) {
      this.authService.updateProfilePicture(this.user.id, this.selectedFile).subscribe(
        response => {
          console.log('Profile picture updated successfully!', response);
          this.closeModal(); // Close the modal on success
        },
        error => {
          console.error('Error updating profile picture:', error);
        }
      );
    }
  }
  openModal3(): void {
    const modalElement = this.resetmdp.nativeElement;
      if (modalElement) {
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
        modalElement.removeAttribute('aria-hidden');
        modalElement.setAttribute('aria-modal', 'true');
      }
  }
openModal2(): void {
  const modalElement = this.updateprofile.nativeElement;
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      modalElement.removeAttribute('aria-hidden');
      modalElement.setAttribute('aria-modal', 'true');
    }
}

  openModal(): void {
    const modalElement = this.profilePictureModal.nativeElement;
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      modalElement.removeAttribute('aria-hidden');
      modalElement.setAttribute('aria-modal', 'true');
    }
  }
  closeModal2(): void {
    const modalElement = this.updateprofile.nativeElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');
    }
  }
   closeModal3(): void {
    const modalElement = this.resetmdp.nativeElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');
    }
  }
  closeModal(): void {
    const modalElement = this.profilePictureModal.nativeElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');
    }
  }
  changePassword() {
    this.authService.changePassword(this.user.id, this.oldPassword, this.newPassword).subscribe(
      response => {
        this.message = response.message;
        this.closeModal3();
      },
      error => {
        this.message = 'Error: ' + error.error.message;
      }
    );
  }
}