export class Tarefa {
  id?: string;
  descricao: string;
  concluida: boolean;

  constructor(descricao: string, concluida: boolean) {
    this.descricao = descricao;
    this.concluida = concluida;
  }
}
