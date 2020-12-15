// ########## ng
import { NgModule } from '@angular/core';
// ########## ngx-bootstrap
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// modules
import { PagesModule } from './pages/pages.module';

// ROUTING
import { APP_ROUTING } from './app-routing';

// COMPONENTS
import { AppComponent } from './app.component';


// MY COMPONENTS



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // ########## ng10
    // BrowserModule,
    // CommonModule,
    // BrowserAnimationsModule,
    // ... todo en PagesModule

    // ########## ngx-bootstrap
    // ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    
    // ########## app-business
    APP_ROUTING,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
