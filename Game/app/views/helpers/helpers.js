const showError = function (errors, field) {
    let mensagem;
    if (typeof errors != 'undefined') {
        errors.forEach(function (error) {
            if (error.path == field) {
                mensagem = error.message;
                return;
            }
        });
        return mensagem;
    }
}

const isInvalid = function (errors, field) {
    if (typeof errors != 'undefined') {
        for (let index = 0; index < errors.length; index++) {
            const element = errors[index];
            if (element.path == field) {
                return "is-invalid";
            }
        }
        return 'is-valid';
    }
    return '';
}

const reuseValues = function (values, oldField){
       return typeof values != 'undefined' ? values[oldField] : '';   
}

const selected = function (options, chosed){
    // console.log('-----------------------')

    // console.log(options)
    // console.log(chosed)
    
    return '';
    
}

module.exports = { showError,isInvalid, reuseValues,selected}