import { Component, ViewChild } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { MonthSalesService } from '../month-sales-grafic/month-sales.service';
import { DataTable } from 'src/app/interfaces/data-table';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-grafics',
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.scss']
})
export class GraficsComponent {

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
        height: 300,
        type: "radialBar",

      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "17px"
            },
            value: {
              fontSize: "20px"
            },
            total: {
              show: true,
              label: "Total Año $",
              formatter: (val) => {
                return String(this.anioDinero);
              }
            }
          }
        }
      },
      labels: ["Ordenes Anuales", "Importe Anual"]
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
