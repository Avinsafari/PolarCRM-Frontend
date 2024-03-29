import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs';

interface SideNavToggle {
  screenWidth: number;
  extended: boolean;
}

@Component({
  selector: 'app-internal-layout',
  templateUrl: './internal-layout.component.html',
  styleUrls: ['./internal-layout.component.scss']
})
export class InternalLayoutComponent implements OnDestroy {

  public isSideNavExtended = false;
  public screenWidth = 0;
  public mobile = false;
  public destroy = new EventEmitter();

  constructor(breakpoints: BreakpointObserver) {
    breakpoints.observe(['(max-width: 800px)'])
    .pipe(takeUntil(this.destroy))
    .subscribe(result => {
      this.mobile = result.matches;
      console.log('mobile', this.mobile);
    });
  }

  toggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavExtended = data.extended;
  }

  public ngOnDestroy() {
    this.destroy.emit();
  }
}
