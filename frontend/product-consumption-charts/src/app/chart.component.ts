import {Component, OnInit} from '@angular/core';
import {Groups, Product, ProductDataService} from './product-data.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  title = 'product consumption statistics app';
  private groups: Groups;
  private productGroup: Product[];
  private currentUnit: String = 'kg';
  private allYears: number[] = [];
  private chart: Chart;

  constructor(private chartDataService: ProductDataService) {
  }

  ngOnInit() {
    this.chartDataService.getProductData().subscribe((groups) => {
      this.groups = groups;
      this.productGroup = this.groups['kg']['products'];
      console.log(this.groups);
      console.log(this.productGroup);
      this.prepareYearList();
      this.prepareChart();
    });
  }

  private prepareYearList() {
    for (const product of this.productGroup) {
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
            label: this.productGroup[0].name,
            data: Object.values(this.productGroup[0].valuesPerYear),
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: this.productGroup[1].name,
            data: Object.values(this.productGroup[1].valuesPerYear),
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: this.productGroup[2].name,
            data: Object.values(this.productGroup[2].valuesPerYear),
            borderColor: '#fa92ff',
            fill: false
          },
          {
            label: this.productGroup[3].name,
            data: Object.values(this.productGroup[3].valuesPerYear),
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
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'lata'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.currentUnit + '/rok'
            }
          }],
        }
      }
    });
  }

}

