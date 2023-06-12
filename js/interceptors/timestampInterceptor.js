angular.module("listaTelefonica").factory("timestampInterceptor", function () {
    return {
        request: function (config) {
            var url = config.url;
            if (url.indexOf('view') > -1) return config;
            console.log(url);
            return config;
        }
    };
});