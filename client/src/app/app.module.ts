import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';

import { referencesReducer } from './reducers/references';
import { uiReducer } from './reducers/ui';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent
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
