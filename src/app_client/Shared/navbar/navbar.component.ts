import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {
  title = 'Captions Connection';
  isCollapsed: boolean;

  constructor() {
    this.isCollapsed = true;
   }

}
