import { LOG } from "../config/logger";


//This function gets precise data by ID to get thei abilities, type and much more and put what I need into an object.
export const getPokemonDataByID = async (id) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await resp.json();

  const abilities = data.abilities.map((ability) => {
    return ability.ability.name;
  });

  const pokemonObject = {
    picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    type: data.types[0].type.name,
    abilities: abilities,
  };

  return pokemonObject;
};
