import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-item',
  templateUrl: './tarefa-item.component.html',
  styleUrls: ['./tarefa-item.component.css']
})
export class ItemComponent {
  emEdicao = false;
  @Input() tarefa: Tarefa = new Tarefa("", false);
  @Output() removeTarefa = new EventEmitter();
  @Output() modificaTarefa = new EventEmitter();

  toggleConcluida() {
    this.tarefa.concluida = !this.tarefa.concluida;
    this.modificaTarefa.emit(this.tarefa);
  }

  confirmRemove() {
    const confirmRemoval = confirm('Você realmente deseja remover esta tarefa?');
    if (confirmRemoval) {
      this.removeTarefa.emit();
    }
  }

  updateDescricao(novaDescricao: string) {
    this.tarefa.descricao = novaDescricao;
    this.emEdicao = false;
    this.modificaTarefa.emit(this.tarefa);
  }
}
