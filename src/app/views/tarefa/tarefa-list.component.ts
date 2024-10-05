import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../models/tarefa.model';
import { TarefaController } from '../../controllers/tarefa.controller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.css']
})
export class TarefaListComponent implements OnInit {
  tarefas: Tarefa[] = [];

  constructor(private tarefaController: TarefaController, private router: Router) { }

  ngOnInit(): void {
    this.loadTarefas();
  }

  // Método para carregar as tarefas
  loadTarefas(): void {
    this.tarefaController.getTarefas().subscribe(
      (tarefas: Tarefa[]) => {
        this.tarefas = tarefas;
      },
      (error) => {
        console.error('Erro ao carregar tarefas:', error);
      }
    );
  }

  // Criação de nova tarefa
  createTarefa(descricao: string): void {
    if (!descricao.trim()) return; // Impede a criação de tarefas com descrição vazia
    const novaTarefa = new Tarefa(descricao, false);
    this.tarefaController.createTarefa(novaTarefa).subscribe(
      () => this.loadTarefas(),
      (error) => console.error('Erro ao criar tarefa:', error)
    );
  }

  // Atualiza a tarefa quando modificada no componente filho
  updateTarefa(tarefa: Tarefa): void {
    console.log('ID enviado para atualização:', tarefa.id); // Verifique o ID no console
    this.tarefaController.updateTarefa(tarefa.id!, tarefa).subscribe(
      () => this.loadTarefas(),
      (error) => {
        console.error('Erro ao atualizar tarefa:', error); // Log completo do erro
      }
    );
  }

  // Remove a tarefa
  deleteTarefa(tarefa: Tarefa): void {
    this.tarefaController.deleteTarefa(tarefa.id!).subscribe(
      () => this.loadTarefas(),
      (error) => console.error('Erro ao deletar tarefa:', error)
    );
  }

  logout(): void {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
