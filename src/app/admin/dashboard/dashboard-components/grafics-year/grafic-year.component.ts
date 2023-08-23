import { Component, ViewChild } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexFill, ApexLegend, ApexDataLabels, ChartComponent } from 'ng-apexcharts';
import { MonthSalesService } from '../month-sales-grafic/month-sales.service';
import { DataTable } from 'src/app/interfaces/data-table';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  //labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-grafic-year',
  templateUrl: './grafic-year.component.html',
  styleUrls: ['./grafic-year.component.scss']

})

export class GraficYearsComponent {

  mes: string[] = [];
  cantOrdenes: number[] = [];
  totalMes: number[] = [];
  porcientoMes: number[] = [];

  listaObjetos: any [] = [];
  anio!: any [];
  anioDinero!: number;
  anioOrden!: number;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor(
    private monhtSaleService: MonthSalesService,
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 350,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(data: DataTable): void {
    this.monhtSaleService.getTableData().subscribe({
      next: (response) => {
        this.anioDinero = response.totalDinero;
        this.anioOrden = response.totalOrd;

        //actualizar el charOptions con los nuevos valores

        this.chartOptions.series = [this.anioOrden, this.anioDinero];
        // console.log('Chart Series', this.chartOptions.series)
      }
    })
  }

}
