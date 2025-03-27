var rodada = 1;
var matriz_jogo = {
    'a': {1: 0, 2: 0, 3: 0},
    'b': {1: 0, 2: 0, 3: 0},
    'c': {1: 0, 2: 0, 3: 0}
};

$(document).ready(function () {

    $('#btn_iniciar_jogo').click(function () {
        if ($('#entrada_apelido_jogador_1').val() == '') {
            alert('Preencha o apelido do jogador.');
            return false;
        }

        $('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
        $('#nome_jogador_2').html("Máquina");

        $('#pagina_inicial').hide();
        $('#palco_jogo').show();
    });

    $('.jogada').click(function () {
        var id_campo_clicado = this.id;
        $("#" + id_campo_clicado).off();
        jogada(id_campo_clicado, 'humano');

        if (rodada <= 9) {
            setTimeout(jogadaMaquina, 500);
        }
    });

    function jogada(id, jogador) {
        var icone = jogador === 'humano' ? 'url("images/marcacao_1.png")' : 'url("images/marcacao_2.png")';
        var ponto = jogador === 'humano' ? -1 : 1;

        rodada++;

        $('#' + id).css('background-image', icone);
        var linha_coluna = id.split('-');
        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

        verifica_combinacao();
    }

    function jogadaMaquina() {
        var celulasVazias = [];

        for (var linha in matriz_jogo) {
            for (var coluna in matriz_jogo[linha]) {
                if (matriz_jogo[linha][coluna] === 0) {
                    celulasVazias.push(linha + '-' + coluna);
                }
            }
        }

        if (celulasVazias.length > 0) {
            var escolha = celulasVazias[Math.floor(Math.random() * celulasVazias.length)];
            $("#" + escolha).off();
            jogada(escolha, 'maquina');
        }
    }

    function verifica_combinacao() {
        for (var i = 1; i <= 3; i++) {
            ganhador(matriz_jogo['a'][i] + matriz_jogo['b'][i] + matriz_jogo['c'][i]);
        }

        for (var linha of ['a', 'b', 'c']) {
            ganhador(matriz_jogo[linha][1] + matriz_jogo[linha][2] + matriz_jogo[linha][3]);
        }

        ganhador(matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3]);
        ganhador(matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1]);
    }

    function ganhador(pontos) {
        if (pontos === -3 || pontos === 3) {
            var vencedor = pontos === -3 ? $('#entrada_apelido_jogador_1').val() : "Máquina";
            alert(vencedor + ' é o vencedor!');
            $('.jogada').off();
        }
    }
});
