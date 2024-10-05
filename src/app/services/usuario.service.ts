import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';  // Certifique-se de ter esse modelo de dados

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuario';  // URL base da API

  constructor(private http: HttpClient) { }

  // Método de login
  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha });
  }

  // Método para registrar um novo usuário
  register(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/create`, usuario, { headers });
  }

  verificarEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verificar-email?token=${token}`);
  }

  // Método para alterar a senha do usuário (autenticado)
  alterarSenha(senhaAntiga: string, novaSenha: string): Observable<any> {
    const token = localStorage.getItem('token');  // Obtém o token do localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Define o tipo de conteúdo
    });

    // Use a URL correta para a requisição
    return this.http.patch(`${this.apiUrl}/alterar-senha`, { senhaAntiga, novaSenha }, { headers });
  }

  // Método para deletar a conta do usuário (autenticado)
  deletarConta(senha: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Define o tipo de conteúdo
    });

    return this.http.delete(`${this.apiUrl}/deletarConta`, { headers, body: { senha } }); // Passa a senha no corpo da requisição
  }

  // Método para enviar o e-mail de recuperação de senha
  recuperarSenha(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/esqueceu-senha`, { email }, { headers });
  }

  // Método para redefinir a senha usando um token de recuperação
  redefinirSenha(novaSenha: string, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/resetar-senha`, { novaSenha, token }, { headers });
  }
}
