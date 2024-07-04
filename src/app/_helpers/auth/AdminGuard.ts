import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Cette méthode devrait retourner le rôle de l'utilisateur connecté
  getUserRole(): string {
    // Vous pouvez récupérer le rôle de l'utilisateur depuis le local storage, un token JWT, ou une API
    // Exemple avec local storage:
    return localStorage.getItem('userRole');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      // Rediriger ou afficher un message d'erreur si l'utilisateur n'est pas admin
      this.router.navigate(['/']);
      return false;
    }
  }
}
