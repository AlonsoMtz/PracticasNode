

const mostarMenu = () => {

    return new Promise (resolve => {

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readLine.question('Seleccione una opción: ', (option) => {
            readLine.close();
            resolve(option);
        })

    });

}

const pausa = () =>{

    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readLine.question('Presione Enter para continuar... ', (option) => {
            readLine.close();
            resolve();
        })
    });
}

module.exports = {
    mostarMenu,
    pausa,
}






