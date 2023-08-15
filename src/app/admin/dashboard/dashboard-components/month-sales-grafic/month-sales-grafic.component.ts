import { Component, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { MonthSalesService } from './month-sales.service';
import { DataTable, Lista } from 'src/app/interfaces/data-table';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  //legend: ApexLegend;
};

@Component({
  selector: 'app-month-sales-grafic',
  templateUrl: './month-sales-grafic.component.html',
  styleUrls: ['./month-sales-grafic.component.scss']
})
export class MonthSalesGraficComponent {
  if(monthSalesGraficComponent: MonthSalesGraficComponent) {
    throw new Error('Method not implemented.');
  }

  mes: string[] = [];
  cantOrdenes: number[] = [];
  totalMes: number[] = [];
  porcientoMes: number[] = [];
  totalDineroAnio: number = 0;
  totalOrdAnio: number = 0;

  listaObjetos: any [] = [];
  anioDinero!: number;
  anioOrden!: number;

  public chartOptions: ChartOptions;

  constructor(
    private monhtSaleService: MonthSalesService,

  ) {
    this.chartOptions = {      series: [
        {
          name: "Total de Ordenes",
          data: this.cantOrdenes
        },
        {
          name: "Importe Total Ordenes",
          data: this.totalMes
        },
        {
          name: "Porciento %",
          data: this.porcientoMes
        }
      ],
      chart: {
        type: "bar",
        height: 300
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          //endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: this.mes = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ]
      },
      yaxis: {
        title: {
          text: "$ (importes) año 2023"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "" + val ;
          }
        }
      }
    };
  }

  ngOnInit(data: DataTable): void {
    this.monhtSaleService.getTableData().subscribe({
      next: (response) => {

        this.anioDinero = response.totalDinero;
        this.anioOrden = response.totalOrd;

        //console.log(this.anioDinero, this.anioOrden);

        const objeto = response;
        console.log('Respuesta OBJETO',objeto);
        const { lista } = objeto;

        const listaObjetos = lista;
        console.log('ESPERO SOLO EL ARREGLO DE LISTA',listaObjetos);

        this.mes = listaObjetos.map((item: Lista) => item.mes);
        this.cantOrdenes = listaObjetos.map((item: Lista) => item.cantOrdenes);
        this.totalMes = listaObjetos.map((item: Lista) => item.totalMes);
        this.porcientoMes = listaObjetos.map((item: Lista) => item.porciento);


        // Actualizar los valores del gráfico
        this.chartOptions.series = [
          { name: "Total de Ordenes", data: this.cantOrdenes },
          { name: "Importe Total Ordenes", data: this.totalMes },
          { name: "Porciento %", data: this.porcientoMes }
        ];

        // Actualizar las categorías del eje X
        this.chartOptions.xaxis.categories = this.mes;

      }

    })

  }

}



