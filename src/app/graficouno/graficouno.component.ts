import { Component, OnInit } from "@angular/core";
import { PeliculaService } from "../pelicula.service";
import { Pelicula } from "../models/Pelicula";
import { Actor } from "../models/Actor";

import * as Highcharts from "highcharts";

@Component({
  selector: "app-graficouno",
  templateUrl: "./graficouno.component.html",
  styleUrls: ["./graficouno.component.css"]
})
export class GraficounoComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  peliculas: Array<Pelicula> = [];
  peliculasApi = null;
  peliculaTmp: any;
  actores: Array<Actor> = [];

  chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "#A8F7F5",
      borderRadius: 80,
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: "Peliculas Realizadas",
      style: {
        fontFamily: "Cambria",
        fontSize: "30px",
        color: "#4A45DD"
      }
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "Peliculas"
      }
    },

    series: [
      {
        type: "column",
        name: "Peliculas",
        data: [],
        color: "#894ACC"
      }
    ],
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "20px",
        color: "#303030"
      }
    }
  };

  constructor(private peliculaService: PeliculaService) {}

  getActores() {
    this.peliculaService.getPeliculasApi().subscribe(peliculas => {
      this.peliculasApi = peliculas;
      for (let pelicula of this.peliculasApi) {
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
          this.actores.push(a);
        }
      }
      let graficouno = this.actores.slice(0, 30);
      this.chartOptions.xAxis["categories"] = graficouno.map(
        (x: Actor) => x.nombre
      );
      this.chartOptions.series[0]["data"] = graficouno.map(
        (x: Actor) => x.peliculasRealizadas
      );

      Highcharts.chart("graficouno", this.chartOptions);
    });
  }

  ngOnInit() {
    this.getActores();
  }
}

