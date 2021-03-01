import { Component, OnInit } from "@angular/core";
import { PeliculaService } from "../pelicula.service";
import { Pelicula } from "../models/Pelicula";
import { Actor } from "../models/Actor";
@Component({
  selector: "app-peliculas",
  templateUrl: "./peliculas.component.html",
  styleUrls: ["./peliculas.component.css"]
})
export class PeliculasComponent implements OnInit {
  peliculas: Array<Pelicula> = [];
  peliculasApi = null;
  peliculaTmp: any;
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
    });
  }

  add(
    id: string,
    nombre: string,
    recauentrada: string,
    numdias: string,
    sueldoactor: string,
    numeroactores: string,
  ) {
    const idV = id.trim();
    const nombreV = nombre;
    const recauentradaV = parseInt(recauentrada);
    const numdiasV = parseInt(numdias);
    const sueldoactorV = parseInt(sueldoactor);
    const numeroactoresV = parseInt(numeroactores);

    if (recauentradaV < 0 || numdiasV < 0 || sueldoactorV < 0 ||numeroactoresV < 0 ) {
      return;
    }

    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      recauentrada: recauentradaV,
      numdias: numdiasV,
      sueldoactor: sueldoactorV,
      numeroactores: numeroactoresV
    };

    this.peliculaService.addPelicula(newDoc).subscribe(j => {
      this.peliculaTmp = newDoc;
      this.peliculas.push(this.peliculaTmp);
    });
  }

  ngOnInit() {
    this.getPeliculasApi();
  }
}
