import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminModeratorGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.hasAnyRole(['admin', 'moderator'])) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
