
import { Routes, RouterModule } from '@angular/router';

// components
import { PagesComponent } from './pages/pages.component';




const APP_ROUTES: Routes = [

  {path: '**', component: PagesComponent }

];


export const APP_ROUTING = RouterModule.forRoot( APP_ROUTES, {useHash: true});
