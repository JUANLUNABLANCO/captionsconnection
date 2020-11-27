import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// rutas
import { PAGES_ROUTING } from './pages.routing';

// component raiz
import { PagesComponent } from './pages.component';

// componets shared
import { NavbarComponent } from '../Shared/navbar/navbar.component';
import { MainComponent } from '../Shared/main/main.component';
import { FooterComponent } from '../Shared/footer/footer.component';

// componets imported
import { HomeComponent } from './home/home.component';
import { LpchannelComponent } from './lpchannel/lpchannel.component';
import { LpfreelancerComponent } from './lpfreelancer/lpfreelancer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';





@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
    LpchannelComponent,
    LpfreelancerComponent,
    PagenotfoundComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTING
  ],
  exports: [
    PagesComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
    LpchannelComponent,
    LpfreelancerComponent
  ]
})
export class PagesModule { }
