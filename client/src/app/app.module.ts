import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';

import { referencesReducer } from './reducers/references';
import { uiReducer } from './reducers/ui';
import { NavControlsComponent } from './navbar/nav-controls/nav-controls.component';
import { NavAuthComponent } from './navbar/nav-auth/nav-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    NavControlsComponent,
    NavAuthComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({
      referencesReducer,
      uiReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
