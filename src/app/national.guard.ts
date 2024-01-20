import { CanActivateFn } from '@angular/router';

export const nationalGuard: CanActivateFn = (route, state) => {
  return false;
};
