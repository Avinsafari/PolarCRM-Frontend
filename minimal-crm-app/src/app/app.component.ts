import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  extended: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'minimal-crm-app';
  authorized = true;

  isSideNavExtended = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavExtended = data.extended;
  }
}
