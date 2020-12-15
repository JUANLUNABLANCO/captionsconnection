import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  
  constructor(private router: Router ) { }

  goTo(url: string): void {
    this.router.navigate(['lp_channel']);
  }

}
