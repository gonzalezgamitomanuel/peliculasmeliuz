import { Component, OnInit } from "@angular/core";
import { PeliculaService } from "../pelicula.service";
import { Pelicula } from "../models/Pelicula";
import { Actor } from "../models/Actor";

import * as Highcharts from "highcharts";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css"]
})
export class RolesComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  peliculas: Array<Pelicula> = [];
  peliculasApi = null;
  peliculaTmp: any;
  actores: Array<Actor> = [];

  chartOptions: Highcharts.Options = {
    chart: {
      type: "bar",
      backgroundColor: "#B1E2F7"
    },
    title: {
      text: "ROLES"
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0,
      title: {
        text: "Veces saliendo en una pelicula"
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: "normal"
      }
    },
    series: [
      {
        type: "bar",
        name: "Antagonista",
        data: [],
        color: "#D2B3F7"
      },
      {
        type: "bar",
        name: "Protagonista",
        data: [],
        color: "#7CF45C"
      },
      {
        type: "bar",
        name: "Veces personaje Secundario",
        data: [],
        color: "#777777"
      }
    ]
  };
  constructor(private peliculaService: PeliculaService) {}

  getPeliculasApi() {
    this.peliculaService.getPeliculasApi().subscribe(peliculas => {
      this.peliculasApi = peliculas;
      for (let pelicula of this.peliculasApi) {
        let actores: Array<Actor> = new Array();
        for (let actor of pelicula.actores) {
          let a = new Actor(
            actor.codigo,
            actor.nombre,
            actor.pelicula,
            actor.peliculasRealizadas,
            actor.tiempoPantalla,
            actor.vecesProtagonista,
            actor.vecesAntagonista
          );
          actores.push(a);
        }
        let p = new Pelicula(
          pelicula.id,
          pelicula.nombre,
          pelicula.recauentrada,
          pelicula.numdias,
          pelicula.sueldoactor,
          pelicula.numeroactores,
          actores
        );
        this.peliculas.push(p);
      }
      this.chartOptions.xAxis["categories"] = this.peliculas.map(
        (x: Pelicula) => x.nombre
      );

      const dataSeries1 = this.peliculas.map((x: Pelicula) => x.prota);
      const dataSeries = this.peliculas.map((x: Pelicula) => x.anta);
      const dataSeries2 = this.peliculas.map((x: Pelicula) => x.vecesSecundario);
      this.chartOptions.series[0]["data"] = dataSeries;
      this.chartOptions.series[1]["data"] = dataSeries1;
      this.chartOptions.series[2]["data"] = dataSeries2;

      Highcharts.chart("Grafico03", this.chartOptions);
    });
  }

  ngOnInit() {
    this.getPeliculasApi();
  }
}