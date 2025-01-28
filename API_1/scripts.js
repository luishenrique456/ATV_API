function getByID(id) {
    return document.getElementById(id);
}

async function consultarSignificado() {
    const palavra = getByID('inputPalavra').value.trim();
    const resultado = getByID('resultado');

    if (!palavra) {
        resultado.innerHTML = '<p style="color: red;">Por favor, insira uma palavra.</p>';
        return;
    }

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const resultadoAPI = await response.json();

        // Verifique se existe algum significado retornado
        if (resultadoAPI && resultadoAPI[0] && resultadoAPI[0].meanings) {
            let significados = '';
            resultadoAPI[0].meanings.forEach(meaning => {
                significados += `<p><strong>${meaning.partOfSpeech}:</strong> ${meaning.definitions[0].definition}</p>`;
            });

            resultado.innerHTML = `<h2>Significados de "${palavra}":</h2>${significados}`;
        } else {
            resultado.innerHTML = '<p style="color: red;">Nenhum significado encontrado.</p>';
        }
    } catch (error) {
        resultado.innerHTML = `<p style="color: red;">Erro ao consultar a palavra: ${error.message}</p>`;
    }
}

// Adiciona o evento ao botão
getByID('btnConsultar').addEventListener('click', consultarSignificado);

function limpar_resul(){
    getByID('inputPalavra').value = ''

    getByID('resultado').innerHTML = ''
}
