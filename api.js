const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const fs = require("fs");
const funcoesProdutos = require('./funcoesProdutos.js');
const funcoesPedidos = require('./funcoesPedidos.js');
const server = new koa();

server.use(bodyparser());


// -------------------------------- Controlador dos produtos -------------------------------- // 

const controladorPOSTProdutos = (ctx) => {

    const pathArquivosProdutos = ('./produtosApi.json');
    const produtosFile = fs.readFileSync(pathArquivosProdutos, 'utf8');
    const JSONProdutosFile = JSON.parse(produtosFile.toString());
    
    const body = ctx.request.body;

    console.log(body);

    const criacaoDoProduto = funcoesProdutos.criarProduto(body, JSONProdutosFile);

    if (criacaoDoProduto) {
        JSONProdutosFile.push(criacaoDoProduto);
        fs.writeFileSync(pathArquivosProdutos, JSON.stringify(JSONProdutosFile, null, 4), 'utf8');
        ctx.status = 200;
        ctx.body =     {
            status: 'sucesso',
            dados: body,
        }
    } else {
        ctx.status = 500;
        ctx.body = 'Não foi possível criar produto';
    }
};

const controladorGETProdutos = (ctx) => {

    const id = ctx.url.split("/")[2];
    const pathArquivosProdutos = ('./produtosApi.json');
    const produtosFile = fs.readFileSync(pathArquivosProdutos, 'utf8');
    const JSONProdutosFile = JSON.parse(produtosFile.toString());

    console.log(id);

    if (id != "") {
        const idObtido = funcoesProdutos.pegarProduto(id, JSONProdutosFile);

        if (idObtido) {
            ctx.status = 200
            ctx.body = {
                status: 'sucesso',
                dados: idObtido,
            }
        } else {
            ctx.status = 500
            ctx.body = 'Produto não encontrado'
        }
    } else {
        ctx.body = funcoesProdutos.listarProdutos(JSONProdutosFile);
    }
};

const controladorDELETEProdutos = (ctx) => {

    const id = ctx.url.split("/")[2];
    const pathArquivosProdutos = ('./produtosApi.json');
    const produtosFile = fs.readFileSync(pathArquivosProdutos, 'utf8');
    const JSONProdutosFile = JSON.parse(produtosFile.toString());

    console.log(id);

    if (id) {
        const idObtido = funcoesProdutos.deletarProduto(id, JSONProdutosFile);
        if (idObtido === false) {
            ctx.status = 500;
            ctx.body = 'Não foi possível encontrar o ID do produto desejado!';
        } else {
            ctx.body = {
                status: 'sucesso',
                dados: idObtido,
            }
            fs.writeFileSync(pathArquivosProdutos, JSON.stringify(JSONProdutosFile, null, 4), 'utf8');
        }
    } else {
        // aa
    ctx.status = 400;
    ctx.body = "É necessário um id para atualizar";
}};

const controladorPUTProdutos = (ctx) => {
    const id = ctx.url.split("/")[2];
    const pathArquivosProdutos = ('./produtosApi.json');
    const produtosFile = fs.readFileSync(pathArquivosProdutos, 'utf8');
    const JSONProdutosFile = JSON.parse(produtosFile.toString());

    console.log(id);

    if (id != '') {
        const body = ctx.request.body;
        const atributoAModificar = body.atributoAModificar;
        const modificacao = body.modificacao
        const idObtido = funcoesProdutos.atualizarProduto(id, atributoAModificar, modificacao, JSONProdutosFile)
        console.log(idObtido)
        
        if(idObtido != undefined) {
            ctx.body = {
                status: 'sucesso',
                dados: idObtido,
            }
            fs.writeFileSync(pathArquivosProdutos, JSON.stringify(JSONProdutosFile, null, 4), 'utf8');
        } else {
            ctx.status = 400;
            ctx.body = "Bad Request";
        }
    } else {
        ctx.status = 400;
        ctx.body = "É necessário um id para atualizar";
    }
}

// -------------------------------- Controlador dos pedidos -------------------------------- //

