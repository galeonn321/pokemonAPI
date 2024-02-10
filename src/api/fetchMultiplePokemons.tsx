import { LOG } from "../config/logger";

export const fetchMultiplePokemons = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const pokemonData = data.results.map((item) => {
      const urlParts = item.url.split("/");
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      const name = item.name;
      return { id, picture, name };
    });

    return pokemonData;
  } catch (error) {
    LOG.error(
      "Could not retrieve info from Pokemon database, check your API call, error:",
      error
    );
    throw error;
  }
};
