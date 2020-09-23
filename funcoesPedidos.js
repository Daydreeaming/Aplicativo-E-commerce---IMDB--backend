const helper = require("./helper.js");
const funcoesProdutos = require("./funcoesProdutos.js");

const criarPedido = (pedido, listaDePedidos, listaDeProdutos) => {
    console.log(listaDeProdutos)
    const existePedido = pegarPedido(pedido.idPedido, listaDePedidos);

    if (existePedido != null) {
        return
    };

    const novoPedido = {
        idPedido: Number(pedido.idPedido),
        produtos: [],
        estado: helper.limpaTexto(pedido.estado),
        idClient: helper.limpaTexto(pedido.idClient),
        deletado: Boolean(pedido.deletado),
        valorTotal: Number(pedido.valorTotal)/100
    };
    
    novoPedido.estado = 'Incompleto'
    
    
    if (pedido.produtos.length === 0) {
        console.log('Insira produtos!')
        return
    }

    let adicionar 

    for (let i  = 0; i < pedido.produtos.length; i++) {
        adicionar = adicionarProdutoNoPedidoNoInicioDaCompra(novoPedido, pedido.produtos[i].idProduto, pedido.produtos[i].qtd, listaDeProdutos)
        if (adicionar === null){
            return
        }
    }
    console.log('Pedido foi feito!');
    return novoPedido
};

const deletarPedido = (idPedido, listaDePedidos) => {
    
    let pedido = pegarPedido(idPedido, listaDePedidos)

    if (pedido === null) {
        return
    }

    pedido.deletado = true
    return pedido
}

const adicionarProdutoNoPedidoNoInicioDaCompra = (pedido, idProduto, qtd, listaDeProdutos) => {

    console.log(listaDeProdutos)
    if (qtd === 0) {
        console.log('Quantidade não pode ser 0');
        return
    }

    const produto = funcoesProdutos.pegarProduto(idProduto, listaDeProdutos);
    console.log(produto)
    if (pedido === null) {
        console.log('Pedido não encontrado');
        return null
    }

    if (produto.qtdDisponivel < qtd) {
        console.log('Não tem essa quantidade de produto')
        return null
    }


    if (produto.deletado === true) {
        console.log('Produto não existe na loja!');
        return null
    }

    if (pedido.estado != "Incompleto") {
        console.log('Não pode adicionar produtos após a compra!')
        return null
    }

    pedido.produtos.push({id: produto.id, produto: produto.nome, qtd: qtd, valorUnitario: produto.valorDoProduto})
    funcoesProdutos.adicionarOuRemoverEstoque(idProduto, qtd, false, listaDeProdutos)
    pedido.valorTotal += produto.valorDoProduto * qtd    
}

const removerProdutoNoPedido = (idPedido, idProduto, qtd, listaDePedidos, listaDeProdutos) => {

    const pedido = pegarPedido(idPedido, listaDePedidos);
    const produto = funcoesProdutos.pegarProduto(idProduto, listaDeProdutos);
    
    if (pedido.produtos.length === 0) {
        return
    }

    if (listaDePedidos.estado != 'Incompleto') {
        console.log('Não pode remover produtos após a compra!')
        return
    }

    // pedido.produtos.splice(produto, 1)
    funcoesProdutos.adicionarOuRemoverEstoque(idProduto, qtd, true)
    pedido.valorTotal -= produto.valorDoProduto * qtd
}

const atualizarQtdDosPedidos = (idPedido, idProduto, qtd, listaDePedidos, listaDeProdutos) => {

    const pedido = pegarPedido(idPedido, listaDePedidos);
    const produto = funcoesProdutos.pegarProduto(idProduto, listaDeProdutos);
    
    if (pedido.estado != 'Incompleto') {
        console.log('Não pode atualizar produtos após a compra!')
        return
    }

    if (qtd === 0) {
        removerProdutoNoPedido(idPedido, idProduto, qtd, listaDePedidos, listaDeProdutos)
    } else if (qtd > 0) {
        for (let i = 0; i < pedido.produtos.length; i++){
            if (produto.nome === pedido.produtos[i].produto) {
                pedido.valorTotal -= pedido.produtos[i].qtd * produto.valorDoProduto;
                pedido.valorTotal += produto.valorDoProduto * qtd
                pedido.produtos[i].qtd = qtd
            }
        }
    } else {
        console.log('Inserir quantidade válida!')
        return
    }
}

