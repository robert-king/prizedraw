import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrizeDrawSimComponent } from './prize-draw-sim/prize-draw-sim.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PrizeDrawSimComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
