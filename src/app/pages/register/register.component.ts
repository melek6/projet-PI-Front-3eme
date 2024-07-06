// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/_services/auth.service';
// import { GeolocationServiceService } from 'src/app/_services/GeolocationService/geolocation-service.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {
//   form: any = {
//     username: '',
//     email: '',
//     password: ''
//   };
//   signUpRequest: any = {
//     username: '',
//     email: '',
//     password: '',
//     role: []
//   };
//   latitude: number;
//   longitude: number;
//   isSuccessful = false;
//   isSignUpFailed = false;
  
//   selectedFile: File | null = null;
//   errorMessage: string = '';

//   constructor(private authService: AuthService, 
//               private router: Router,
//               private geolocationService: GeolocationServiceService,
//             ) { }

//   onFileSelected(event: any): void {
//     this.selectedFile = event.target.files[0];
//   }
//   ngOnInit(): void {
   

//     this.geolocationService.getLocation().then(position => {
//       this.latitude = position.coords.latitude;
//       this.longitude = position.coords.longitude;
//       console.log(this.latitude);
//       console.log(this.longitude);

      
//     }).catch(error => {
//       console.error('Error getting location', error);
//     });
//   }
//   onSubmit(): void {
//     if (this.selectedFile) {
//       this.authService.register(this.signUpRequest, this.selectedFile).subscribe({
//         next: (data) => {
//                 this.isSuccessful = true;
//         this.isSignUpFailed = false;
//           alert('User registered successfully! Please check your email to verify your account.');
//           this.router.navigate(['/login']);
//         },
//         error: (err) => {
//           this.errorMessage = err.error.message;
//         }
//       });
//     } else {
//       this.errorMessage = 'Please select a profile picture.';
//     }
//   }


// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { GeolocationServiceService } from 'src/app/_services/GeolocationService/geolocation-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: '',
    email: '',
    password: ''
  };
  signUpRequest: any = {
    username: '',
    email: '',
    password: '',
    role: [],
    latitude: 0,
    longitude: 0
  };
  latitude: number;
  longitude: number;
  isSuccessful = false;
  isSignUpFailed = false;
  selectedFile: File | null = null;
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private geolocationService: GeolocationServiceService
  ) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.geolocationService.getLocation().then(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(this.latitude);
      console.log(this.longitude);
      
      // Assigner latitude et longitude à signUpRequest
      this.signUpRequest.latitude = this.latitude;
      this.signUpRequest.longitude = this.longitude;
    }).catch(error => {
      console.error('Error getting location', error);
    });
  }

  onSubmit(): void {
    // Assigner les valeurs du formulaire à signUpRequest
    this.signUpRequest.username = this.form.username;
    this.signUpRequest.email = this.form.email;
    this.signUpRequest.password = this.form.password;

    if (this.selectedFile) {
      this.authService.register(this.signUpRequest, this.selectedFile).subscribe({
        next: (data) => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          alert('User registered successfully! Please check your email to verify your account.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    } else {
      this.errorMessage = 'Please select a profile picture.';
    }
  }
}

