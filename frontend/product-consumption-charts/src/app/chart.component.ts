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
      for (const product of this.products) {
        for (const key of Object.keys(product.valuesPerYear)) {
          if (!this.allYears.includes(Number(key))) {
            this.allYears.push(Number(key));
          }
        }
      }
      this.prepareChart();
    });
  }

  private prepareChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.allYears,
        datasets: [
          {
            data: Object.values(this.products[0].valuesPerYear),
            borderColor: '#3cba9f',
            fill: false
          },
          {
            data: Object.values(this.products[1].valuesPerYear),
            borderColor: '#ffcc00',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
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

