import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PeliculaService } from "../pelicula.service";
import { Actor } from "../models/Actor";
import { Location } from "@angular/common";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"]
})
export class ActorComponent implements OnInit {
  actor: Actor;
  actorApi = null;

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private location: Location
  ) {}

  getActor(): void {
    let codigo = this.route.snapshot.paramMap.get("codigo");
    let c = codigo.split("&");

    codigo = c[0];
    let pelicula = c[1];
    console.log(codigo, pelicula);

    this.peliculaService.getActor(codigo, pelicula).subscribe(p => {
      this.actorApi = p;
      this.actor = new Actor(
        this.actorApi.codigo,
        this.actorApi.nombre,
        this.actorApi.pelicula,
        this.actorApi.peliculasRealizadas,
        this.actorApi.tiempoPantalla,
        this.actorApi.vecesProtagonista,
        this.actorApi.vecesAntagonista
      );
    });
    console.log(pelicula);
  }

  save( 
    nombre: string, 
    peliculasRealizadas: string, 
    tiempoPantalla: string, 
    vecesProtagonista: string,
    vecesAntagonista: string
    ): void {
    const nombreV = nombre.trim();
    const peliculasRealizadasV = parseInt(peliculasRealizadas);
    const tiempoPantallaV = parseInt(tiempoPantalla);
    const vecesProtagonistaV = parseInt(vecesProtagonista);
    const vecesAntagonistaV = parseInt(vecesAntagonista);
    if (
      peliculasRealizadasV < 0 ||
      tiempoPantallaV < 0 ||
      vecesProtagonistaV < 0 ||
      vecesAntagonistaV < 0
    ) {
      return;
    }
    const doc = {
      codigo: this.actor.codigo,
      nombre: nombreV,
      pelicula: this.actor.pelicula,
      peliculasRealizadas: peliculasRealizadasV,
      tiempoPantalla: tiempoPantallaV,
      vecesProtagonista: vecesProtagonistaV,
      vecesAntagonista: vecesAntagonistaV
    };
    this.peliculaService.updateActor(doc).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getActor();
  }
}