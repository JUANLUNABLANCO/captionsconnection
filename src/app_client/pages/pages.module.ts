import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// rutas
import { PAGES_ROUTING } from './pages.routing';

// component raiz
import { PagesComponent } from './pages.component';

// componets shared
import { NavbarComponent } from '../Shared/navbar/navbar.component';
import { MainComponent } from '../Shared/main/main.component';
import { FooterComponent } from '../Shared/footer/footer.component';

// elements
import { RrssMenuElement } from '../Shared/elements/rrss-menu.element';

// componets imported
import { HomeComponent } from './home/home.component';
import { LpchannelComponent } from './lpchannel/lpchannel.component';
import { LpfreelancerComponent } from './lpfreelancer/lpfreelancer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

// NGX BOOTSTRAP
import { CollapseModule } from 'ngx-bootstrap/collapse'; // NEEDED: ???? está en el app.module es necesario aquí
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    declarations: [
        PagesComponent,
        NavbarComponent,
        MainComponent,
        FooterComponent,
        HomeComponent,
        LpchannelComponent,
        LpfreelancerComponent,
        PagenotfoundComponent,

        // elements
        RrssMenuElement,
    ],
    imports: [
        // ##### NG10
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        // ##### NGX BOOTSRAP
        CollapseModule,
        TooltipModule,
        PAGES_ROUTING,
    ],
    exports: [
        PagesComponent,
        NavbarComponent,
        MainComponent,
        FooterComponent,
        HomeComponent,
        LpchannelComponent,
        LpfreelancerComponent,

        // elements
        RrssMenuElement,
    ],
})
export class PagesModule {}
