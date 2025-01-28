function getByID(id){
    return document.getElementById(id);
}

async function consulta_informacao_sigla(){
    const sigla = getByID('inputsigla').value.toUpperCase().trim();

    const resultado = getByID('resultado');

    if (!sigla){
        resultado.innerHTML = '<p style="color:red;">Por favor! Insira uma sigla do seu Estado </p>';
        return;
    }

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;

    try{
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao consultar a API');
        }

        const estados = await response.json();

        const estado = estados.find((estado) => estado.sigla === sigla);

        if (estado){
            resultado.innerHTML = `
            <h2>Informção do seu Estado</h2>
            <p><strong>Nome do seu Estado : </strong>${estado.nome}</p>
            <p><strong>Sigla do seu Estado : </strong>${estado.sigla}</p>
            <p><strong>Região do seu Estado : </strong>${estado.regiao.nome}</p>
            
            `;
        }else{
            resultado.innerHTML = `<p style="color:red;">Sua sigla do seu Estado não foi encontrada : ${sigla}</p>`;
        }


    }catch(error){
        
        resultado.innerHTML = `<p style="color:red;">Erro ao consultar a API. Tente novamente mais tarde.</p>`;
    }


}

function botao_limpa(){
    getByID('inputsigla').value = ''

    getByID('resultado').innerHTML = ''
}