const listarPedidosPorEstado = (estadoDoPedido, listaDePedidos) => {

    const listaPedidos = []

    for (const pedido of listaDePedidos) {
        if (pedido.estado.toLowerCase() === estadoDoPedido.toLowerCase() && pedido.estado != 'Cancelado') {
            listaPedidos.push(pedido)
        }
    }
    console.log(`Lista de pedidos com o status ${estadoDoPedido.toLowerCase()}.`)
    console.log(listaPedidos)
    return listaPedidos
}

const modificarEstadoDoPedido = (idPedido, modificarSituacaoDoPedido, listaDePedidos) => {

    const pedido = pegarPedido(idPedido, listaDePedidos);

    if (pedido.produtos.length === 0) {
        pedido.estado = 'Incompleto'
        console.log('Não pode alterar o status do pedido!!');
        console.log(`Status do pedido ${pedido.estado}`)
        return pedido
    }


    if (modificarSituacaoDoPedido === "Processando" || modificarSituacaoDoPedido === "processando" || modificarSituacaoDoPedido === "PROCESSANDO") {
        pedido.estado = "Processando";
    } else if (modificarSituacaoDoPedido === "Pago" || modificarSituacaoDoPedido === "pago" || modificarSituacaoDoPedido === "PAGO" ) {
        pedido.estado = "Pago";
    }  else if (modificarSituacaoDoPedido === "Entregue" || modificarSituacaoDoPedido === "entregue" || modificarSituacaoDoPedido === "ENTREGUE") {
        pedido.estado = 'Entregue';
    } else if (modificarSituacaoDoPedido === "Cancelado" || modificarSituacaoDoPedido === "cancelado" || modificarSituacaoDoPedido === "CANCELADO") {
        pedido.estado = "Cancelado";
    } else if (modificarSituacaoDoPedido === "Deletado" || modificarSituacaoDoPedido === "deletado" || modificarSituacaoDoPedido === "DELETADO") {
        pedido.estado = "Deletado";
    } else {
        pedido.estado = 'Incompleto'
    }
    return pedido
}

const pegarPedido = (idPedido, listaDePedidos) => {
    console.log('---------------')
    console.log(idPedido)
    console.log('---------------')
    console.log(listaDePedidos)
    for (let i = 0; i < listaDePedidos.length; i++) {
        if (Number(idPedido) === listaDePedidos[i].idPedido) {
            for (let j = 0; j < listaDePedidos[i].produtos.length; j++) {
                console.log(`O numero do id do pedido é ${listaDePedidos[i].idPedido} com os seguintes produtos: ${listaDePedidos[i].produtos[j].produto}`);
            }
            return listaDePedidos[i];
        }
    }
    console.log('Não existe pedido!')
    return null
}

const listarPedidos = (listaDePedidos) => {
    return listaDePedidos
};

module.exports = {
    criarPedido: criarPedido,
    deletarPedido: deletarPedido,
    adicionarProdutoNoPedidoNoInicioDaCompra: adicionarProdutoNoPedidoNoInicioDaCompra,
    removerProdutoNoPedido: removerProdutoNoPedido,
    atualizarQtdDosPedidos: atualizarQtdDosPedidos,
    listarPedidosPorEstado: listarPedidosPorEstado,
    modificarEstadoDoPedido: modificarEstadoDoPedido,
    pegarPedido: pegarPedido,
    listarPedidos: listarPedidos
}