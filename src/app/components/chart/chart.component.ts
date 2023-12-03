import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ExchangeRateParams } from '../../services/currency-values.service';

import { CurrencyDropdownComponent } from '../currency-dropdown/currency-dropdown.component';
import { ChartService } from '../../services/currency-values.service';
enum TimeInterval {
  _15M = '15M',
  _1H = '1H',
  _1D = '1D',
  _1M = '1M',
  _1W = '1W',
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('myChart') chartCanvas!: ElementRef;
  // @ViewChild('myChart', { static: false }) chartCanvas!: ElementRef;

  @Input() currencyFrom: string = '';
  @Input() currencyTo: string = '';
  timeInterval: TimeInterval = TimeInterval._15M;

  exchangeRate: number = 0;
  exchangeRatePercentage: number = 0;

  myChart!: Chart;
  timeIntervals = [
    TimeInterval._15M,
    TimeInterval._1H,
    TimeInterval._1D,
    TimeInterval._1M,
    TimeInterval._1W,
  ];

  //timeIntervals = ['15M', '1H', '1D', '1M', '1W'];

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    console.log('selected first is : ' + this.currencyFrom);
    console.log('selected second is : ' + this.currencyTo);
    console.log('time interval is : ' + this.timeInterval);
  }

  ngAfterViewInit() {
    console.log('........................');
    console.log(this.chartCanvas.nativeElement);
    if (this.chartCanvas) {
      console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyy');
      this.createChart(TimeInterval._15M);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currencyFrom'] || changes['currencyTo']) {
      console.log('in If onchange');
      this.createChart(this.timeInterval);
    }
  }

  createChart(interval: TimeInterval) {
    if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
      console.error('Chart canvas not available!');
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found!');
      return;
    }
    let quotes: any[] = [];

    let todayDate = new Date();
    let date = new Date();
    let labels: number[] = [];

    switch (interval) {
      case TimeInterval._15M:
      case TimeInterval._1H:
        break;
      case TimeInterval._1D:
        date.setDate(todayDate.getDate() - 1);
        break;
      case TimeInterval._1M:
        date.setMonth(todayDate.getMonth() - 1);
        break;
      case TimeInterval._1W:
        date.setDate(todayDate.getDate() - 7);
        break;
    }

    let endDate = `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${todayDate.getDate().toString().padStart(2, '0')}`;

    let startDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const params: ExchangeRateParams = {
      currencyFrom: this.currencyFrom,
      currencyTo: this.currencyTo,
      startDate: startDate,
      endDate: endDate,
    };
    this.chartService.getExchangeRate(params).subscribe((data: any) => {
      console.log('API Data:', data);
      const values = data.quotes.map((quote: any) => quote.close);
      const quotes = data.quotes;
      const highFirst = quotes[0].high;
      const highSecond = quotes[0].close;
      const labels = this.getMinutesLabels(quotes, interval);

      console.log(`High for ${this.currencyFrom}:`, highFirst);
      console.log(`High for ${this.currencyTo}:`, highSecond);

      this.exchangeRate = highFirst / highSecond;
      this.exchangeRatePercentage = this.exchangeRate * 100;

      console.log(`Exchange Rate:`, this.exchangeRate);
      console.log(`Exchange Rate percentage:`, this.exchangeRatePercentage);

      labels.unshift(labels[0]);
      values.unshift(0);

      if (this.myChart) {
        this.myChart.destroy();
      }

      setTimeout(() => {
        this.myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Exchange Rate',
                data: values,
                borderColor: 'rgba(157, 202, 95, 1)',
                backgroundColor: 'rgba(243, 249, 235, 1)',
                borderWidth: 1,
                fill: true,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: interval === '1H' ? 'linear' : 'time',
                grid: {
                  display: false,
                },
              },
              y: {
                display: false,
                beginAtZero: true,
              },
            },
            layout: {
              padding: {
                bottom: 10,
              },
            },
            elements: {
              line: {
                borderWidth: 0,
              },
              point: {
                radius: 0,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            interaction: {
              mode: 'nearest',
            },
          },
        });
      }, 0);
      // this.myChart = new Chart(ctx, {
      //   type: 'line',
      //   data: {
      //     labels: labels,
      //     datasets: [
      //       {
      //         label: 'Exchange Rate',
      //         data: values,
      //         borderColor: 'rgba(157, 202, 95, 1)',
      //         backgroundColor: 'rgba(243, 249, 235, 1)',

      //         borderWidth: 1,
      //         fill: true,
      //       },
      //     ],
      //   },
      //   options: {
      //     scales: {
      //       x: {
      //         grid: {
      //           display: false,
      //         },
      //       },
      //       y: {
      //         display: false,
      //         beginAtZero: true,

      //         // ticks: {
      //         //   display: false,
      //         // },
      //       },
      //     },
      //     layout: {
      //       padding: {
      //         bottom: 10,
      //       },
      //     },
      //     elements: {
      //       line: {
      //         borderWidth: 0,
      //       },
      //       point: {
      //         radius: 0,
      //       },
      //     },
      //     plugins: {
      //       legend: {
      //         display: false,
      //       },
      //     },
      //     interaction: {
      //       mode: 'nearest',
      //     },
      //   },
      // });
    });
  }

  getMinutesLabels(quotes: any[], interval: TimeInterval): number[] {
    let startTime: number;

    if (interval === TimeInterval._15M || interval === TimeInterval._1H) {
      const requestTime = new Date(quotes[0].request_time);

      if (interval === TimeInterval._15M) {
        startTime = requestTime.getTime() - 15 * 60 * 1000;
      } else if (interval === TimeInterval._1H) {
        startTime = new Date(
          requestTime.getFullYear(),
          requestTime.getMonth(),
          requestTime.getDate(),
          requestTime.getHours()
        ).getTime();
      }
    } else {
      console.error('Unsupported interval:', interval);
      return [];
    }
    
    return quotes.map((quote: any) => {
      const timeDiff = new Date(quote.date).getTime() - startTime;
      return timeDiff / (60 * 1000);
    });
  }

  selectInterval(interval: TimeInterval) {
    this.timeInterval = interval;
    this.createChart(this.timeInterval);
  }
}
