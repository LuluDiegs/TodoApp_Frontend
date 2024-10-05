import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: '../views/usuario/login.component.html',
  styleUrls: ['../views/usuario/login.component.css']
})
export class UsuarioController {
  email: string = '';
  senha: string = '';
  mensagem: string = '';

  constructor(private usuarioService: UsuarioService) { }

  login(): void {
    this.usuarioService.login(this.email, this.senha).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.mensagem = 'Login realizado com sucesso!';
      },
      (error) => {
        this.mensagem = 'Falha ao realizar login.';
      }
    );
  }

  register(nome: string, sobrenome: string, email: string, senha: string): void {
    const usuario = new Usuario(nome, sobrenome, email, senha);
    this.usuarioService.register(usuario).subscribe(
      () => this.mensagem = 'Registro realizado com sucesso!',
      (error) => this.mensagem = 'Falha no registro.'
    );
  }

  alterarSenha(senhaAntiga: string, novaSenha: string): void {
    this.usuarioService.alterarSenha(senhaAntiga, novaSenha).subscribe(
      () => this.mensagem = 'Senha alterada com sucesso!',
      (error) => this.mensagem = 'Erro ao alterar a senha.'
    );
  }

  deletarConta(senha: string): void {
    this.usuarioService.deletarConta(senha).subscribe(
      () => {
        this.mensagem = 'Conta deletada com sucesso!';
        this.logout();
      },
      (error) => this.mensagem = 'Erro ao deletar conta.'
    );
  }

  recuperarSenha(email: string): void {
    this.usuarioService.recuperarSenha(email).subscribe(
      () => this.mensagem = 'Instruções enviadas para seu e-mail.',
      (error) => this.mensagem = 'Erro ao recuperar a senha.'
    );
  }

  redefinirSenha(token: string, novaSenha: string): void {
    this.usuarioService.redefinirSenha(token, novaSenha).subscribe(
      () => this.mensagem = 'Senha redefinida com sucesso!',
      (error) => this.mensagem = 'Erro ao redefinir a senha.'
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
