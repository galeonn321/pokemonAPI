import {
  TextInput,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { fetchPokemon } from "../api/fetchPokemon";
import PokemonDetailModal from "./PokemonDetailModal";
import { fetchMultiplePokemons } from "../api/fetchMultiplePokemons";
import { usePokemon } from "../api/usePokemon";
const { height, width } = Dimensions.get("screen");


const SearchPokemonInput: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  useEffect(() => {
    getMultiplePokemons();
  }, [inputText === ""]);

  const getMultiplePokemons = async () => {
    setIsLoading(true);
    const data = await fetchMultiplePokemons();
    setSearchResults(data);
    setIsLoading(false);
  };

  const onPressSearchButton = async (inputText: string) => {
    setIsLoading(true);
    const pokemonResult = await fetchPokemon(inputText);
    setSearchResults([pokemonResult]);
    setIsLoading(false);
  };

  const getDataFromPokemon = async (id: string) => {
    const dataSinglePokemon = await usePokemon(id);
    setSelectedPokemon([dataSinglePokemon]);
    setModalVisible(true);
  };

  const renderItem = (item: any) => {
    const pokemonName =
      item?.item.name ?? "could not find any name of this monster";
    return (
      <Pressable
        style={styles.cardContainer}
        onPress={() => getDataFromPokemon(item.item.id)}
      >
        <Text>{pokemonName}</Text>
        <Image
          style={styles.image}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.item.id}.png`,
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          onChangeText={(text: string) => setInputText(text)}
          value={inputText}
          placeholder="Write a pokemon"
        ></TextInput>
        <Pressable
          style={styles.button}
          onPress={() => onPressSearchButton(inputText)}
        >
          <Text style={styles.buttonText}>Begin Search</Text>
        </Pressable>
      </View>
      {!selectedPokemon ? (
        <></>
      ) : (
        <PokemonDetailModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(!modalVisible)}
          data={selectedPokemon}
        />
      )}

      <View style={styles.containerFlashlist}>
        {isLoading || !searchResults ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlashList
            data={searchResults as any}
            renderItem={renderItem}
            estimatedItemSize={350}
            estimatedListSize={{ height: 350, width: width }}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    width: 200,
    borderRadius: 50,
    textAlign: "left",
    borderColor: "#fff",
    color: "#fff",
  },
  containerFlashlist: {
    top: height / 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#ff12",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  containerInput: {
    flexDirection: "row",
    top: height / 5,
  },
  button: {
    backgroundColor: "#134",
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SearchPokemonInput;
