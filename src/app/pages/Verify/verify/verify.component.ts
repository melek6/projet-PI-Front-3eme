import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  isSuccessful = false;
  isVerificationFailed = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    this.authService.verify(token).subscribe({
      next: data => {
        this.isSuccessful = true;
        alert('compte valider');

        this.redirectToDashboard();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isVerificationFailed = true;
      }
    });
  }
  redirectToDashboard(): void {
    this.router.navigate(['/login']); // Rediriger vers la route '/dashboard'
  }
}
