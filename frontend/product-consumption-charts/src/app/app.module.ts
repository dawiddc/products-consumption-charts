import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartComponent } from './chart.component';
import {ProductDataService} from './product-data.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductDataService],
  bootstrap: [ChartComponent]
})
export class AppModule { }
