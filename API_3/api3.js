function getByID(id) {
    return document.getElementById(id);
}

async function buscarPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();
        buscarUsuarios(posts);
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
    }
}

async function buscarUsuarios(posts) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const usuarios = await response.json();

        const mapaUsuarios = usuarios.reduce((mapa, usuario) => {
            mapa[usuario.id] = usuario;
            return mapa;
        }, {});

        exibirPosts(posts, mapaUsuarios);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
}

function exibirPosts(posts, mapaUsuarios) {
    getByID("post-container").innerHTML = "";

    posts.forEach(post => {
        const usuario = mapaUsuarios[post.userId];

        const postElemento = document.createElement("article");
        postElemento.classList.add("post");
        postElemento.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p><strong>Autor:</strong> ${usuario.name} (${usuario.email})</p>
            <a href="javascript:void(0);" class="comment-link" post-id="${post.id}">Ver Comentários</a>
            <div class="comments-container" id="comments-${post.id}" style="display: none;"></div>
        `;

        getByID("post-container").appendChild(postElemento);
    });

    document.querySelectorAll(".comment-link").forEach(link => {
        link.addEventListener("click", (event) => {
            const postId = event.target.getAttribute("post-id");
            alternarComentarios(postId);
        });
    });
}

function alternarComentarios(postId) {
    const secaoComentarios = getByID(`comments-${postId}`);
    
    if (secaoComentarios.style.display === "none" || secaoComentarios.innerHTML === "") {
        buscarComentarios(postId);
    } else {
        secaoComentarios.style.display = "none";
    }
}

async function buscarComentarios(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comentarios = await response.json();
        exibirComentarios(postId, comentarios);
    } catch (error) {
        console.error("Erro ao buscar comentários:", error);
    }
}

function exibirComentarios(postId, comentarios) {
    const secaoComentarios = getByID(`comments-${postId}`);
    secaoComentarios.innerHTML = "<h3>Comentários:</h3>";

    comentarios.forEach(comentario => {
        const comentarioElemento = document.createElement("div");
        comentarioElemento.classList.add("comment");
        comentarioElemento.innerHTML = `
            <p><strong>${comentario.name}</strong> (${comentario.email}):</p>
            <p>${comentario.body}</p>
            <hr>
        `;
        secaoComentarios.appendChild(comentarioElemento);
    });

    secaoComentarios.style.display = "block";
}

buscarPosts();
