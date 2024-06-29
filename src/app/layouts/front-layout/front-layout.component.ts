
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.css']
})
export class FrontLayoutComponent implements OnInit {
  user: any;
  image: any;
  username: any;

  constructor(private tokenStorage: StorageService, private utilisateurService: UserService, private authService :AuthService, router:Router) { }

 /* getUserbyid() {
    this.utilisateurService.findByUsername(this.username).subscribe(data => {
      console.log(data)
      this.user = data;
    });
  }*/

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      //this.getUserbyid();
      this.username = this.tokenStorage.getUser().username;
    
    }
  }
  logout(): void {
    this.authService.logout().subscribe(
      response => {
        console.log('Logout successful', response);
        localStorage.removeItem('authToken'); // Remove token or other session data
        sessionStorage.clear(); // Clear session storage
     //   this.router.navigate(['/login']); // Navigate to the login page after logout
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }

}