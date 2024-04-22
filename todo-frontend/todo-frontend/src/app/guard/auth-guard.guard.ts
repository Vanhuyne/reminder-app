import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const roles = route.data['roles'] as Array<string>;
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    if (roles && roles.length > 0) {
      const userRoles = this.authService.getUserRoles();
      if (!userRoles.some((role: string) => roles.includes(role))) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}
