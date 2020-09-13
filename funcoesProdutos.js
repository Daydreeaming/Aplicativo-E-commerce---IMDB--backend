const helper = require("./helper.js");
const fs = require("fs");

const produtos = [];

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
        deletado: Boolean(produto.deletado)
    }

    console.log("Produto criado!")
    produtos.push(novoProduto)
    return novoProduto;
};

const adicionarOuRemoverEstoque = (idProduto, qtd, adicionarProduto) => {

    const produto = pegarProduto(idProduto);

    if (produto === null) {
        console.log('Não existe este produto!')
        return
    }

    if (produto.qtdDisponivel === 0 || (qtd > produto.qtdDisponivel && adicionarProduto === false)) {
        console.log(`Não existe esta quantidade de produtos disponível!! A quantidade de produtos no estoque é ${produto.qtdDisponivel}`);
        return
    }

    if(adicionarProduto) {
        atualizarProduto(idProduto, 'qtdDisponivel', produto.qtdDisponivel+qtd)
        console.log(`Adicionou ao estoque ${qtd} itens do produto ${produto.nome}! A quantidade do produto atualizada para ${produto.qtdDisponivel}`);
        return produto;
    } else {
        atualizarProduto(idProduto, 'qtdDisponivel', produto.qtdDisponivel-qtd)
        console.log(`Saiu da loja ${qtd} itens do produto ${produto.nome}! A quantidade do produto atualizada para ${produto.qtdDisponivel}`);
        return produto;
    }
}

const atualizarProduto = (idProduto, atributoAModificar, modificacao) => {

    let produto = pegarProduto(idProduto, produtos);

    if (produto === null || produto.deletado === true) {
        console.log('Produto não existe ou não se vende mais na loja')
        return 
    }

    if (atributoAModificar === 'idProduto') {
        console.log('Proibido modificar o id do Produto!!')
        return
    }

    if (produto.hasOwnProperty(atributoAModificar)) {
        produto[atributoAModificar] = modificacao
        console.log('Atributo modificado!')
    } else {
        console.log('Atributo não existe!')
    }
}

const deletarProduto = (idProduto) => {
    
    let produto = pegarProduto(idProduto)

    if (produto === null) {
        return
    }

    atualizarProduto(idProduto, 'deletado', true)
    return produto
}

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

const listarProdutos = () => {
    return produtos
}

module.exports = {
    produtos: produtos,
    criarProduto: criarProduto,
    adicionarOuRemoverEstoque: adicionarOuRemoverEstoque,
    atualizarProduto: atualizarProduto,
    deletarProduto: deletarProduto,
    pegarProduto: pegarProduto,
    listarProdutos: listarProdutos,
}