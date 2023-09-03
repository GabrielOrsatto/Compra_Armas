
    $(document).ready(function() {

        var compras = [];
        //testa se existe o item jogadores no localStorage do navegador.
        if(localStorage.getItem("compras") == null){
  
          //caso não exista cria o item jogadores.
          localStorage.setItem("compras" , JSON.stringify([]));
                          
        }else{
          //se existir, realiza o parse e armazena na variável jogadores.
          compras = JSON.parse(localStorage.getItem("compras"))
        }
  
        var armas = [];
        //testa se existe o item enderecos no localStorage do navegador.
        if(localStorage.getItem("armas") == null){
  
          //caso não exista cria o item enderecos.
          localStorage.setItem("armas" , JSON.stringify([]));
  
        }else{
           //se existir, realiza o parse e armazena na variável enderecos.
           armas = JSON.parse(localStorage.getItem("armas"));
        }
  
        var dados = {"compras": compras, 
                    "nova_compra" : {indice: '', arma: {}, observacao: '', quantidade: '', valortotal: '', data: ''}, 
                    "armas": armas,
                    "nova_arma" : {indice: '', id: '', nome: '', valor: '', dtcriacao: '', dano: '', recarga: '', maxcompra: ''}};
  
        Vue.filter('formataData', function (value) {                
                  //yyyy-mm-dd
                  var data = new Date(value);
                  data.setDate(data.getDate()+1); //incrementa a data em um dia para mostrar corretamente (pode nao ser necessário)              
                  dia  = (data.getDate()).toString().padStart(2, '0'),
                  mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.                
                  ano  = data.getFullYear();                
                  return dia+"/"+mes+"/"+ano;                
          })
  
        new Vue({ 
                  el: '#app', 
                  data: dados,
                  methods: { 
                    
  
                      addArma: function () {
                          var input_id = this.nova_arma.id;  
                          var input_nome = this.nova_arma.nome.trim(); 
                          var input_valor = this.nova_arma.valor.trim(); 
                          var input_dtcriacao = this.nova_arma.dtcriacao.trim(); 
                          var input_dano = this.nova_arma.dano.trim(); 
                          var input_recarga = this.nova_arma.recarga.trim(); 
                          var input_maxcompra = this.nova_arma.maxcompra.trim(); 


                          if (input_nome.length > 1 && input_valor.length > 0 && input_dano.length > 0 && 
                            input_recarga.length > 0 && input_maxcompra.length > 0) {
                             
                              if(isNaN(parseInt(this.nova_arma.indice))){
                                  var proximo_id;
                                  if(this.armas.length == 0){
                                      proximo_id = 1;
                                  }else{
                                      proximo_id = (parseInt(this.armas[this.armas.length-1].id) + 1)
                                  }
                                  this.armas.push({id: proximo_id, 
                                                nome: input_nome, 
                                                   valor: 'R$ ' + input_valor,
                                                   dtcriacao: input_dtcriacao,
                                                   dano: input_dano,
                                                   recarga: input_recarga + ' Seg.',
                                                   maxcompra: input_maxcompra + ' Unid.'}


                                                  );
  
                                  
                                  alert('Nova Arma cadastrada !');
  
                              }else{
                             
  
                                  this.armas[this.nova_arma.indice] = {id: input_id, 
                                            nome: input_nome, 
                                              valor: input_valor,
                                              dtcriacao: input_dtcriacao,
                                              dano: input_dano,
                                              recarga: input_recarga,
                                              maxcompra: input_maxcompra
                                  }; 
                                  alert('Arma alterado !');
                                          
                                 
                              }
                              localStorage.setItem("armas" , JSON.stringify(this.armas));
                              
                              this.cleanFormularioArma();
  
                          }else{
  
                              alert("Preencha todos os campos !!!");
                          }
                      },
  
                      editArma: function (param_index) {
                          this.nova_arma.indice = param_index;
                          this.nova_arma.id = this.armas[param_index].id;
                          this.nova_arma.nome = this.armas[param_index].nome; 
                          this.nova_arma.valor = this.armas[param_index].valor; 
                          this.nova_arma.dtcriacao = this.armas[param_index].dtcriacao; 
                          this.nova_arma.dano = this.armas[param_index].dano; 
                          this.nova_arma.recarga = this.armas[param_index].recarga; 
                          this.nova_arma.maxcompra = this.armas[param_index].maxcompra; 

                      },
  
                      remArma: function(param_index){
                        var r = confirm("Deseja realmente remover a Arma " + this.armas[param_index].nome);
                        if (r == true) {
                          
                          //remove 1 elemento do índice definido pela variavel param_index
                          this.armas.splice(param_index, 1);
  
                          localStorage.setItem("armas" , JSON.stringify(this.armas));
  
                          alert('Removeu a Arma: ' + param_index);
                      } else {

                        alert('A Arma: ' + this.armas[param_index].nome + " não foi removida.")
                      }

                    },
                      
                      cleanFormularioArma: function() {
  
                          this.nova_arma.indice = '';
                          this.nova_arma.id = '';
                          this.nova_arma.nome = ''; 
                          this.nova_arma.valor = '';
                          this.nova_arma.dtcriacao = '';
                          this.nova_arma.dano = '';
                          this.nova_arma.recarga = '';
                          this.nova_arma.maxcompra = '';

                      },
  
                      addCompra: function () {
                          
                          var input_indice = this.nova_compra.indice;  
                          var select_arma = this.nova_compra.arma;
                          var input_observacao = this.nova_compra.observacao.trim(); 
                          var input_quantidade = this.nova_compra.quantidade.trim(); 
                          var input_valor_total = this.nova_compra.valortotal;                         
                          var input_data = this.nova_compra.data.trim();
  
                          if (input_observacao.length > 0 && input_quantidade.length > 0 && input_valor_total > 0) {
                              
                              if(isNaN(parseInt(input_indice))){
  
                                  this.compras.push({arma:select_arma,
                                                    observacao: input_observacao, 
                                                   quantidade: input_quantidade, 
                                                   valortotal: input_valor_total, 
                                                   data: input_data,
                                                   }
                                                  );
  
                                  
                                  alert('Nova Arma cadastrada !');
  
                              }else{
  
                                  this.compras[input_indice] = {arma:select_arma,                                    
                                                    observacao: input_observacao, 
                                                   quantidade: input_quantidade, 
                                                   valortotal: input_valor_total, 
                                                   data: input_data,
                                                  };
  
                                  alert('Arma alterada !');
                              }
                              localStorage.setItem("compras" , JSON.stringify(this.compras));
                              this.cleanFormularioCompra();
  
                          }else{
  
                              alert("Preencha todos os campos !!!");
                          }
                      },
  
                      editCompra: function (param_index) {
  
                          this.nova_compra.indice = param_index;
                          this.nova_compra.arma = this.compras[param_index].arma;
                          this.nova_compra.observacao = this.compras[param_index].observacao; 
                          this.nova_compra.quantidade = this.compras[param_index].quantidade;
                          this.nova_compra.valortotal = this.compras[param_index].valortotal;
                          this.nova_compra.data = this.compras[param_index].data;
                      },
  
                      remCompra: function(param_index){
                        var d = confirm("Deseja realmente remover a Compra da Arma " + this.armas[param_index].nome);
                        if (d == true) {
                          this.compras.splice(param_index, 1);
  
                          localStorage.setItem("compras" , JSON.stringify(this.compras));
  
                          alert('Removeu a compra: ' + param_index);

                        } else {
                            alert('A Compra da Arma: ' + this.armas[param_index].nome + " não foi removida.")
                        }
                      },

                      cleanFormularioCompra: function() {
  
                        this.nova_compra.indice = '';
                        this.nova_compra.arma = '';
                        this.nova_compra.observacao = ''; 
                        this.nova_compra.quantidade = '';
                        this.nova_compra.valortotal = 0;
                        this.nova_compra.data = '';
                      }
  
                  }
            }); 
  
      });