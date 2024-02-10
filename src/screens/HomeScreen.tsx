import { View, StyleSheet } from "react-native";
import React from "react";
import SearchPokemonInput from "../components/SearchPokemonInput";

interface Props {}

const HomeScreen: React.FC<Props> = () => {

  return (
    <View>
      <SearchPokemonInput />
    </View>
  );
};

export default HomeScreen;
