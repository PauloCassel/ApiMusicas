document.addEventListener('DOMContentLoaded', function () {
    loadMusicasList();
    document.getElementById('formAdicionarMusica').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarMusica();
    });
});

//-------------------------Função de adicionar música

function adicionarMusica() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nomeMusica').value;
    const imagem = document.getElementById('imagemMusica').value;
    const cantor = document.getElementById('cantorMusica').value;
    const album = document.getElementById('albumMusica').value;

    if (!id || !nome || !imagem || !cantor || !album) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    fetch('http://localhost:3000/api/musicas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            imagem: imagem,
            cantor: cantor,
            album: album,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar música');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        loadMusicasList();
    })
    .catch(error => {
        alert('ID Repetido, tente outro.');
    });
}
function loadMusicasList() {
    fetch('http://localhost:3000/api/musicas')
        .then(response => response.json())
        .then(data => displayMusicasList(data))
        .catch(error => console.error('Error:', error));
}

//--------------------------Funções para ver, e abrir as informações das musicas.

function displayMusicasList(data) {
    const listaMusicas = document.getElementById('listaMusicas');
    listaMusicas.innerHTML = '';
    data.forEach(musica => {
        const listItem = document.createElement('div');
        listItem.classList = `musica`
        listItem.innerHTML = 
        `
            <img src="${musica.imagem}" id="iconeMusica">
            <h3 id="texto">${musica.nome}
            <h4 id="texto2">${musica.cantor}
        `
        listItem.addEventListener('click', function() {
            ver(musica.id);
        });
        listaMusicas.appendChild(listItem);
    });

    function ver(id) {
        const musica = data.find(musica => musica.id === id);
        if (musica) {

            const modalM = document.getElementById("dialogMusica")
            modalM.showModal()

            const vish = document.getElementById('quadrado-preto');
            vish.innerHTML = 
            `
            <h4 onclick="sairModal2()">Voltar</h4>
            <h2>Música:</h2>
            <div id="dentro">
                <a href="https://www.youtube.com/results?search_query=${musica.nome} ${musica.cantor}"><img src="${musica.imagem}" id="iconeMusica"></a>
                <br>
                <h3>ID: ${id}</p>
                <p>Nome: ${musica.nome}</p>
                <p>Cantor: ${musica.cantor}</p>
                <p>Álbum: ${musica.album}</p>
                
            </div>
            <div id="botoes">
                <button type="button" onClick="deletarMusica(${musica.id})" class="botao">Deletar</button>
                <button type="button" onClick="alterarMusicas(${musica.id}, '${musica.nome}', '${musica.imagem}', '${musica.cantor}', '${musica.album}')" class="botao" id="botaoAlt">Alterar</button>
            </div>
            `;
        }
    }
}

//------------Função de alterar

function alterarMusicas(id, nome, imagem, cantor, album) {
    const modalA = document.getElementById("dialogAlt")
    modalA.showModal()

    document.getElementById("idAlt").value = id;
    document.getElementById("nomeMusicaAlt").value = nome;
    document.getElementById("imagemMusicaAlt").value = imagem;
    document.getElementById("cantorMusicaAlt").value = cantor;
    document.getElementById("albumMusicaAlt").value = album;


    document.getElementById('idAlt').readOnly = true;
}

function alterarMusica() {
    const id = parseInt(document.getElementById('idAlt').value);
    const nome = document.getElementById('nomeMusicaAlt').value;
    const imagem = document.getElementById('imagemMusicaAlt').value;
    const cantor = document.getElementById('cantorMusicaAlt').value;
    const album = document.getElementById('albumMusicaAlt').value;


    fetch(`http://localhost:3000/api/musicas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            imagem: imagem,
            cantor: cantor,
            album: album,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar música');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        loadMusicasList();
    })
    .catch(error => {
        alert('Erro ao adicionar música.');
    });
    
}

//-----------Função de Deletar

function deletarMusica(id) {
    fetch(`http://localhost:3000/api/musicas/${id}`, {
        method: 'DELETE',
    })
}

//----------Algumas funções pra sair e abrir os modal

function sairModal() {
    const modal = document.getElementById("dialogAdd")
    modal.close()
}

function sairModal2() {
    const modalM = document.getElementById("dialogMusica")
    modalM.close()
}

function sairModal3() {
    const modalA = document.getElementById("dialogAlt")
    modalA.close()
}
    
function adicionarModal() {
    const modal = document.getElementById("dialogAdd")
    modal.showModal()
}