import { Routes, RouterModule, ExtraOptions } from '@angular/router';

// components
import { PagesComponent } from './pages/pages.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    useHash: true,
};

const APP_ROUTES: Routes = [{ path: '**', component: PagesComponent }];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, routerOptions);
