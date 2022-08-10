const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
export const pokemonImageURL = "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/";

export const getProfileData = async () => {

};

export const getPokemon = async (id) => {
    let res = await fetch(`${pokemonURL}${id}`);

    while (res.status != 200) {
        id += 1;
        res = await fetch(`${pokemonURL}${id}`);
    }

    return res.json();
};
