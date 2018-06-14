import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgInitDirective } from './common/directives/ng-init.directive';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

export const APP_ID = 'my-app';

@NgModule({
  declarations: [
    AppComponent,
    NgInitDirective,
    SignupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: APP_ID}),
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
