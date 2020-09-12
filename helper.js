const limpaTexto = (texto) => {
    let textoTransformado = texto;

    while (textoTransformado.indexOf(".") !== -1) {
        textoTransformado = textoTransformado.replace(".", "");
    }

    while (textoTransformado.indexOf("-") !== -1) {
        textoTransformado = textoTransformado.replace("-", "");
    }

    return textoTransformado;
};

module.exports = {
    limpaTexto: limpaTexto
}
