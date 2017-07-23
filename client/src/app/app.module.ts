import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpModule } from "@angular/http";

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';

import { referencesReducer } from './reducers/references';
import { uiReducer } from './reducers/ui';
import { APIEffects } from './effects/api';

import { NavControlsComponent } from './navbar/nav-controls/nav-controls.component';
import { NavAuthComponent } from './navbar/nav-auth/nav-auth.component';
import { MainComponent } from './main/main.component';
import { InstructionsComponent } from './main/instructions/instructions.component';
import { ArticleComponent } from './main/new-forms/article/article.component';
import { BookComponent } from './main/new-forms/book/book.component';
import { WebsiteComponent } from './main/new-forms/website/website.component';
import { DeleteConfirmComponent } from './main/delete-confirm/delete-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    NavControlsComponent,
    NavAuthComponent,
    MainComponent,
    InstructionsComponent,
    ArticleComponent,
    BookComponent,
    WebsiteComponent,
    DeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.provideStore({
      referencesReducer,
      uiReducer,
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(APIEffects),
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
