const helper = require("./helper.js");
const funcoesProdutos = require("./funcoesProdutos.js");

const pedidos = [];

const criarPedido = (pedido) => {

    const existePedido = pegarPedido(pedido);

    if (existePedido) {
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
    } else {
        console.log('Pedido foi feito!');
        pedidos.push(novoPedido);
    }
    

    for (let i  = 0; i < pedido.produtos.length; i++) {
        adicionarProdutoNoPedido(pedido.idPedido, pedido.produtos[i].id, pedido.produtos[i].qtd)
    }
    return novoPedido
};

const adicionarProdutoNoPedido = (idPedido, idProduto, qtd) => {

    if (qtd === 0) {
        console.log('Quantidade não pode ser 0');
        return
    }
    
    const pedido = pegarPedido(idPedido);
    const produto = funcoesProdutos.pegarProduto(idProduto)


    if (produto.qtdDisponivel < qtd) {
        console.log('Não tem essa quantidade de produto')
        return
    }

    if (pedido === null) {
        console.log('Pedido não encontrado');
        return
    }

    if (produto.deletado === true) {
        console.log('Produto não existe na loja!');
        return
    }

    if (pedido.estado != "Incompleto") {
        console.log('Não pode adicionar produtos após a compra!')
        return
    }
    pedido.produtos.push({produto: produto.nome, qtd: qtd, valorUnitario: produto.valorDoProduto})
    funcoesProdutos.adicionarOuRemoverEstoque(idProduto, qtd, false)
    pedido.valorTotal += produto.valorDoProduto * qtd
}

const removerProdutoNoPedido = (idPedido, idProduto, qtd) => {

    const pedido = pegarPedido(idPedido);
    const produto = funcoesProdutos.pegarProduto(idProduto);
    
    if (pedido.produtos.length === 0) {
        return
    }

    if (pedidos.estado != 'Incompleto') {
        console.log('Não pode remover produtos após a compra!')
        return
    }

        pedido.produtos.splice(produto, 1)
        funcoesProdutos.adicionarOuRemoverEstoque(idProduto, qtd, true)
        pedido.valorTotal -= produto.valorDoProduto * qtd
}

const atualizarQtdDosPedidos = (idPedido, idProduto, qtd) => {

    const pedido = pegarPedido(idPedido);
    const produto = funcoesProdutos.pegarProduto(idProduto);

    if (pedidos.estado != 'Incompleto') {
        console.log('Não pode atualizar produtos após a compra!')
        return
    }

    if (qtd === 0) {
        removerProdutoNoPedido(idPedido, idProduto, qtd)
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

const listarPedidosPorEstado = (estadoDoPedido) => {

    const listaPedidos = []

    for (const pedido of pedidos) {
        if (pedido.estado.toLowerCase() === estadoDoPedido.toLowerCase() && pedido.estado != 'Cancelado') {
            listaPedidos.push(pedido)
        }
    }
    console.log(`Lista de pedidos com o status ${estadoDoPedido.toLowerCase()}.`)
    console.log(listaPedidos)
}

const modificarEstadoDoPedido = (idPedido, situacaoDoPedido) => {
    
    const pedido = pegarPedido(idPedido)

    if (pedido.produtos.length === 0) {
        console.log('Não pode alterar o status do pedido!!');
        console.log(`Status do pedido ${pedido.estado}`)
        return
    }

    if (situacaoDoPedido === "Processando" || situacaoDoPedido === "processando" || situacaoDoPedido === "PROCESSANDO") {
        pedido.estado = "Processando";
    } else if (situacaoDoPedido === "Pago" || situacaoDoPedido === "pago" || situacaoDoPedido === "PAGO" ) {
        pedido.estado = "Pago";
    }  else if (situacaoDoPedido === "Entregue" || situacaoDoPedido === "entregue" || situacaoDoPedido === "ENTREGUE") {
        pedido.estado = 'Entregue';
    } else if (situacaoDoPedido === "Cancelado" || situacaoDoPedido === "cancelado" || situacaoDoPedido === "CANCELADO") {
        pedido.estado = "Cancelado";
    } else if (situacaoDoPedido === "Deletado" || situacaoDoPedido === "deletado" || situacaoDoPedido === "DELETADO") {
        pedido.estado = "Deletado";
    } else {
        pedido.estado = 'Incompleto'
    }
    return pedido
}

const pegarPedido = (idPedido) => {
    for (let i = 0; i < pedidos.length; i++) {
        if (idPedido === pedidos[i].idPedido) {
            for (let j = 0; j < pedidos[i].produtos.length; j++) {
                console.log(`O numero do id do pedido é ${pedidos[i].idPedido} com os seguintes produtos: ${pedidos[i].produtos[j].produto}`);
            }
            return pedidos[i];
        }
    }
    console.log('Não existe pedido!')
    return null
}

const listarPedidos = () => {
    return pedidos
};