import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: StorageService, private router: Router, private autser: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("saleeeeeem");
    const expectedRoles = route.data.expectedRoles;
    const isAuthenticated = this.authService.isLoggedIn();
    const hasRole = expectedRoles.some((role: string) => this.autser.hasRole(role));
    console.log(hasRole);
    if (isAuthenticated && hasRole) {
      console.log("maneeeeeel");
      return true;
    }

    // Redirection si l'utilisateur n'est pas authentifié ou n'a pas le bon rôle
    this.router.navigate(['login']);
    return false;
  }
}
