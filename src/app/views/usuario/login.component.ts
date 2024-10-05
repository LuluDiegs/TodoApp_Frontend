import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  mensagem: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  login(): void {
    this.usuarioService.login(this.email, this.senha).subscribe(
      (res) => {
        console.log('Token recebido após login:', res.token);  // Adicione isso para verificar o token
        localStorage.setItem('token', res.token);
        this.mensagem = 'Login realizado com sucesso!';
        this.router.navigate(['/tarefas']);
      },
      (error) => {
        this.mensagem = 'Falha ao realizar login. Verifique suas credenciais.';
      }
    );
  }

}

