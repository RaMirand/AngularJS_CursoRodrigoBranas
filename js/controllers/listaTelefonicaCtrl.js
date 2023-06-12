angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http, contatos, operadoras, serialGenerator, $filter) {
    // console.log(serialGenerator.generate());
    $scope.app = $filter('upper')("Lista Telefonica");
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;

    $scope.adicionarContato = function (contato) {
        $http.post('/contatos', contato).then(function (response) {
            console.log('Contato adicionado com sucesso!');
        }).catch(function (error) {
            console.error('Erro ao adicionar contato: ', error);
        });
    };
    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
        $scope.verificarContatoSelecionado($scope.contatos);
    };
    $scope.verificarContatoSelecionado = function (contatos) {
        $scope.hasContatoSelecionado = contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

});