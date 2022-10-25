import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/inside/board/board.component';
import { WorkspaceComponent } from './components/inside/workspace/workspace.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "workspace",
    component: WorkspaceComponent,
  },
  {
    path: "workspace/:id",
    component: BoardComponent,
  },
  {
    path: "**",
    redirectTo: "/",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
