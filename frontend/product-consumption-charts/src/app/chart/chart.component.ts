import {Component} from '@angular/core';
import {Chart} from 'chart.js';
import {Product} from '../product-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: []
})
export class ChartComponent {
  productGroup: Product[];
  currentUnit = 'kg';
  years: number[] = [];
  private chart: Chart;

  prepareChart(productGroup: Product[], availableYears: number[], currentUnit: string) {
    this.productGroup = productGroup;
    this.years = availableYears;
    this.currentUnit = currentUnit;
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.years,
        datasets: []
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
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: this.currentUnit + '/rok/os'
            }
          }],
        }, animation: {
          duration: 750,
        },
      }
    });
    this.productGroup.forEach((product, index) => {
      const someIndex: string = Color[index % Object.keys(colors).length];
      this.chart.data.datasets.push({
        label: product.name,
        data: Object.values(product.valuesPerYear),
        backgroundColor: colors[someIndex].fill,
        pointBackgroundColor: colors[someIndex].stroke,
        borderColor: colors[someIndex].stroke,
        pointHighlightStroke: colors[someIndex].stroke,
        fill: true
      });
    });
    this.chart.update();
  }
}

enum Color {
  green, lightBlue, darkBlue, purple
}

const colors = {
  green: {
    fill: '#e0eadf',
    stroke: '#5eb84d',
  },
  lightBlue: {
    stroke: '#6fccdd',
  },
  darkBlue: {
    fill: '#92bed2',
    stroke: '#3282bf',
  },
  purple: {
    fill: '#8fa8c8',
    stroke: '#75539e',
  },
};
