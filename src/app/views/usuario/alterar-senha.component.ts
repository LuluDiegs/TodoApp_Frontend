import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent {
  senhaAntiga = '';
  novaSenha = '';
  mensagem = '';

  constructor(private usuarioService: UsuarioService) { }

  alterarSenha(): void {
    this.usuarioService.alterarSenha(this.senhaAntiga, this.novaSenha).subscribe(
      () => {
        this.mensagem = 'Senha alterada com sucesso!';
        this.senhaAntiga = '';
        this.novaSenha = '';
      },
      (error) => {
        this.mensagem = 'Erro ao alterar senha. Verifique os dados e tente novamente.';
        console.error('Erro ao alterar senha:', error);
      }
    );
  }
}
