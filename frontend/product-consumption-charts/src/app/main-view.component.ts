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
  private availableYears: number[] = [];
  private chartTypes: string[] = ['Stacked', 'Radar', 'Average Doughnut'];

  private currentUnit = 'kg';
  private currentChartType = 'Stacked';
  private yearFrom = 2000;
  private yearTo = 2017;
  units: string[];

  @ViewChild(ChartComponent) chart: ChartComponent;

  constructor(private chartDataService: ProductDataService) {
  }

  ngOnInit() {
    this.chartDataService.getProductData().subscribe((groups) => {
      this.groups = groups;
      this.units = Object.keys(this.groups);
      this.loadChart(this.currentChartType);
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

  private loadChart(chartType: string) {
    this.productGroup = this.groups[this.currentUnit]['products'];
    this.prepareYearList();
    if (chartType === 'Stacked') {
      this.chart.prepareStackedAreaChart(this.productGroup, this.availableYears, this.currentUnit);
    } else if (chartType === 'Radar') {
      this.chart.prepareRadarChart(this.productGroup, this.availableYears, this.currentUnit);
    } else if (chartType === 'Average Doughnut') {
      this.chart.preparePieChart(this.productGroup, this.availableYears, this.currentUnit);
    }
  }

  private unitOnChange(unit: string) {
    this.currentUnit = unit;
    this.loadChart(this.currentChartType);
  }

  private chartTypeOnChange(chartType: string) {
    this.currentChartType = chartType;
    this.loadChart(chartType);
  }

  private yearFromChange(yearFrom: number) {
    this.yearFrom = yearFrom;
    this.chart.updateYearRange(this.yearFrom, this.yearTo);
  }

  private yearToChange(yearTo: number) {
    this.yearTo = yearTo;
    this.chart.updateYearRange(this.yearFrom, this.yearTo);
  }
}

