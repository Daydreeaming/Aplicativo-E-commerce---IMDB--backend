const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const fs = require("fs");
const funcoesProdutos = require('./funcoesProdutos.js');
const funcoesPedidos = require('./funcoesPedidos.js');
const server = new koa();

server.use(bodyparser());


// Controlador do produtos // 

const controladorPOSTProdutos = (ctx) => {

    const pathArquivosProdutos = ('./produtosApi.json');
    const file = fs.readFileSync(pathArquivosProdutos, 'utf8');

    const JSONFile = JSON.parse(file);
    const body = ctx.request.body;

    console.log(body);


    const criacaoDoProduto = funcoesProdutos.criarProduto(body);

    if (criacaoDoProduto) {
        JSONFile.push(criacaoDoProduto);
        fs.writeFileSync(pathArquivosProdutos, JSON.stringify(JSONFile, null, 4), 'utf8');
        ctx.status = 200;
        ctx.body =     {
            status: 'sucesso',
            dados: body,
        }
    } else {
        ctx.status = 500;
        ctx.body = 'Não foi possível criar produto';
    }
}




server.use((ctx) => {

    const pathArquivosProdutos = ('./produtosApi.json');
    const pathArquivosPedidos = ('./pedidosApi.json');

    if (!fs.existsSync(pathArquivosProdutos)) {
        fs.writeFile(pathArquivosProdutos,  '[]', 'utf8', (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Arquivo de produtos criado com sucesso')
            }
        })
    }

    if (!fs.existsSync(pathArquivosPedidos)) {
        fs.writeFile(pathArquivosPedidos,  '[]', 'utf8', (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Arquivo de produtos criado com sucesso')
            }
        })
    }

    const method = ctx.method;
    const path = ctx.path;

    if (path.includes('/products')) {
        if (method === 'POST') {
            controladorPOSTProdutos(ctx);
        } else if (method === 'GET') {
            controladorGETProdutos(ctx);
        } else if (method === 'DELETE') {
            controladorDELETEProdutos(ctx);
        } else if (method === 'PUT') {
            controladorPUTProdutos(ctx);
        }
    } else if (path.includes('/orders')) {
        if (method === 'POST') {
            controladorPOSTPedidos(ctx);
        } else if (method === 'GET') {
                controladorGETPedidos(ctx);
        } else if (method === 'DELETE') {
            controladorDELETEPedidos(ctx);
        } else if (method === 'PUT') {
            controladorPUTPedidos(ctx);
        }
    }
});

server.listen(8081, () => console.log('O servidor está rodando na porta 8081!'));
