var router = require('./router');
const fs = require('fs');

var app = router(3412);

var arquivoOperadoras = './data/operadoras.json';
var arquivoContatos = './data/contatos.json';

function lerArquivo(nomeArquivo) {
    try {
        const dados = fs.readFileSync(nomeArquivo, 'utf-8');
        return JSON.parse(dados);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON: ', error);
        return [];
    };
};

function gravarArquivo(nomeArquivo, dados) {
    try {
        const json = JSON.stringify(dados);
        console.log(json);
        fs.writeFileSync(nomeArquivo, json, 'utf-8');
        console.log('Arquivo JSON atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao gravar o arquivo JSON: ', error);
    };
};

var operadoras = lerArquivo(arquivoOperadoras);
var contatos = lerArquivo(arquivoContatos);

app.interceptor(function (req, res, next) {
    console.log('Executando interceptor 1');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.interceptor(function (req, res, next) {
    console.log('Executando interceptor 2');
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    next();
});

app.get('/operadoras', function (req, res) {
    res.write(JSON.stringify(operadoras));
    res.end();
});

app.get('/contatos', function (req, res) {
    res.write(JSON.stringify(contatos));
    res.end();
});

app.get('/contatos/:id', function (req, res) {
    var contatoEncontrado = contatos.find(function (contato) {
        return contato.id == req.params.id;
    });

    if (contatoEncontrado) {
        res.json(contatoEncontrado);
    } else {
        res.status(404).end();
    };
});

app.post('/contatos', function (req, res) {
    var novoContato = req.body;
    console.log(novoContato);
    contatos.push(JSON.parse(novoContato));

    gravarArquivo(arquivoContatos, contatos);
    res.end();
});

app.options('/contatos', function (req, res) {
    res.end();
});

app.delete('/contatos/:id', function (req, res) {
    var contatoId = parseInt(req.params.id);

    fs.readFile(arquivoContatos, 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            var contatosAtuais = JSON.parse(data);
            var novosContatos = contatosAtuais.filter(function (contato) {
                return contato.id !== contatoId;
            });

            fs.writeFile(arquivoContatos, JSON.stringify(novosContatos), 'utf-8', function (err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});
