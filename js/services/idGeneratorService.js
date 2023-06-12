angular.module("listaTelefonica").provider("idGenerator", function () {

    this.$get = function () {
        return {
            generate: function (contatos) {
                var valorId = 0;
                for (var arrayId = 0; arrayId < contatos.length; arrayId++) {
                    if (contatos[arrayId].id > valorId) {
                        valorId = contatos[arrayId].id;
                    }
                }
                var valorIdFinal = valorId + 1;
                return valorIdFinal;
            }
        };
    };
});