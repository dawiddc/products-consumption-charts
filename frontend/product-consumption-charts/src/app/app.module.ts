import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MainViewComponent} from './main-view.component';
import {ProductDataService} from './product-data.service';
import {HttpClientModule} from '@angular/common/http';
import {ChartComponent} from './chart/chart.component';

@NgModule({
  declarations: [
    MainViewComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule],
  providers: [ProductDataService],
  bootstrap: [MainViewComponent]
})
export class AppModule {
}
