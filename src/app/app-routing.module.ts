import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/usuario/login.component';
import { RegisterComponent } from './views/usuario/register.component';
import { TarefaListComponent } from './views/tarefa/tarefa-list.component';
import { AlterarSenhaComponent } from './views/usuario/alterar-senha.component';
import { DeletarContaComponent } from './views/usuario/deletar-conta.component';
import { RecuperarSenhaComponent } from './views/usuario/recuperar-senha.component';
import { RedefinirSenhaComponent } from './views/usuario/redefinir-senha.component';
import { VerificarEmailComponent } from './views/usuario/verificar-email.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verificar-email', component: VerificarEmailComponent },
  { path: 'tarefas', component: TarefaListComponent },
  {
    path: 'settings', component: SettingsComponent, children: [
      { path: 'alterar-senha', component: AlterarSenhaComponent },
      { path: 'deletar-conta', component: DeletarContaComponent }
    ]
  },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'resetar-senha', component: RedefinirSenhaComponent },
  // Adicione a rota correta para 'forgot-password'
  { path: 'forgot-password', component: RecuperarSenhaComponent },
  { path: '**', redirectTo: '/login' } // Rota para redirecionar para o login caso a rota não seja encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
