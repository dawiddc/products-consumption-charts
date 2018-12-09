import {Component, Input} from '@angular/core';
import {Chart} from 'chart.js';
import {Product} from '../product-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: []
})
export class ChartComponent {
  @Input() productGroup: Product[];
  @Input() currentUnit = 'kg';
  @Input() years: number[] = [];
  private chart: Chart;

  prepareChart(productGroup: Product[], availableYears: number[], currentUnit: string) {
    this.productGroup = productGroup;
    this.years = availableYears;
    this.currentUnit = currentUnit;
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.years,
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

