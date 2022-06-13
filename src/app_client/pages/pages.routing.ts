import { RouterModule, Routes } from '@angular/router';

// components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { YoutuberComponent } from './youtuber/youtuber.component';
import { FreelancerComponent } from './freelancer/freelancer.component';
// ocultos landing pages
import { LpYoutuberComponent } from './landings/channel/lp_youtuber.component';

const PAGES_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'youtuber', component: YoutuberComponent },
            { path: 'freelancer', component: FreelancerComponent },
            { path: 'lp_youtuber', component: LpYoutuberComponent },
            { path: '', redirectTo: '/home', pathMatch: 'full' },
        ],
    },
];

export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);
