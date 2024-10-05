import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaController {
  private apiURL = 'https://apiluiza188543.onrender.com/api/tarefas';

  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiURL}/getAll`, {
      headers: this.createHeaders(),
    });
  }

  createTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.apiURL}/post`, tarefa, {
      headers: this.createHeaders(),
    });
  }

  updateTarefa(id: string, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.apiURL}/update/${id}`, tarefa, {
      headers: this.createHeaders(),
    });
  }

  deleteTarefa(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/delete/${id}`, {
      headers: this.createHeaders(),
    });
  }
}
