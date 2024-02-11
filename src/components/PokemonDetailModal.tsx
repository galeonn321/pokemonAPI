import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import { LOG } from "../config/logger";
import { PokemonData } from "../interfaces/pokemonData";

interface Props {
  modalVisible: boolean;
  closeModal: () => void;
  data: [PokemonData];
}

const PokemonDetailModal = ({ modalVisible, closeModal, data }: Props) => {
  const { picture, types, abilities, stats } = data[0];

  const dynamicBarStyle = (num: number) => {
    const color = num > 49 ? "#0D9276" : "#D24545";
    return {
      backgroundColor: color,
      width: num,
    };
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        closeModal;
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.image} source={{ uri: picture }} />
          <Text style={styles.title}>Type:</Text>
          {types.map((item, index) => (
            <Text key={index}>{item.type.name}</Text>
          ))}
          <Text style={styles.title}>Abilities:</Text>
          {abilities.map((item, index) => (
            <Text key={index}>{item.ability.name}</Text>
          ))}

          {stats.map((item, index) => (
            <View key={index} style={styles.block}>
              <View style={styles.blockTitle}>
                <Text style={styles.statName}>{item.stat.name}</Text>
              </View>
              <View style={styles.blockInfo}>
                <Text style={styles.number}>{item.base_stat}</Text>
                <View style={styles.bgBar}>
                  <View style={[styles.bar, dynamicBarStyle(item.base_stat)]} />
                </View>
              </View>
            </View>
          ))}

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={closeModal}
          >
            <Text style={styles.textStyle}>Catch the pokemon</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  // stats
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 80,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  block: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  blockTitle: {
    width: "35%",
    paddingRight: 10,
  },
  statName: {
    fontSize: 12,
    color: "#000",
    fontWeight:'bold'
  },
  blockInfo: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    color:'#000',
    width: "12%",
    fontSize: 12,
  },
  bgBar: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  bar: {
    // backgroundColor: "red",
    // width: "40%",
    height: 5,
    borderRadius: 20,
  },
});

export default PokemonDetailModal;