const controladorPOSTPedidos = (ctx) => {

    const pathArquivosProdutos = ('./produtosApi.json');
    const pathArquivosPedidos = ('./pedidosApi.json');
    const produtosFile = fs.readFileSync(pathArquivosProdutos, 'utf8');
    const pedidosFile = fs.readFileSync(pathArquivosPedidos, 'utf8');

    const JSONProdutosFile = JSON.parse(produtosFile.toString());
    const JSONPedidosFile = JSON.parse(pedidosFile.toString());
    const body = ctx.request.body;

    const criacaoDoPedido = funcoesPedidos.criarPedido(body, JSONPedidosFile, JSONProdutosFile);
    if (criacaoDoPedido != null) {
        JSONPedidosFile.push(criacaoDoPedido)
        fs.writeFileSync(pathArquivosPedidos, JSON.stringify(JSONPedidosFile, null, 4), 'utf8');
        fs.writeFileSync(pathArquivosProdutos, JSON.stringify(JSONProdutosFile, null, 4), 'utf8');
        ctx.status = 200;
        ctx.body = {
            status: 'sucesso',
            dados: body,
        }
    } else {
        ctx.status = 500;
        ctx.body = 'Não foi possível fazer o pedido.';
    }
};

const controladorGETPedidos = (ctx) => {

    const id = ctx.url.split("/")[2];
    const pathArquivosPedidos = ('./pedidosApi.json');
    const pedidosFile = fs.readFileSync(pathArquivosPedidos);
    const JSONPedidosFile = JSON.parse(pedidosFile.toString());

    console.log(id);

    if (id != "") {
        const idObtido = funcoesPedidos.pegarPedido(id, JSONPedidosFile);

        if (idObtido) {
            ctx.body = {
                status: 'sucesso',
                dados: idObtido,
            }
        } else {
            ctx.status = 500
            ctx.body = 'Pedido não encontrado.'
        }
    } else {
        ctx.body = funcoesPedidos.listarPedidos(JSONPedidosFile);
    }
};

const controladorDELETEPedidos = (ctx) => {

    const id = ctx.url.split("/")[2];
    const pathArquivosPedidos = ('./pedidosApi.json');
    const pedidosFile = fs.readFileSync(pathArquivosPedidos, 'utf8');
    const JSONPedidosFile = JSON.parse(pedidosFile.toString());

    console.log(id);

    if (id) {
        const idObtido = funcoesPedidos.deletarPedido(id, JSONPedidosFile);
        if (idObtido === false) {
            ctx.status = 500;
            ctx.body = 'Não foi possível encontrar o ID do pedido desejado!'
        } else {
            ctx.body = {
                status: 'sucesso',
                dados: idObtido,
            }
            fs.writeFileSync(pathArquivosPedidos, JSON.stringify(JSONPedidosFile, null, 4), 'utf8');
        }
    }
};

const controladorPUTPedidos = (ctx) => {

    const id = ctx.url.split("/")[2];
    const pathArquivosPedidos = ('./pedidosApi.json');
    const pathArquivosProdutos = ("./produtosApi.json");
    const pedidosFile = fs.readFileSync(pathArquivosPedidos, 'utf8');
    const produtosFile = fs.readFileSync(pathArquivosProdutos, 'utf8');
    const JSONPedidosFile = JSON.parse(pedidosFile.toString());
    const JSONProdutosFile = JSON.parse(produtosFile.toString());

    console.log(id);

    if (id != '') {
        const body = ctx.request.body;
        const modificacao = body.modificacao
        const idProduto = body.idProduto
        const quantidade = body.quantidade
        const idObtidoPedidos = funcoesPedidos.modificarEstadoDoPedido(id, modificacao, JSONPedidosFile);
        funcoesPedidos.atualizarQtdDosPedidos(idObtidoPedidos.idPedido, idProduto, quantidade, JSONPedidosFile, JSONProdutosFile);

        if (idObtidoPedidos) {
            ctx.body = {
                status: 'sucesso',
                dados: idObtidoPedidos
            }
            fs.writeFileSync(pathArquivosPedidos, JSON.stringify(JSONPedidosFile, null, 4), 'utf8')
        } else {
            ctx.status = 400;
            ctx.body = "Bad Request"
        }
    } else {
        ctx.status = 400;
        ctx.body = "É necessário um id para atualizar";
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

server.listen(8081, () => console.log('O servidor está rodando na porta 8081!'))