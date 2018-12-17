import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
    FormsModule,
    HttpClientModule],
  providers: [ProductDataService],
  bootstrap: [MainViewComponent]
})
export class AppModule {
}
