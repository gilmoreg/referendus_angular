// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

// State Management
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { referencesReducer } from './reducers/references';
import { uiReducer } from './reducers/ui';
import { APIEffects } from './effects/api';

// Components
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavAuthComponent } from './navbar/nav-auth/nav-auth.component';
import { MainComponent } from './main/main.component';
import { InstructionsComponent } from './main/instructions/instructions.component';
import { ArticleComponent } from './modals/ref-modal/article/article.component';
import { BookComponent } from './modals/ref-modal/book/book.component';
import { WebsiteComponent } from './modals/ref-modal/website/website.component';
import { RefModalComponent } from './modals/ref-modal/ref-modal.component';
import { NewButtonsComponent } from './modals/ref-modal/new-buttons/new-buttons.component';
import { NavFormatComponent } from './navbar/nav-format/nav-format.component';
import { NavSearchComponent } from './navbar/nav-search/nav-search.component';
import { ReferenceLiComponent } from './main/reference-li/reference-li.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    NavAuthComponent,
    MainComponent,
    InstructionsComponent,
    ArticleComponent,
    BookComponent,
    WebsiteComponent,
    RefModalComponent,
    NewButtonsComponent,
    NavFormatComponent,
    NavSearchComponent,
    ReferenceLiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.provideStore({
      referencesReducer,
      uiReducer,
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(APIEffects),
    HttpClientModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ RefModalComponent ],
})
export class AppModule { }
