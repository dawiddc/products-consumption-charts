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
        datasets: [
          {
            label: this.productGroup[0].name,
            data: Object.values(this.productGroup[0].valuesPerYear),
            backgroundColor: colors.purple.fill,
            pointBackgroundColor: colors.purple.stroke,
            borderColor: colors.purple.stroke,
            pointHighlightStroke: colors.purple.stroke,
            borderCapStyle: 'butt',
            fill: true
          },
          {
            label: this.productGroup[1].name,
            data: Object.values(this.productGroup[1].valuesPerYear),
            backgroundColor: colors.darkBlue.fill,
            pointBackgroundColor: colors.darkBlue.stroke,
            borderColor: colors.darkBlue.stroke,
            pointHighlightStroke: colors.darkBlue.stroke,
            borderCapStyle: 'butt',
            fill: true
          },
          {
            label: this.productGroup[2].name,
            data: Object.values(this.productGroup[2].valuesPerYear),
            backgroundColor: colors.green.fill,
            pointBackgroundColor: colors.lightBlue.stroke,
            borderColor: colors.lightBlue.stroke,
            pointHighlightStroke: colors.lightBlue.stroke,
            borderCapStyle: 'butt',
            fill: true
          },
          {
            label: this.productGroup[3].name,
            data: Object.values(this.productGroup[3].valuesPerYear),
            backgroundColor: colors.green.fill,
            pointBackgroundColor: colors.green.stroke,
            borderColor: colors.green.stroke,
            pointHighlightStroke: colors.green.stroke,
            fill: true
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
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: this.currentUnit + '/rok'
            }
          }],
        }, animation: {
          duration: 750,
        },
      }
    });
  }
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
