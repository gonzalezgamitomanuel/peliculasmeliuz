import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actor } from "./models/Actor";

@Injectable({ providedIn: "root" })
export class PeliculaService {
  private url = "https://peliculas-restapi.herokuapp.com/";
  constructor(private http: HttpClient) {}
  getPeliculasApi() {
    const urlget = `${this.url}peliculas`;
    return this.http.get(urlget);
  }

  addPelicula(doc: any) {
    return this.http.post(this.url, doc);
  }

  getPelicula(id: string) {
    const url = `https://peliculas-restapi.herokuapp.com/pelicula/${id}`;
    return this.http.get(url);
  }

  addActor(doc: any) {
    const url = "https://peliculas-restapi.herokuapp.com/actor";
    return this.http.post(url, doc);
  }

  updatePelicula(doc: any) {
    const url = `https://peliculas-restapi.herokuapp.com/pelicula/${doc.id}`;
    return this.http.post(url, doc);
  }

  deleteActor(actor: Actor) {
    const url = `https://peliculas-restapi.herokuapp.com/deleteActor/${
      actor.codigo
    }&${actor.pelicula}`;
    return this.http.get(url);
  }

  getActor(codigo: string, pelicula: string) {
    const url = `https://peliculas-restapi.herokuapp.com/actor/${codigo}&${pelicula}`;
    return this.http.get(url);
  }

  updateActor(doc: any) {
    const url = `https://peliculas-restapi.herokuapp.com/actor/${
      doc.codigo
      }&${doc.pelicula}`;
    return this.http.post(url, doc);
  }
}
