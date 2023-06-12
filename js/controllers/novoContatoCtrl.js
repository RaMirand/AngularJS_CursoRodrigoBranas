angular.module("listaTelefonica").controller("novoContatoCtrl", function ($scope, $location, contatosAPI, serialGenerator, idGenerator, operadoras) {

    $scope.operadoras = operadoras.data;

    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contatosAPI.getContatos().then(function (response) {
            var contatos = response.data;
            contato.id = idGenerator.generate(contatos);
            contatosAPI.saveContato(contato).then(function (data) {
                delete $scope.contato;
                $scope.contatoForm.$setPristine();
                $location.path("/contatos");
            });
        });
    };
});