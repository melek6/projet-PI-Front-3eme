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
    password: '',
    phone: 0,
    adresse: ''
  };
  
  signUpRequest = {
    username: '',
    email: '',
    password: '',
    phone: 0,
    adresse: '',
    latitude: 0,
    longitude: 0,
    role: []
  };
  
  file: File | null = null;
  attestation: File | null = null;
  roles: string[] = ['USER', 'MODERATOR']; // List of available roles
  selectedRole: string = 'USER'; // Default selected role
  latitude: number;
  longitude: number;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private geolocationService: GeolocationServiceService,
   
  ) { }

  ngOnInit(): void {
    this.geolocationService.getLocation().then(position => {
      this.signUpRequest.latitude = position.coords.latitude;
      this.signUpRequest.longitude = position.coords.longitude;
    }).catch(error => {
      console.error('Error getting location', error);
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onAttestationChange(event: any) {
    this.attestation = event.target.files[0];
  }

  onSubmit(): void {
    this.signUpRequest.username = this.form.username;
    this.signUpRequest.email = this.form.email;
    this.signUpRequest.password = this.form.password;
    this.signUpRequest.adresse = this.form.adresse;
    this.signUpRequest.phone = this.form.phone;
    this.signUpRequest.role = [this.selectedRole]; // Assign the selected role

    if (this.file) {
      this.authService.registerUser(this.signUpRequest, this.file, this.attestation).subscribe({
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
