import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {ChartComponent} from './chart/chart.component';
import {Groups, Product, ProductDataService} from './product-data.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  private groups: Groups;
  private productGroup: Product[];
  private currentUnit = 'kg';
  private availableYears: number[] = [];
  private units: string[];

  @ViewChild(ChartComponent) chart: ChartComponent;

  constructor(private chartDataService: ProductDataService) {
  }

  ngOnInit() {
    this.chartDataService.getProductData().subscribe((groups) => {
      this.groups = groups;
      this.units = Object.keys(this.groups);
      this.currentUnit = this.units[2];
      this.productGroup = this.groups[this.currentUnit]['products'];
      this.prepareYearList();
      this.chart.prepareChart(this.productGroup, this.availableYears, this.currentUnit);
    });
  }

  private prepareYearList() {
    for (const product of this.productGroup) {
      for (const key of Object.keys(product.valuesPerYear)) {
        if (!this.availableYears.includes(Number(key))) {
          this.availableYears.push(Number(key));
        }
      }
    }
  }

  private loadChart() {
      this.productGroup = this.groups[this.currentUnit]['products'];
      this.prepareYearList();
      this.chart.prepareChart(this.productGroup, this.availableYears, this.currentUnit);
  }

  private unitOnChange(unit) {
    this.currentUnit = unit;
    this.loadChart();
  }
}

