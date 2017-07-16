import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';

import { referencesReducer } from './reducers/references';
import { uiReducer } from './reducers/ui';
import { APIEffects } from './effects/api';

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
    FormsModule,
    StoreModule.provideStore({
      referencesReducer,
      uiReducer,
    }),
    EffectsModule.run(APIEffects),
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
