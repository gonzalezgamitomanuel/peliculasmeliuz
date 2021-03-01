import { Actor } from "./Actor";

export class Pelicula {
  private _id: string;
  private _nombre: string;
  private _recauentrada: number;
  private _numdias: number;
  private _sueldoactor: number;
  private _numeroactores: number;
  private _actores: Array<Actor>;

  public constructor(
    id: string,
    nombre: string,
    recauentrada: number,
    numdias: number,
    sueldoactor: number,
    numeroactores: number,
    actores: Array<Actor>
  ) {
    (this._id = id),
      (this._nombre = nombre),
      (this._recauentrada = recauentrada),
      (this._numdias = numdias),
      (this._sueldoactor = sueldoactor),
      (this._numeroactores = numeroactores),
      (this._actores = actores);
  }

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  get recauentrada() {
    return this._recauentrada;
  }

  get numdias() {
    return this._numdias;
  }

  get sueldoactor() {
    return this._sueldoactor;
  }

  get numeroactores() {
    return this._numeroactores;
  }

  get actores() {
    return this._actores;
  }

  get costactores() { 
    let resul=this._sueldoactor*this._numeroactores; 
    return resul; 
    }
  
  get ganado() {
    let resul=this._recauentrada*this._numdias;
    return resul;
  }
  
  get prota() {
    let resul = 0;
    for (let a of this.actores) {
      resul = resul + a.vecesProtagonista;
    }
    return resul;
  }

  get anta() {
    let resul = 0;
    for (let a of this.actores) {
      resul = resul + a.vecesAntagonista;
    }
    return resul;
  }

  get vecesSecundario() {
    let resul = 0;
    for (let a of this.actores) {
    resul = resul + a.peliculasRealizadas-(a.vecesProtagonista + a.vecesAntagonista);
    }
    return resul;
  }
}
