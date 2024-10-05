import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ItemComponent } from './views/tarefa/tarefa-item.component';
import { TarefaListComponent } from './views/tarefa/tarefa-list.component';
import { LoginComponent } from './views/usuario/login.component';
import { RegisterComponent } from './views/usuario/register.component';
import { AlterarSenhaComponent } from './views/usuario/alterar-senha.component';
import { DeletarContaComponent } from './views/usuario/deletar-conta.component';
import { RecuperarSenhaComponent } from './views/usuario/recuperar-senha.component';
import { RedefinirSenhaComponent } from './views/usuario/redefinir-senha.component';
import { VerificarEmailComponent } from './views/usuario/verificar-email.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    TarefaListComponent,
    LoginComponent,
    RegisterComponent,
    AlterarSenhaComponent,
    DeletarContaComponent,
    RecuperarSenhaComponent,
    RedefinirSenhaComponent,
    VerificarEmailComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
