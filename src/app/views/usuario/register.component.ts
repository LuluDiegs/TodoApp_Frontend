import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nome = '';
  sobrenome = '';
  email = '';
  senha = '';
  mensagem = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  register(): void {
    const usuario = new Usuario(this.nome, this.sobrenome, this.email, this.senha);

    this.usuarioService.register(usuario).subscribe(
      () => {
        this.mensagem = 'Registro realizado com sucesso!';
        this.router.navigate(['usuario/login']);  // Redireciona para a página de login
      },
      (error) => {
        this.mensagem = 'Falha no registro. Tente novamente.';
      }
    );
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}
