import {Component, OnInit} from '@angular/core';
import {Product, ProductDataService} from './product-data.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  title = 'product consumption statistics app';
  private products: Product[];
  private allYears: number[] = [];
  private chart: Chart;

  constructor(private chartDataService: ProductDataService) {
  }

  ngOnInit() {
    this.chartDataService.getProductData().subscribe((products) => {
      this.products = products;
      this.prepareYearList();
      this.prepareChart();
    });
  }

  private prepareYearList() {
    for (const product of this.products) {
      for (const key of Object.keys(product.valuesPerYear)) {
        if (!this.allYears.includes(Number(key))) {
          this.allYears.push(Number(key));
        }
      }
    }
  }

  private prepareChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.allYears,
        datasets: [
          {
            label: this.products[0].name,
            data: Object.values(this.products[0].valuesPerYear),
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: this.products[1].name,
            data: Object.values(this.products[1].valuesPerYear),
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: this.products[2].name,
            data: Object.values(this.products[2].valuesPerYear),
            borderColor: '#fa92ff',
            fill: false
          },
          {
            label: this.products[3].name,
            data: Object.values(this.products[3].valuesPerYear),
            borderColor: '#ec8d67',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

}

