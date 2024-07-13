// // import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
// // import { AuthService } from 'src/app/_services/auth.service';
// // import { AuthgoogleService } from 'src/app/_services/authgoogle/authgoogle.service';
// // import { StorageService } from 'src/app/_services/storage.service';

// // @Component({
// //   selector: 'app-login',
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.scss']
// // })
// // export class LoginComponent implements OnInit {
// //   form: any = {
// //     username: null,
// //     password: null
// //   };
// //   isLoggedIn = false;
// //   isLoginFailed = false;
// //   errorMessage = '';
// //   roles: string[] = [];
// //   blocked:boolean=false
// //   blockedMessage: string = '';

// //   user: SocialUser;
// //   constructor(private router: Router,
// //     private authService: AuthService, 
// //     private storageService: StorageService,
// //     private authGoogleService: AuthgoogleService,
// //     private socialAuthService: SocialAuthService
// //   ) { }

// //   // ngOnInit(): void {

// //   //   if (this.storageService.isLoggedIn()) {
// //   //     this.isLoggedIn = true;
// //   //     this.roles = this.storageService.getUser().roles;
// //   //     this.blocked = this.storageService.getUser().blocked;
// //   //   }
    
// //   // }
// //   ngOnInit(): void {
// //     if (this.storageService.isLoggedIn()) {
// //       this.isLoggedIn = true;
// //       this.roles = this.storageService.getUser().roles;
// //       this.blocked = this.storageService.getUser().blocked;
// //     }

// //     this.socialAuthService.authState.subscribe((user) => {
// //       this.user = user;
// //       this.isLoggedIn = (user != null);
// //       if (this.isLoggedIn) {
// //         this.handleGoogleLogin(user);
// //       }
// //     });
// //   }
// //   handleGoogleLogin(user: SocialUser): void {
// //     const { email, name } = user;
// //     this.authGoogleService.loginWithGoogle(email, name).subscribe({
// //       next: data => {
// //         this.storageService.saveUser(data);
// //         this.storageService.saveToken(data.accessToken);
// //         this.isLoginFailed = false;
// //         this.isLoggedIn = true;
// //         this.roles = this.storageService.getUser().roles;
// //         this.blocked = this.storageService.getUser().blocked;
// //         if (this.blocked) {
// //           this.blockedMessage = "Your account is blocked. Please contact support.";
// //           this.authService.logout().subscribe(
// //             response => {
// //               console.log('Logout successful', response);
// //               localStorage.removeItem('authToken');
// //               sessionStorage.clear();
// //               alert('Votre compte est bloqué.');
// //               window.location.reload();
// //             },
// //             error => {
// //               console.error('Logout failed', error);
// //             }
// //           );
// //         }
// //         if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_MODERATOR')) {
// //           this.redirectToDashboard();
// //         }
// //         if (this.roles.includes('ROLE_USER')) {
// //           this.redirectToOffice();
// //         }
// //       },
// //       error: err => {
// //         this.errorMessage = err.error.message;
// //         this.isLoginFailed = true;
// //       }
// //     });
// //   }
// //   signInWithGoogle(): void {
// //     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
// //   }
// //   onSubmit(): void {
// //     const { username, password } = this.form;

// //     this.authService.login(username, password).subscribe({
// //       next: data => {
        
// //         this.storageService.saveUser(data);
// //         this.storageService.saveToken(data.accessToken);
        
// //         this.isLoginFailed = false;
// //         this.isLoggedIn = true;
// //         this.roles = this.storageService.getUser().roles;
// //         this.blocked = this.storageService.getUser().blocked;
// //         console.log( this.roles )
// //         console.log( this.storageService.getUser().blocked)
// //         if (this.blocked) {
// //           this.blockedMessage = "Your account is blocked. Please contact support.";
// //           this.authService.logout().subscribe(
// //             response => {
// //               console.log('Logout successful', response);
// //               localStorage.removeItem('authToken'); // Remove token or other session data
// //               sessionStorage.clear(); // Clear session storage
// //               alert('votre compte est bloqué.');
// //               window.location.reload(); // Reload the page // je doit reloader la page 
// //             },
// //             error => {
// //               console.error('Logout failed', error);
// //             }
// //           );
          
// //         }
// //         if( this.roles.includes('ROLE_ADMIN')||this.roles.includes('ROLE_MODERATOR') ){
// //           this.redirectToDashboard();

// //         }
// //         if( this.roles.includes('ROLE_USER')){
// //           this.redirectToOffice();

// //         }
// //       },
// //       error: err => {
// //         this.errorMessage = err.error.message;
// //         this.isLoginFailed = true;
// //       }
// //     });
// //   }

// //   redirectToDashboard(): void {
// //     this.router.navigate(['/dashboard']);
// //   }
// //   redirectToOffice(): void {
// //     this.router.navigate(['/accueil']);
// //   }
 
