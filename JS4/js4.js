class IntegerSet {
    constructor() {
        this.numeros = [];
    }
    inserir(numero) {
        if (typeof (numero) === 'number') {
            this.numeros[numero] = true;
        }
        if (Array.isArray(numero)) {
            numero.forEach(element => {
                this.numeros[element] = true;
            });
        }
    }
    excluir(numero) {
        if (typeof (numero) === 'number') {
            this.numeros[numero] = false;
        }
        if (Array.isArray(numero)) {
            numero.forEach(element => {
                this.numeros[element] = false;
            });
        }
    }
    uniao(integerset) {
        let maiorTamanho = this.numeros.length < integerset.numeros.length ? integerset.numeros.length : this.numeros.length;
        let conjuntoUniao = new IntegerSet(maiorTamanho);

        for (let index = 0; index < maiorTamanho; index++) {
            if (index < this.numeros.length && this.numeros[index]) {
                conjuntoUniao.inserir(index);
                continue;

            }
            if (index < integerset.numeros.length && integerset.numeros[index]) {
                conjuntoUniao.inserir(index);
            }
        }
        return conjuntoUniao;
    }

    intersecao(integerset) {
        let maiorTamanho = this.numeros.length < integerset.numeros.length ? integerset.numeros.length : this.numeros.length;
        let conjuntoIntersecao = new IntegerSet(maiorTamanho);

        for (let index = 0; index < maiorTamanho; index++) {
            if (index < this.numeros.length && this.numeros[index] && index < integerset.numeros.length && integerset.numeros[index]) {
                conjuntoIntersecao.inserir(index);
                continue;
            }
        }
        return conjuntoIntersecao;
    }


    diferenca(integerset) {
        let maiorTamanho = this.numeros.length < integerset.numeros.length ? integerset.numeros.length : this.numeros.length;
        let conjuntoDiferenca = new IntegerSet(maiorTamanho);

        for (let index = 0; index < maiorTamanho; index++) {
            if (index < this.numeros.length && this.numeros[index] && index < integerset.numeros.length && !integerset.numeros[index]) {
                conjuntoDiferenca.inserir(index);
                continue;
            }
            if (index < this.numeros.length && !this.numeros[index] && index < integerset.numeros.length && integerset.numeros[index]) {
                conjuntoDiferenca.inserir(index);
                continue;
            }
            if (index > this.numeros.length && index < integerset.numeros.length && integerset.numeros[index]) {
                conjuntoDiferenca.inserir(index);
                continue;
            }
            if (index < this.numeros.length && index > integerset.numeros.length && this.numeros[index]) {
                conjuntoDiferenca.inserir(index);
                continue;
            }
        }
        return conjuntoDiferenca;
    }

    toString() {
        let stringSaida = []
        for (let index = 0; index < this.numeros.length; index++) {
            if (this.numeros[index]) {
                stringSaida.push(index);
            }
        }
        return stringSaida.length > 0 ? '[' + stringSaida.toString() + ']' : "conjunto vazio";
    }
}

let x = new IntegerSet();
let y = new IntegerSet();

console.log('inserção: x = [1,2,3,4,5,6,7,8,9,10], y = [6,7,8,9,10,11,12,13,14,15,16]');

x.inserir([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
y.inserir([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
console.log('x: ' + x.toString());
console.log('y: ' + y.toString());

console.log('exclusao: x = [1,3,5,7,9], y = [7,9,11,13,15]')
x.excluir([1,3,5,7,9]);
y.excluir([7,9,11,13,15]);
console.log('x: ' + x.toString());
console.log('y: ' + y.toString());

diferenca = x.diferenca(y);
uniao = x.uniao(y);
intersecao = x.intersecao(y);

console.log('diferenca: ' + diferenca.toString());
console.log('uniao: ' + uniao.toString());
console.log('intersecao: ' + intersecao.toString());

