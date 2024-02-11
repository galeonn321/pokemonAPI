import { LOG } from "../config/logger";
import { PokemonData } from "../interfaces/pokemonData";

//This function searches for the the pokemon that the user typed.
export const fetchPokemon = async (
  pokemonQuery: string
): Promise<PokemonData> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonQuery.toLowerCase()}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    LOG.error(
      "Could not retrieve info from Pokemon database, check your API call",
      error
    );
    throw error;
  }
};
