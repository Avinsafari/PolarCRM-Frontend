import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const localGuard: CanActivateFn =
  ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
    const authService = inject(AuthService);
  return true;
};
