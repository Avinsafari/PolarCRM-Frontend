import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public userIdToken: string;
  public userRole: string;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signInWithGoogle();
  }

  signInWithGoogle() {
    this.socialAuthService.authState.subscribe((user) => {
      this.userIdToken = user.idToken;
      localStorage.setItem('token', this.userIdToken);
      this.authService.authenticateUser(this.userIdToken).subscribe((role) => {
        this.userRole = role.userRole;
        localStorage.setItem('role', this.userRole);

        if(this.userRole === 'national' || this.userRole === 'local' || this.userRole === 'admin') {
          this.router.navigate(['/app']);
        }
      });
    });
  }

}
