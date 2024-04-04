var tarefa_raiz = new Tarefa('Raíz');
var tarefa_filho_1 = new Tarefa('Filho 1');

tarefa_raiz.addSubTarefa(tarefa_filho_1);
tarefa_raiz.addSubTarefa(new Tarefa('Filho 2'));

test('Teste 1', tarefa_raiz.getSubTarefaMaisPrioritaria().nome, 'Filho 1');

var data_agora = new Date();
var data_amanha = new Date();
data_amanha.setDate(data_amanha.getDate() + 1);
var data_depois_de_amanha = new Date();
data_depois_de_amanha.setDate(data_depois_de_amanha.getDate() + 2);

tarefa_filho_1.setDataDeInicio(data_agora);

test('Teste 2', tarefa_raiz.getSubTarefaMaisPrioritaria().nome, 'Filho 2');

var tarefa_depois_de_amanha = new Tarefa('Filho 3');
tarefa_raiz.addSubTarefa(tarefa_depois_de_amanha);
tarefa_depois_de_amanha.setDataDeInicio(data_depois_de_amanha);

var tarefa_amanha = new Tarefa('Filho 4');
tarefa_raiz.addSubTarefa(tarefa_amanha);
tarefa_amanha.setDataDeInicio(data_amanha);

test('Teste 3', tarefa_raiz.getSubTarefaPorPrioridade(2).nome, 'Filho 4');

var filho_1_segunda_geracao = tarefa_raiz.getSubTarefaPorPrioridade(0);

var filho_5 = new Tarefa('Filho 5');

filho_1_segunda_geracao.addSubTarefa(filho_5);

var filho_6 = new Tarefa('Filho 6');

var filho_7 = new Tarefa('Filho 7');

filho_5.addSubTarefa(filho_6);
filho_5.addSubTarefa(filho_7);

test('Teste 4', tarefa_raiz.getSubTarefaMaisPrioritaria().nome, 'Filho 6');

filho_6.concluir();

test('Teste 5', tarefa_raiz.getSubTarefaMaisPrioritaria().nome, 'Filho 7');

test('Teste 6', filho_7.getRaiz().nome, 'Raíz');

var t7raiz = new Tarefa('t7raiz');
var t7filho1 = new Tarefa('t7filho1');
var t7filho2 = new Tarefa('t7filho2');
t7raiz.addSubTarefa(t7filho1);
t7filho1.setDataDeInicio(new Date('03/03/2025'));
t7raiz.addSubTarefa(t7filho2);
var t7neto1 = new Tarefa('t7neto1');
t7filho2.addSubTarefa(t7neto1);

var t7raiz_serializado = t7raiz.serializar();

test('Teste 7', t7raiz_serializado, JSON.stringify({
    nome: "t7raiz",
    subTarefas: [
        {
            nome: "t7filho2",
            subTarefas: [{
                nome: "t7neto1",
                subTarefas: []
            }]
        },
        {
            nome: "t7filho1",
            subTarefas: [],
            dataDeInicio: "2025-03-03T03:00:00.000Z"
        }
    ]
}));

var t7raiz_desserializado = TarefaDesserializador.desserializar(t7raiz_serializado);
t7raiz_desserializado.getSubTarefaMaisPrioritaria().concluir();

test('Teste 8', t7raiz_desserializado.getSubTarefaMaisPrioritaria().nome, 't7filho2');

function test(nome_teste, input, output) {
    console.log({
        nome_teste,
        input,
        output,
        passou: input == output
    });
}