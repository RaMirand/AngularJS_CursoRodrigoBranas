angular.module("listaTelefonica").factory("errorInterceptor", function ($q) {
    return {
        responseError: function (rejection) {
            if (rejection.status === 404) {
                $location.path("/error");
            }
            return $q.reject(rejection);
        }
    };
});