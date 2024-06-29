import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.hasRole('user')) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
