const elementoMoedaInicial = document.getElementById('elementoMoedaInicial');
const elementoMoedaFinal = document.getElementById('elementoMoedaFinal');
const elementoValorInicial = document.getElementById('elementoValorInicial');
const elementoValorFinal = document.getElementById('elementoValorFinal');

const elementoTaxa = document.getElementById('elementoTaxa');
const botaoInverter = document.getElementById('botaoInverter');

// API gerado em https://app.exchangerate-api.com/dashboard/confirmed
function converter(){

    const moedaInicial = elementoMoedaInicial.value;
    const moedaFinal = elementoMoedaFinal.value;

    fetch(`https://v6.exchangerate-api.com/v6/f0ea7f079fdeb4a695b7e9e6/latest/${moedaInicial}`)
        .then((res) => res.json())
        .then((data) => {
        
        const taxa = data.conversion_rates[moedaFinal];
        
        elementoTaxa.innerText = `1 ${moedaInicial} = ${taxa} ${moedaFinal}`;

        elementoValorFinal.value = (elementoValorInicial.value * taxa).toFixed(2);
        
        });
}

elementoMoedaInicial.addEventListener('change', converter);
elementoMoedaFinal.addEventListener('change', converter);

elementoValorInicial.addEventListener('input', converter);
elementoValorFinal.addEventListener('input', converter);

botaoInverter.addEventListener('click', () => {
    const temp = elementoMoedaInicial.value;
    elementoMoedaInicial.value = elementoMoedaFinal.value;
    elementoMoedaFinal.value = temp;
    converter();
});

converter();