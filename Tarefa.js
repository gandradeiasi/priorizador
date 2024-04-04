class Tarefa {
    constructor(nome) {
        this.nome = nome;
        this.subTarefas = [];
    }

    setDataDeInicio(data) {
        if (!this.pai) throw new Error('Tarefa não foi adicionada a um pai')
        this.dataDeInicio = data;
        this.pai.repriorizar();
    }
    
    getSubTarefaMaisPrioritaria() {
        if (this.subTarefas.length == 0) return this;
        return this.subTarefas[0].getSubTarefaMaisPrioritaria();
    }

    getSubTarefaPorPrioridade(prioridade) {
        return this.subTarefas[prioridade];
    }

    getRaiz() {
        if (!this.pai) return this;
        return this.pai.getRaiz();
    }

    repriorizar() {
        this.subTarefas.sort((a,b) => {
            if (a.dataDeInicio == b.dataDeInicio) return 0;
            if (!a.dataDeInicio && b.dataDeInicio) return -1;
            if (a.dataDeInicio && !b.dataDeInicio) return 1;
            if (a.dataDeInicio > b.dataDeInicio) return 1;
            return -1;
        });
    }

    serializar(stringify = true) {
        var retorno = {
            nome: this.nome,
            subTarefas: []
        };
        if (this.dataDeInicio) retorno.dataDeInicio = this.dataDeInicio;
        this.subTarefas.forEach(subTarefa => {
            retorno.subTarefas.push(subTarefa.serializar(false))
        });
        return stringify ? JSON.stringify(retorno) : retorno;
    }

    addSubTarefa(tarefa) {
        tarefa.setPai(this);
        this.subTarefas.push(tarefa);
        this.repriorizar();
    }
    
    setPai(pai) {
        this.pai = pai;
    }

    concluir() {
        var it = this;
        it.pai.subTarefas.forEach((tarefa,i) => {
            if (tarefa == it) it.pai.subTarefas.splice(i,1);
        });
    }
}

class TarefaDesserializador {
    static desserializar(json, pai) {
        if (typeof json == "string") json = JSON.parse(json);
        var retorno = new Tarefa(json.nome);
        if (pai) retorno.setPai(pai);
        if (json.dataDeInicio) retorno.setDataDeInicio(new Date(json.dataDeInicio));
        json.subTarefas.forEach(subTarefa => {
            retorno.addSubTarefa(TarefaDesserializador.desserializar(subTarefa, retorno));
        })
        return retorno;
    }
}