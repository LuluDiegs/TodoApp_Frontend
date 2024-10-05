import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {
  email = '';
  mensagem = '';

  constructor(private usuarioService: UsuarioService) { }

  recuperarSenha(): void {
    if (!this.email) {
      this.mensagem = 'Por favor, insira um endereço de e-mail válido.';
      return;
    }

    this.usuarioService.recuperarSenha(this.email).subscribe(
      () => {
        this.mensagem = 'Um e-mail de recuperação foi enviado para o seu endereço de e-mail.';
      },
      (error) => {
        this.mensagem = `Erro ao enviar o e-mail de recuperação: ${error.error?.error || 'Tente novamente.'}`;
        console.error('Erro ao enviar e-mail de recuperação:', error);
      }
    );
  }
}
