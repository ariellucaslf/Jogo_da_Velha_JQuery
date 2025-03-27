var rodada = 1;
var matriz_jogo = {
    'a': {1: 0, 2: 0, 3: 0},
    'b': {1: 0, 2: 0, 3: 0},
    'c': {1: 0, 2: 0, 3: 0}
};

$(document).ready(function () {

    $('#btn_iniciar_jogo').click(function () {

        if ($('#entrada_apelido_jogador_1').val() == '' || $('#entrada_apelido_jogador_2').val() == '') {
            alert('Preencha os apelidos dos jogadores.');
            return false;
        }

        $('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
        $('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());

        $('#pagina_inicial').hide();
        $('#palco_jogo').show();
    });

    $('.jogada').click(function () {
        var id_campo_clicado = this.id;
        $("#" + id_campo_clicado).off();
        jogada(id_campo_clicado);
    });

    function jogada(id) {
        var icone = rodada % 2 === 1 ? 'url("images/marcacao_1.png")' : 'url("images/marcacao_2.png")';
        var ponto = rodada % 2 === 1 ? -1 : 1;

        rodada++;

        $('#' + id).css('background-image', icone);
        var linha_coluna = id.split('-');
        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

        verifica_combinacao();
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
            var vencedor = pontos === -3 ? $('#entrada_apelido_jogador_1').val() : $('#entrada_apelido_jogador_2').val();
            alert(vencedor + ' é o vencedor!');
            $('.jogada').off();
        }
    }
});
