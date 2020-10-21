(function () {
    let cont;
    counter = function (numero) {
        cont = numero;
        return function () {
            cont += 1;
            return cont.toString();
        };
    };
}());

let incrementar = counter(1);

console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());
