//
export const getPokemonEntries = async (offset, limit) => {
    var url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    const res = await fetch(url);

    return res.json();
};

export const getPokemonEntriesWithUrl = async (url) => {
    const res = await fetch(url);

    return res.json();
};

export const getEntityByUrl = async (url) => {
    const res = await fetch(url);

    return res.json();
};

export const getRandomPokemon = async () => {
    const entries = await getPokemonEntries(0, 2000);
    const {results} = entries;
    const randomUrl = results[Math.floor((Math.random() * results.length))].url;
    const pokemon = await fetch(randomUrl);

    return pokemon.json();
};
