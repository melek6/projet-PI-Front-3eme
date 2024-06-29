import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResetmdpService } from 'src/app/_services/resetmdp/resetmdp.service';


@Component({
  selector: 'app-forgot-mdp',
  templateUrl: './forgot-mdp.component.html',
  styleUrls: ['./forgot-mdp.component.css']
})
export class ForgotMDPComponent implements OnInit {
  email: string;
  token: string;
  newPassword: string;

  constructor(private router: Router,private passwordResetService: ResetmdpService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  requestPasswordReset() {
    this.passwordResetService.requestPasswordReset(this.email).subscribe(response => {
      console.log(response);
      alert('Password reset code sent to your email.');
    });
  }

  validateResetToken() {
    this.passwordResetService.validateResetToken(this.email, this.token).subscribe(response => {
      console.log(response);
      alert(response ? 'Valid token.' : 'Invalid or expired token.');
    });
  }

  changePassword() {
    this.passwordResetService.changePassword(this.email, this.token, this.newPassword).subscribe(response => {
      console.log(response);
      alert('Password changed successfully.');
      this.redirectToOffice();
    });
  }
  redirectToOffice(): void {
    this.router.navigate(['/login']);
  }
}
