import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PeliculasComponent } from "./peliculas/peliculas.component";
import { RouterModule, Routes } from "@angular/router";
import { PeliculaComponent } from "./pelicula/pelicula.component";
import { ActorComponent } from "./actor/actor.component";
import { GraficounoComponent } from "./graficouno/graficouno.component";
import { GraficodosComponent } from "./graficodos/graficodos.component";
import { RolesComponent } from "./roles/roles.component";
import { InformacionComponent } from "./informacion/informacion.component";

const routes: Routes = [
  { path: "informacion", component: InformacionComponent },
  { path: "listado", component: PeliculasComponent },
  { path: "pelicula/:id", component: PeliculaComponent },
  { path: "actor/:codigo", component: ActorComponent },
  { path: "graficouno", component: GraficounoComponent },
  { path: "roles", component: RolesComponent },
  { path: "graficodos", component: GraficodosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
