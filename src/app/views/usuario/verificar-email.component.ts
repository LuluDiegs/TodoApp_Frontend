import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit {
  mensagem: string = '';
  token: string | null = null; // Variável para armazenar o token da URL
  verificado: boolean = false; // Para rastrear se a verificação foi concluída

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtém o token dos parâmetros da URL e decodifica corretamente
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.mensagem = 'Token não fornecido. Verifique o link de verificação.';
    } else {
      this.mensagem = 'Por favor, clique no botão abaixo para verificar seu e-mail.';
    }
  }

  verificarEmail(): void {
    if (this.token) {
      // Chama o serviço para verificar o e-mail com o token capturado
      this.usuarioService.verificarEmail(this.token).subscribe(
        (response) => {
          this.mensagem = 'E-mail verificado com sucesso! Redirecionando para a página de login...';
          this.verificado = true; // Atualiza o status de verificação
          setTimeout(() => this.router.navigate(['/login']), 3000); // Redireciona após 3 segundos
        },
        (error) => {
          this.mensagem = 'Erro ao verificar e-mail. Tente novamente ou entre em contato com o suporte.';
          console.error('Erro ao verificar e-mail:', error);
        }
      );
    }
  }
}
