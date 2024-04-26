import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignUpComponent } from './components/signup/signup.component';
import { PanelComponent } from './components/contenido/panel/panel.component';
import { TareasComponent } from './components/contenido/tareas/tareas.component';
import { AuthGuard } from './services/guard/authGuard.component';


const routes: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: 'main' , component: MainComponent, canActivate: [AuthGuard], children: 
    [  
    { path: 'panel' , component: PanelComponent },
    { path: 'tareas' , component: TareasComponent },
    ]
   },
  { path: 'signup' , component: SignUpComponent },
  { path: '**' , redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
