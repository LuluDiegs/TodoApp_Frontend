import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent {
  novaSenha = '';
  confirmarSenha = '';
  token = '';
  mensagem = '';

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) {
    this.token = this.route.snapshot.queryParams['token'] || '';
    if (!this.token) {
      this.mensagem = 'Token não fornecido ou inválido.';
    }
  }

  redefinirSenha(): void {
    if (!this.token) {
      this.mensagem = 'Token não fornecido. Tente acessar o link novamente.';
      return;
    }

    if (this.novaSenha.length < 6) {
      this.mensagem = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    if (this.novaSenha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não coincidem.';
      return;
    }

    this.usuarioService.redefinirSenha(this.novaSenha, this.token).subscribe(
      () => {
        this.mensagem = 'Senha redefinida com sucesso!';
        setTimeout(() => this.router.navigate(['/login']));
      },
      (error) => {
        this.mensagem = 'Erro ao redefinir a senha. Tente novamente.';
      }
    );
  }
}
