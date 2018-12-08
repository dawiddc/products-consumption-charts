import {Component, OnInit} from '@angular/core';
import {Product, ProductDataService} from './product-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'product-consumption-charts';
  chartDataService: ProductDataService;
  products: Product[];

  constructor(chartDataService: ProductDataService) {
    this.chartDataService = chartDataService;
  }

  ngOnInit() {
    this.chartDataService.getProductData().subscribe((products) => this.products);
  }

}

