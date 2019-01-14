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

  private addChartData() {
    this.productGroup.forEach((product, index) => {
      const consecutiveColorIndex: string = Color[index % Object.keys(colors).length];
      this.chart.data.datasets.push({
        label: product.name,
        data: Object.values(product.valuesPerYear),
        backgroundColor: colors[consecutiveColorIndex].fill,
        pointBackgroundColor: colors[consecutiveColorIndex].stroke,
        borderColor: colors[consecutiveColorIndex].stroke,
        pointHighlightStroke: colors[consecutiveColorIndex].stroke,
        fill: true
      });
    });
    this.chart.data.labels = this.years;
    this.chart.options.animation.duration = 750;
    this.chart.options.legend.display = true;
    this.chart.update();
  }

  private destroyCurrentChartAndAssignVariables(productGroup: Product[], availableYears: number[], currentUnit: string) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.productGroup = productGroup;
    this.years = availableYears;
    this.currentUnit = currentUnit;
  }

  prepareStackedAreaChart(productGroup: Product[], availableYears: number[], currentUnit: string) {
    this.destroyCurrentChartAndAssignVariables(productGroup, availableYears, currentUnit);
    this.chart = new Chart('canvas', {
      type: 'line',
      options: {
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
        }
      }
    });
    this.addChartData();
  }

  prepareRadarChart(productGroup: Product[], availableYears: number[], currentUnit: string) {
    this.destroyCurrentChartAndAssignVariables(productGroup, availableYears, currentUnit);
    this.chart = new Chart('canvas', {
      type: 'radar',
      options: {}
    });
    this.addChartData();
    for (const dataSet of this.chart.data.datasets) {
      dataSet.fill = false;
    }
    this.chart.update();
  }

  preparePieChart(productGroup: Product[], availableYears: number[], currentUnit: string) {
    this.destroyCurrentChartAndAssignVariables(productGroup, availableYears, currentUnit);
    const averageValues: number[] = [];
    const productLabels: string[] = [];
    this.productGroup.forEach(product => {
      averageValues.push(Object.values(product.valuesPerYear).reduce((a, b) => a + b) / availableYears.length);
      productLabels.push(product.name);
    });
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: productLabels,
        datasets: [
          {
            label: this.currentUnit + '/rok/os',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#81b87d', '#ff6624', '#eee92d'],
            data: averageValues
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Średni udział produktów przez cały badany okres'
        },
        legend: {
          display: true
        }
      }, animation: {
        duration: 750
      }
    });
  }

  updateYearRange(yearFrom: number, yearTo: number) {
    const filteredYears: number[] = this.years.filter(y => y <= yearTo && y >= yearFrom).sort();
    if (this.chart.config.type !== 'doughnut') {
      this.chart.data.datasets = [];
      this.productGroup.forEach((product, index) => {
        const filteredValuesPerYear = [];
        filteredYears.forEach(y => filteredValuesPerYear.push(product.valuesPerYear[y]));
        const consecutiveColorIndex: string = Color[index % Object.keys(colors).length];
        this.chart.data.datasets.push({
          label: product.name,
          data: filteredValuesPerYear,
          backgroundColor: colors[consecutiveColorIndex].fill,
          pointBackgroundColor: colors[consecutiveColorIndex].stroke,
          borderColor: colors[consecutiveColorIndex].stroke,
          pointHighlightStroke: colors[consecutiveColorIndex].stroke,
          fill: true
        });
      });
      this.chart.data.labels = filteredYears;
    } else {
      const averageValues: number[] = [];
      this.productGroup.forEach(product => {
        const filteredValuesPerYear = [];
        filteredYears.forEach(y => filteredValuesPerYear.push(product.valuesPerYear[y]));
        if (filteredYears.length > 0) {
          averageValues.push(filteredValuesPerYear.reduce((a, b) => a + b) / filteredYears.length);
        }
      });
      this.chart.data.datasets[0].data = averageValues;
    }
    this.chart.options.animation.duration = 750;
    this.chart.options.legend.display = true;
    this.chart.update();
  }

}

enum Color {
  green, honey, orange, brown, black, lightBlue, pink, yellow
}

const colors = {
  green: {
    fill: '#81b87d',
    stroke: '#81b87d'
  },
  honey: {
    fill: '#c89635',
    stroke: '#c89635'
  },
  orange: {
    fill: '#ff6624',
    stroke: '#ff6624'
  },
  brown: {
    fill: '#ff9b5d',
    stroke: '#ff9b5d'
  },
  black: {
    fill: '#2e2e2e',
    stroke: '#2e2e2e'
  },
  lightBlue: {
    fill: '#00ecea',
    stroke: '#00ecea'
  },
  pink: {
    fill: '#fa92ff',
    stroke: '#fa92ff'
  },
  yellow: {
    fill: '#eee92d',
    stroke: '#eee92d'
  }
};
