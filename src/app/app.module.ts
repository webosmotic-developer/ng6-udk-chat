import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgInitDirective} from './common/directives/ng-init.directive';

export const APP_ID = 'my-app';

@NgModule({
  declarations: [
    AppComponent,
    NgInitDirective
  ],
  imports: [
    BrowserModule.withServerTransition({appId: APP_ID})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
