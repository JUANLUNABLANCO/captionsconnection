import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


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
    BrowserModule,
    APP_ROUTING,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
