import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private apiURL = 'https://apiluiza188543.onrender.com/api/tarefas';

  constructor(private http: HttpClient) { }

  getTarefas(): Observable<Tarefa[]> {
    const headers = this.createHeaders();
    return this.http.get<Tarefa[]>(`${this.apiURL}/getAll`, { headers });
  }

  createTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.apiURL}/post`, tarefa, {
      headers: this.createHeaders(),
    });
  }

  updateTarefa(id: string | null, tarefa: Tarefa): Observable<Tarefa> {
    if (!id) {
      throw new Error('ID da tarefa não pode ser nulo.');
    }

    const tarefaAtualizada = {
      ...tarefa,
      concluida: tarefa.concluida === true
    };

    return this.http.patch<Tarefa>(`${this.apiURL}/update/${id}`, tarefaAtualizada, {
      headers: this.createHeaders(),
    });
  }

  deleteTarefa(id: string | null): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/delete/${id}`, {
      headers: this.createHeaders(),
    });
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
