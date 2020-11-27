import { RouterModule, Routes } from '@angular/router';

// components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LpchannelComponent } from './lpchannel/lpchannel.component';
import { LpfreelancerComponent } from './lpfreelancer/lpfreelancer.component';

const PAGES_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          {path: 'home',             component: HomeComponent },
          {path: 'lp_channel',       component: LpchannelComponent },
          {path: 'lp_freelancer',    component: LpfreelancerComponent },
          {path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
      },
];

export const PAGES_ROUTING = RouterModule.forChild( PAGES_ROUTES );
