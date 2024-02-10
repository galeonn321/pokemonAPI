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

const PokemonDetailModal = ({ modalVisible, closeModal, data }) => {
  const { picture, type, abilities } = data[0];

//   LOG.warn(modalVisible, closeModal, data[0], 'AHAAHAHAHAH');

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal;
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.image} source={{ uri: picture }} />
            <Text>Type: {type}</Text>
            <Text>Abilities:</Text>
            {abilities.map((ability, index) => (
              <Text key={index}>{ability}</Text>
            ))}
            <Pressable style={[styles.button, styles.buttonClose]} onPress={closeModal}>
              <Text style={styles.textStyle}>Hide Modal</Text>
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
});

export default PokemonDetailModal;
