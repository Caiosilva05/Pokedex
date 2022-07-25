const nomePokemon = document.querySelector(".nome__pokemon");
const numeroPokemon = document.querySelector(".numero__pokemon");
const imagemPokemon = document.querySelector(".pokemon__imagem");

const form = document.querySelector(".pesquisa");
const pesquisa = document.querySelector(".input__pesquisa");

const btnVoltar = document.querySelector(".btn__voltar");
const btnAvancar = document.querySelector(".btn__avancar");
let pesquisaPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    nomePokemon.innerHTML = "Carregando...";
    numeroPokemon.innerHTML = "";
    const data = await fetchPokemon(pokemon);
    if (data) {
        imagemPokemon.style.display = "block";
        nomePokemon.innerHTML = data.name;
        numeroPokemon.innerHTML = data.id;
        imagemPokemon.src =
            data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
            ]["front_default"];
        pesquisa.value = "";
        pesquisaPokemon = data.id;
    } else {
        imagemPokemon.style.display = "none";
        nomePokemon.innerHTML = "Não encontrado";
        numeroPokemon.innerHTML = "";
    }
};
form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(pesquisa.value.toLowerCase());
});

btnVoltar.addEventListener("click", () => {
    if (pesquisaPokemon > 1) {
        pesquisaPokemon -= 1;
        renderPokemon(pesquisaPokemon);
    }
});
btnAvancar.addEventListener("click", () => {
    pesquisaPokemon += 1;
    renderPokemon(pesquisaPokemon);
});

renderPokemon(pesquisaPokemon);
