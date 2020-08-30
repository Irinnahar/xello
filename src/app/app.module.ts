import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipDirective } from './Directives/tooltip.directive';
import { StoreModule } from '@ngrx/store';
import { tooltipReducer } from './state/tooltip.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ tooltip: tooltipReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
