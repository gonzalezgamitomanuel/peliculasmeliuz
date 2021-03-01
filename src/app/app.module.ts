import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from "highcharts-angular";

import { APP_BASE_HREF } from "@angular/common";

import { AppComponent } from "./app.component";
import { PeliculaService } from "./pelicula.service";
import { PeliculasComponent } from './peliculas/peliculas.component';
import { AppRoutingModule } from "./app-routing.module";
import { PeliculaComponent } from './pelicula/pelicula.component';
import { ActorComponent } from "./actor/actor.component";
import { GraficounoComponent } from "./graficouno/graficouno.component";
import { GraficodosComponent } from "./graficodos/graficodos.component";
import { RolesComponent } from "./roles/roles.component";
import { InformacionComponent } from './informacion/informacion.component';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    HttpClientModule,
    HighchartsChartModule
    ],
  declarations: [
    AppComponent, 
    PeliculasComponent, 
    PeliculaComponent,
    ActorComponent,
    GraficounoComponent,
    GraficodosComponent,
    RolesComponent,
    InformacionComponent
    ],
  bootstrap: [AppComponent],
  providers: [PeliculaService, {provide:
    APP_BASE_HREF, useValue: '/informacion'}]
})
export class AppModule {}
