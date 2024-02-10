import { LOG } from "../config/logger";

export const fetchPokemon = async (pokemonQuery: string) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonQuery.toLowerCase()}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Check if the returned data is empty or contains an error message
    if (!data || data.error || Object.keys(data).length === 0) {
      throw new Error("Pokémon not found");
    }

    return data;
  } catch (error) {
    LOG.error(
      "Could not retrieve info from Pokemon database, check your API call",
      error
    );
    throw error;
  }
};
