class Controller {
    constructor() {
        this.tarefa_raiz = localStorage.tarefas 
            ? TarefaDesserializador.desserializar(localStorage.tarefas)
            : new Tarefa('Raíz');
        this.el_tarefa_atual = document.querySelector('#tarefa-atual');
        this.el_tarefas_filho = document.querySelector('#tarefas-filho');
        this.botao_adicionar = document.querySelector('#botao-adicionar');
        this.botao_concluir = document.querySelector('#botao-concluir');
    }

    render() {
        this.tarefa_atual = this.tarefa_raiz.getSubTarefaMaisPrioritaria();
        this.el_tarefa_atual.innerText = this.tarefa_atual.nome;
        this.el_tarefas_filho.value = "";
        localStorage.tarefas = this.tarefa_atual.getRaiz().serializar();
    }

    addListeners() {
        this.botao_adicionar.addEventListener('click', () => {
            var texto_tarefas_filhos = this.el_tarefas_filho.value.split('\n');
            texto_tarefas_filhos.forEach(texto => {
                var splitted_texto = texto.split('|');
                var tarefa = new Tarefa(splitted_texto[0]);
                this.tarefa_atual.addSubTarefa(tarefa);
                if (splitted_texto[1]) tarefa.setDataDeInicio(splitted_texto[1]);
            });
            this.render();
        });

        this.botao_concluir.addEventListener('click', () => {
            this.tarefa_atual.concluir();
            this.render();
        });
    }
}


