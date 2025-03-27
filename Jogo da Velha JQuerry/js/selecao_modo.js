$(document).ready(function () {
    $('#btn_iniciar_modo').click(function () {
        var modo = $('#modo_jogo').val();

        // esconde a seleção e exibir a tela inicial do jogo
        $('#selecao_modo').hide();
        $('#pagina_inicial').show();

        // carrega o script correto
        $.getScript(modo === 'maquina' ? 'jogo_maquina.js' : 'jogo.js');
    });
});
