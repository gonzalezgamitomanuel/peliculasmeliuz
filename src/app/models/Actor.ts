export class Actor {
  private _codigo: string;
  private _nombre: string;
  private _pelicula: string;
  private _peliculasRealizadas: number;
  private _tiempoPantalla: number;
  private _vecesProtagonista: number;
  private _vecesAntagonista: number;

  public constructor(
    codigo: string,
    nombre: string,
    pelicula: string,
    peliculasRealizadas: number,
    tiempoPantalla: number,
    vecesProtagonista: number,
    vecesAntagonista: number
  ) {
    (this._codigo = codigo),
      (this._nombre = nombre),
      (this._pelicula = pelicula),
      (this._peliculasRealizadas = peliculasRealizadas),
      (this._tiempoPantalla = tiempoPantalla),
      (this._vecesProtagonista = vecesProtagonista),
      (this._vecesAntagonista = vecesAntagonista);
  }

  get codigo() {
    return this._codigo;
  }
  get nombre() {
    return this._nombre;
  }
  get pelicula() {
    return this._pelicula;
  }
  get peliculasRealizadas() {
    return this._peliculasRealizadas;
  }
  get tiempoPantalla() {
    return this._tiempoPantalla;
  }
  get vecesProtagonista() {
    return this._vecesProtagonista;
  }
  get vecesAntagonista() {
    return this._vecesAntagonista;
  }
}
