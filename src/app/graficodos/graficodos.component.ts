import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { PeliculaService } from "../pelicula.service";

@Component({
  selector: "app-graficodos",
  templateUrl: "./graficodos.component.html",
  styleUrls: ["./graficodos.component.css"]
})
export class GraficodosComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "#A8F7F5",
      borderRadius: 80,
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: "Recaudacion Entrada"
    },
    yAxis: {
      accessibility: {},
      title: {
        text: "Dinero"
      }
    },
    colors: ["#AD5CFA"],
    xAxis: {
      accessibility: {},
      title: {
        text: "Peliculas"
      }
    },
    series: [
      {
        type: "area",
        data: [],
        name: "Dinero",
        lineColor: "D3B2F9"
      }
    ],

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      backgroundColor: "#D3B2F9"
    }
  };

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit() {
    this.getDatos();
  }
  getDatos() {
    this.peliculaService.getPeliculasApi().subscribe(
      result => {
        const misDatos: any = result;
        const dataSeries = misDatos.map((x: any) => x.recauentrada);
        const dataCategorias = misDatos.map((x: any) => x.nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("graficodos", this.chartOptions);
      },
      error => console.log(error)
    );
  }
}