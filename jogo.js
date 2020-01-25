var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;


$(document).ready( function() {
  $('#btn_iniciar_jogo').click( function() {
    //validação de digitação dos apelidos dos jogadores
    if($('#entrada_jogador1_apelido').val() == ''){
      alert('apelido do jogador 1, não foi preenchido');
      return false;
    }
    if($('#entrada_jogador2_apelido').val() == ''){
      alert('apelido do jogador 2, não foi preenchido');
      return false;
    }  
    // exibir apelidos
    $('#nome_jogador1').html($('#entrada_jogador1_apelido').val());
    $('#nome_jogador2').html($('#entrada_jogador2_apelido').val());

    //controla a vizualização das divs
    $('#pagina_inicial').hide();
    $('#palco_jogo').show();

  });

  $('.jogada').click( function() {
    var id_campo_clicado = this.id;
    //removendo o evento de click apos clicado
    $('#' + id_campo_clicado).off();
    jogada(id_campo_clicado);

  });

  function jogada(id) {
    var icone = '';
    var ponto = 0;

    if((rodada % 2) == 1){   
      icone = 'url("imagens/marcacao_1.png")';
      ponto = -1;
    } else {
      icone = 'url("imagens/marcacao_2.png")';
      ponto = 1;
    }    
    rodada++;

    $('#'+id).css('background-image', icone);

    var linha_coluna = id.split('-');
    matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto; 

   verifica_combinacao(); 
   
  };
  function verifica_combinacao() {
    //verifica na horizontal
    var pontos = 0;
    for(var i = 1; i <= 3; i++){
      pontos = pontos + matriz_jogo['a'][i];
      
    } 

    ganhador(pontos);

    pontos = 0;
    for(var i = 1; i <= 3; i++){
      pontos = pontos + matriz_jogo['b'][i];
      
    } 

    ganhador(pontos);

    pontos = 0;
    for(var i = 1; i <= 3; i++){
      pontos = pontos + matriz_jogo['c'][i];
      
    } 

    ganhador(pontos);

    //verifica na vertical    
    for(var l = 1; l <= 3; l++){
      pontos = 0;
      pontos += matriz_jogo['a'][1];
      pontos += matriz_jogo['b'][1];
      pontos += matriz_jogo['c'][1];
      ganhador(pontos);
    }

    //verifica na diagonal
    pontos = 0;
    pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
    ganhador(pontos);

    //verifica diagonal ao contrario
    pontos = 0;
    pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
    ganhador(pontos);
  };
  function ganhador(pontos) {
    if(pontos == -3){
      var jogador_1 = $('#entrada_jogador1_apelido').val();
      alert(jogador_1 + ' é o vencedor');
      $('.jogada').off();
    } else if(pontos == 3){
      var jogador_2 = $('#entrada_jogador2_apelido').val();
      alert(jogador_2 + ' é o vencedor');
      $('.jogada').off();
    }
  };
});