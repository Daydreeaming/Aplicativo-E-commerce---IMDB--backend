const limpaTexto = (texto) => {
    let textoTransformado = texto;

    while (textoTransformado.indexOf(".") !== -1) {
        textoTransformado = textoTransformado.replace(".", "");
    }

    while (textoTransformado.indexOf("-") !== -1) {
        textoTransformado = textoTransformado.replace("-", "");
    }

    while (textoTransformado.indexOf(",") !== -1) {
        textoTransformado = textoTransformado.replace(",", "");
    }

    while (textoTransformado.indexOf(":") !== -1) {
        textoTransformado = textoTransformado.replace(":", "");
    }

    while (textoTransformado.indexOf(";") !== -1) {
        textoTransformado = textoTransformado.replace(";", "");
    }

    while (textoTransformado.indexOf("'") !== -1) {
        textoTransformado = textoTransformado.replace("'", "");
    }

    while (textoTransformado.indexOf("}") !== -1) {
        textoTransformado = textoTransformado.replace("}", "");
    }

    while (textoTransformado.indexOf("^") !== -1) {
        textoTransformado = textoTransformado.replace("^", "");
    }

    while (textoTransformado.indexOf("`") !== -1) {
        textoTransformado = textoTransformado.replace("`", "");
    }

    while (textoTransformado.indexOf("?") !== -1) {
        textoTransformado = textoTransformado.replace("?", "");
    }

    while (textoTransformado.indexOf("[") !== -1) {
        textoTransformado = textoTransformado.replace("[", "");
    }

    while (textoTransformado.indexOf("]") !== -1) {
        textoTransformado = textoTransformado.replace("]", "");
    }

    while (textoTransformado.indexOf("[") !== -1) {
        textoTransformado = textoTransformado.replace("[", "");
    }

    while (textoTransformado.indexOf("*") !== -1) {
        textoTransformado = textoTransformado.replace("*", "");
    }

    while (textoTransformado.indexOf("+") !== -1) {
        textoTransformado = textoTransformado.replace("+", "");
    }

    return textoTransformado;
};

const formatarLeitura = (array) => {

    let resultado = ""

    for (const item of array) {
        resultado += item + " "
    }
    return resultado
}

module.exports = {
    limpaTexto: limpaTexto,
    formatarLeitura: formatarLeitura
}