// // }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
// import { AuthService } from 'src/app/_services/auth.service';
// import { AuthgoogleService } from 'src/app/_services/authgoogle/authgoogle.service';
// import { StorageService } from 'src/app/_services/storage.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   form: any = {
//     username: null,
//     password: null
//   };
//   isLoggedIn = false;
//   isLoginFailed = false;
//   errorMessage = '';
//   roles: string[] = [];
//   blocked: boolean = false;
//   blockedMessage: string = '';

//   user: SocialUser;
//   successLogin: boolean = false;
//   submitClick: boolean = false;
//   erreurLogin: string = '';
//   constructor(
//     private router: Router,
//     private authService: AuthService, 
//     private storageService: StorageService,
  
//   ) { }

//   ngOnInit(): void {
//     if (this.storageService.isLoggedIn()) {
//       this.isLoggedIn = true;
//       this.roles = this.storageService.getUser().roles;
//       this.blocked = this.storageService.getUser().blocked;
//     }

    
//   }

  
//   onGoogleSignIn(): void {
//     this.authService.googleSignIn().then(response => {
//       this.storageService.saveUser(response.user);
//       this.storageService.saveToken(response.token);
//       this.isLoggedIn = true;
//       this.roles = this.storageService.getUser().roles;
//       this.blocked = this.storageService.getUser().blocked;
//       this.checkUserStatus();
//     }).catch(error => {
//       console.error('Google sign-in error', error);
//     });
//   }
 
 
 
//   onSubmit(): void {
//     const { username, password } = this.form;

//     this.authService.login(username, password).subscribe({
//       next: data => {
//         this.storageService.saveUser(data);
//         this.storageService.saveToken(data.accessToken);
//         this.isLoginFailed = false;
//         this.isLoggedIn = true;
//         this.roles = this.storageService.getUser().roles;
//         this.blocked = this.storageService.getUser().blocked;
//         this.checkUserStatus();
//       },
//       error: err => {
//         this.errorMessage = err.error.message;
//         this.isLoginFailed = true;
//       }
//     });
//   }

//   checkUserStatus(): void {
//     if (this.blocked) {
//       this.blockedMessage = "Your account is blocked. Please contact support.";
//       this.authService.logout().subscribe(
//         response => {
//           console.log('Logout successful', response);
//           localStorage.removeItem('authToken');
//           sessionStorage.clear();
//           alert('Votre compte est bloqué.');
//           window.location.reload();
//         },
//         error => {
//           console.error('Logout failed', error);
//         }
//       );
//     } else {
//       console.log(this.storageService.getUser());

//       if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_MODERATOR')) {
//         this.redirectToDashboard();
//       }
//       if (this.roles.includes('ROLE_USER')) {
//         this.redirectToOffice();
//       }
//     }
//   }

//   redirectToDashboard(): void {
//     this.router.navigate(['/dashboard']);
//   }

//   redirectToOffice(): void {
//     this.router.navigate(['/accueil']);
//   }
// }

import { Component, OnInit } from '@angular/core';
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
  blocked: boolean = false;
  blockedMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      const user = this.storageService.getUser();
      if (user) {
        this.isLoggedIn = true;
        this.roles = user.roles;
        this.blocked = user.blocked;
        this.checkUserStatus();
      }
    }
  }

  // onGoogleSignIn(): void {
  //   this.authService.googleSignIn().then(response => {
  //     if (response && response.user) {
  //       this.storageService.saveUser(response.user);
  //       this.storageService.saveToken(response.token);
  //       this.isLoggedIn = true;
  //       this.roles = response.user.roles;
  //       this.blocked = response.user.blocked;
  //       this.checkUserStatus();
  //     }
  //   }).catch(error => {
  //     console.error('Google sign-in error', error);
  //   });
  // }


  onGoogleSignIn(): void {
    this.authService.googleSignIn().then(response => {
      console.log(response);
      // this.checkUserStatus();
      this.redirectToOffice();
    }).catch(error => {
        console.error('Google sign-in error', error);
    });
}



  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.storageService.saveToken(data.accessToken);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = data.roles;
        this.blocked = data.blocked;
        this.checkUserStatus();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  checkUserStatus(): void {
    if (this.blocked) {
      this.blockedMessage = 'Your account is blocked. Please contact support.';
      this.authService.logout().subscribe(
        response => {
          console.log('Logout successful', response);
          sessionStorage.clear();
          alert('Votre compte est bloqué.');
          window.location.reload();
        },
        error => {
          console.error('Logout failed', error);
        }
      );
    } else {
      if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_MODERATOR')) {
        this.redirectToDashboard();
      } else if (this.roles.includes('ROLE_USER')) {
        this.redirectToOffice();
      }
    }
  }

  redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  redirectToOffice(): void {
    this.router.navigate(['/accueil']);
  }
}
