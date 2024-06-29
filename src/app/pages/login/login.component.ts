import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  blocked:boolean=false
  blockedMessage: string = '';
  constructor(private router: Router,private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.blocked = this.storageService.getUser().blocked;
    }
  }
  // logingoogle() {
  //   this.authService.logingoogle();
  // }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        
        this.storageService.saveUser(data);
        this.storageService.saveToken(data.accessToken);
        
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.blocked = this.storageService.getUser().blocked;
        console.log( this.roles )
        console.log( this.storageService.getUser().blocked)
        if (this.blocked) {
          this.blockedMessage = "Your account is blocked. Please contact support.";
          this.authService.logout().subscribe(
            response => {
              console.log('Logout successful', response);
              localStorage.removeItem('authToken'); // Remove token or other session data
              sessionStorage.clear(); // Clear session storage
              alert('votre compte est bloqué.');
              window.location.reload(); // Reload the page // je doit reloader la page 
            },
            error => {
              console.error('Logout failed', error);
            }
          );
          
        }
        if( this.roles.includes('ROLE_ADMIN')||this.roles.includes('ROLE_MODERATOR') ){
          this.redirectToDashboard();

        }
        if( this.roles.includes('ROLE_USER')){
          this.redirectToOffice();

        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
  redirectToOffice(): void {
    this.router.navigate(['/accueil']);
  }
 
}
