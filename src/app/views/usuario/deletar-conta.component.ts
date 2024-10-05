import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-deletar-conta',
  templateUrl: './deletar-conta.component.html',
  styleUrls: ['./deletar-conta.component.css']
})
export class DeletarContaComponent {
  senha: string = '';
  confirmarSenha: string = '';
  mensagem: string = '';
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  deletarConta(): void {
    if (this.senha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não correspondem.';
      return;
    }

    if (confirm('Você tem certeza que deseja deletar sua conta?')) {
      this.usuarioService.deletarConta(this.senha).subscribe(
        () => {
          this.mensagem = 'Conta deletada com sucesso!';
          this.router.navigate(['/login']);
        },
        (error) => {
          this.mensagem = 'Erro ao deletar conta. Tente novamente.';
          console.error('Erro ao deletar conta:', error);
        }
      );
    }
  }
}
