const helper = require("./helper.js");
const fs = require("fs");

const produtos = [];
const carrinho = 0;

const produtoExiste = (produto) => {

    for (let i = 0; i < produtos.length; i++) {
        if(produtos[i].idProduto === produto.idProduto) {
            console.log("Este produto já está catalogado")
            return true
        }
    }
}

const listarProdutos = () => {
    for (let i = 0; i < produtos.length; i++) {
        console.log(produtos)
        return produtos
    }
}

const criarProduto = (produto) => {

    const existeProduto = produtoExiste(produto)

    if (existeProduto) {
        return
    }

    const novoProduto = {
        idProduto: Number(produto.idProduto),
        nome: helper.limpaTexto(produto.nome),
        qtdDisponivel: Number(produto.qtdDisponivel),
        valorDoProduto: Number(produto.valorDoProduto)/100,
        descricao: produto.descricao,
        peso: Number(produto.peso),
        deletado: false
    }

    console.log("Produto criado!")
    produtos.push(novoProduto)
    return novoProduto;
};

// criarProduto({idProduto: 1, nome: 'Mouse', qtdDisponivel: 1, valorDoProduto: 20000, descricao: 'mouseeee', peso: 30, deletado:false});
// criarProduto({idProduto: 2, nome: 'Teclado', qtdDisponivel: 3, valorDoProduto: 50000, descricao: 'Tecladoo', peso: 60, deletado:false});
// criarProduto({idProduto: 3, nome: 'Cadeira', qtdDisponivel: 4, valorDoProduto: 90000, descricao: 'Cadeiraa', peso: 80, deletado:false});
// criarProduto({idProduto: 4, nome: 'Fone', qtdDisponivel: 5, valorDoProduto: 30000, descricao: 'Foneee', peso: 70, deletado:false});
// criarProduto({idProduto: 5, nome: 'Celular', qtdDisponivel: 6, valorDoProduto: 50000, descricao: 'Celulaaaarr', peso: 20, deletado:false});

// listarProdutos()


const pegarProduto = (idProduto) => {

    for (let i = 0; i < produtos.length; i++) {
        if (idProduto === produtos[i].idProduto) {
            console.log(`O produto é ${produtos[i].nome}`)
            return produtos[i];
        }
    }
    console.log('Não existe produto!')
    return null
}

const adicionarRemoverEstoque = (idProduto, qtd, acao) => {

    const produto = pegarProduto(idProduto);
    let carrinho = 0;

    if (produto.qtdDisponivel === 0 || qtd > produto.qtdDisponivel) {
        console.log(`Não existe esta quantidade de produtos disponível!! A quantidade de produtos no estoque é ${produto.qtdDisponivel}`);
        return
    }

    if(acao) {
        produto.qtdDisponivel += qtd
        console.log(`Adicionou ao estoque ${qtd} itens do produto ${produto.nome}! A quantidade do produto atualizada para ${produto.qtdDisponivel}`);
        return produto;
    } else {
        produto.qtdDisponivel -= qtd
        console.log(`Saiu da loja ${qtd} itens do produto ${produto.nome}! A quantidade do produto atualizada para ${produto.qtdDisponivel}`);
        carrinho += qtd
        return produto;
    }
}

console.log(produtos)
adicionarRemoverEstoque(1, 3, false)
console.log(produtos)

const atualizarProduto = (idProduto, atributoAModificar, modificacao) => {

    let produto = pegarProduto(idProduto, produtos);

    if (produto === null || produto.deletado === true) {
        console.log('Produto não existe ou não se vende mais na loja')
        return
    }

    if (atributoAModificar === 'idProduto') {
        console.log('Proibido modificar o id do Produto!!')
    }

    for (let i  = 0; i < produtos.length; i++) {
        if (produto.idProduto === produtos[i].idProduto) {
            if (produtos[i].hasOwnProperty(atributoAModificar)) {
                produtos[i][atributoAModificar] = modificacao
                return 
            } else {
                console.log('Atributo não existe!')
                return
            }
        }
    }
}

const deletarProduto = (idProduto) => {
    
    let produto = pegarProduto(idProduto)

    if (produto === null) {
        return
    }

    for (let i = 0; i < produtos.length; i++) {
        if (produto.idProduto === produtos[i].idProduto) {
            console.log('Deletando produto');
            produtos[i].deletado = true;
            atualizarProduto()
        }
    }
}