const helper = require("./helper.js");

const criarProduto = (produto, listaDeProdutos) => {

    const existeProduto = pegarProduto(produto.idProduto, listaDeProdutos)

    if (existeProduto != null) {
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
    return novoProduto;
};

const adicionarOuRemoverEstoque = (idProduto, qtd, adicionarProduto, listaDeProdutos) => {

    const produto = pegarProduto(idProduto, listaDeProdutos);
    if (produto === null) {
        console.log('Não existe este produto!')
        return
    }

    console.log('1')
    if (produto.qtdDisponivel === 0 || (qtd > produto.qtdDisponivel && adicionarProduto === false)) {
        console.log(`Não existe esta quantidade de produtos disponível!! A quantidade de produtos no estoque é ${produto.qtdDisponivel}`);
        return
    }
    console.log('2')
    if(adicionarProduto) {
        atualizarProduto(idProduto, 'qtdDisponivel', produto.qtdDisponivel+qtd, listaDeProdutos)
        console.log(`Adicionou ao estoque ${qtd} itens do produto ${produto.nome}! A quantidade do produto atualizada para ${produto.qtdDisponivel}`);
        return produto;
    } else {
        atualizarProduto(idProduto, 'qtdDisponivel', produto.qtdDisponivel-qtd, listaDeProdutos)
        console.log(`Saiu da loja ${qtd} itens do produto ${produto.nome}! A quantidade do produto atualizada para ${produto.qtdDisponivel}`);
        return produto;
    }
}

const atualizarProduto = (idProduto, atributoAModificar, modificacao, listaDeProdutos) => {

    let produto = pegarProduto(idProduto, listaDeProdutos);

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
        return produto;
    } else {
        console.log('Atributo não existe!')
        return
    }
}

const deletarProduto = (idProduto, listaDeProdutos) => {
    
    let produto = pegarProduto(idProduto, listaDeProdutos)

    if (produto === null) {
        return
    }

    atualizarProduto(idProduto, 'deletado', true, listaDeProdutos)
    return produto
}

const pegarProduto = (idProduto, listaDeProdutos) => {    
    for (let i = 0; i < listaDeProdutos.length; i++) {
        if (Number(idProduto) === listaDeProdutos[i].idProduto) {
            console.log(`O produto é ${listaDeProdutos[i].nome}`)
            return listaDeProdutos[i];
        }
    }
    console.log('Não existe produto!')
    return null
}

const listarProdutos = (listaDeProdutos) => {
    return listaDeProdutos
}

module.exports = {
    criarProduto: criarProduto,
    adicionarOuRemoverEstoque: adicionarOuRemoverEstoque,
    atualizarProduto: atualizarProduto,
    deletarProduto: deletarProduto,
    pegarProduto: pegarProduto,
    listarProdutos: listarProdutos,
}