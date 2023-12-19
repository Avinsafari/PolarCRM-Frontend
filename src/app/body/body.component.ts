import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() extended = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if(this.extended && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    }
    return styleClass;
  }
}
