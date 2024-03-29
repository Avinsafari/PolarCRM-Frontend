import { Component } from '@angular/core';
import { navbarData } from './nav-data';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.scss']
})
export class BottomnavComponent {
  
  public navData = navbarData;

  constructor(private router: Router,
    private socialAuthService: SocialAuthService) { }

  logout(): void {
    this.socialAuthService.signOut();
    this.router.navigate(['/login']);
  }

}
