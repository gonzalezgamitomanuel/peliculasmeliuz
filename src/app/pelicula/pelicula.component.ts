import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PeliculaService } from "../pelicula.service";
import { Pelicula } from "../models/Pelicula";
import { Actor } from "../models/Actor";
import { Location } from "@angular/common";

@Component({
  selector: "app-pelicula",
  templateUrl: "./pelicula.component.html",
  styleUrls: ["./pelicula.component.css"]
})
export class PeliculaComponent implements OnInit {
  pelicula: Pelicula;
  peliculaApi = null;

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private location: Location
  ) {}

  getPelicula(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this.peliculaService.getPelicula(id).subscribe(e => {
      this.peliculaApi = e;
      let actores: Array<Actor> = new Array();
      for (let actor of this.peliculaApi[0].actores) {
        let j = new Actor(
          actor.codigo,
          actor.nombre,
          actor.pelicula,
          actor.peliculasRealizadas,
          actor.tiempoPantalla,
          actor.vecesProtagonista,
          actor.vecesAntagonista,
        );
        actores.push(j);
      }
      this.pelicula = new Pelicula(
        this.peliculaApi[0].id,
        this.peliculaApi[0].nombre,
        this.peliculaApi[0].recauentrada,
        this.peliculaApi[0].numdias,
        this.peliculaApi[0].sueldoactor,
        this.peliculaApi[0].numeroactores,
        actores
      );
    });
  }

  add(
    codigo: string,
    nombre: string,
    peliculasRealizadas: string,
    tiempoPantalla: string,
    vecesProtagonista: string,
    vecesAntagonista: string
  ) {
    const codigoV = parseInt(codigo);
    const nombreV = nombre.trim();
    const peliculasRealizadasV = parseInt(peliculasRealizadas);
    const tiempoPantallaV = parseInt(tiempoPantalla);
    const vecesProtagonistaV = parseInt(vecesProtagonista);
    const vecesAntagonistaV = parseInt(vecesAntagonista);
    if (codigoV < 0 || peliculasRealizadasV < 0 || tiempoPantallaV < 0 || 
    vecesProtagonistaV < 0 || vecesAntagonistaV < 0) {
      return;
    }

    const newDoc: any = {
      codigo: codigoV,
      nombre: nombreV,
      pelicula: this.pelicula.nombre,
      peliculasRealizadas: peliculasRealizadasV,
      tiempoPantalla: tiempoPantallaV,
      vecesProtagonista: vecesProtagonistaV,
      vecesAntagonista: vecesAntagonistaV
    };

    this.peliculaService.addActor(newDoc).subscribe(j => {
      const actorTmp: any = newDoc;
      this.pelicula.actores.push(actorTmp);
    });
  }

  save(
    recauentrada: string,
    numdias: string,
    sueldoactor: string,
    numeroactores: string
  ): void {
    const recauentradaV = parseInt(recauentrada);
    const numdiasV = parseInt(numdias);
    const sueldoactorV = parseInt(sueldoactor);
    const numeroactoresV = parseInt(numeroactores);
    if (
      recauentradaV < 0 ||
      numdiasV < 0 ||
      sueldoactorV < 0 ||
      numeroactoresV < 0
    ) {
      return;
    }
    const doc = {
      id: this.pelicula.id,
      nombre: this.pelicula.nombre,
      recauentrada: recauentradaV,
      numdias: numdiasV,
      sueldoactor: sueldoactorV,
      numeroactores: numeroactoresV
    };
    this.peliculaService.updatePelicula(doc).subscribe(() => this.goBack());
  }

  delete(actor: Actor): void {
    this.pelicula.actores.forEach((a, index) => {
      if (a === actor) this.pelicula.actores.splice(index, 1);
    });
    this.peliculaService.deleteActor(actor).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getPelicula();
  }
}