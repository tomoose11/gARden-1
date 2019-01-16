import React, { Component } from 'react';
import {
  View, TouchableHighlight, StyleSheet, Text, Image, ScrollView
} from 'react-native';

import api from '../api';

const back = require('../res/backButton.png');
const empty = require('../res/empty.png');

export default class InfoCard extends Component {
  state = {
    aspect: [],
    botanicalName: '',
    commonName: '',
    difficulty: '',
    floweringTime: '',
    height: '',
    plantingTime: '',
    spread: ''
  };

  componentDidMount = () => {
    const { plantName } = this.props;
    this.fetchPlantInfo(plantName);
  };

  fetchPlantInfo = (plantName) => {
    api.getPlantInfo(plantName).then((doc) => {
      const {
        infoObj: {
          [plantName]: {
            aspect,
            botanicalName,
            commonName,
            difficulty,
            floweringTime,
            height,
            plantingTime,
            spread
          }
        }
      } = doc.data();
      this.setState({
        aspect,
        botanicalName,
        commonName,
        difficulty,
        floweringTime,
        height,
        plantingTime,
        spread
      });
    });
  };

  render() {
    const { toggleInfoPage } = this.props;
    const {
      aspect,
      botanicalName,
      commonName,
      difficulty,
      floweringTime,
      height,
      plantingTime,
      spread
    } = this.state;

    return (
      <View style={styles.plantCard}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => toggleInfoPage(null)}
          underlayColor="#00000000"
        >
          <Image style={styles.icon} source={back} />
        </TouchableHighlight>
        <View style={styles.infoHeader}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{commonName}</Text>
          <Image style={{ width: 150, height: 150 }} source={empty} />
        </View>
        <ScrollView>
          <Text style={styles.textLine}>{`Botanical name: ${botanicalName}`}</Text>
          <Text style={styles.textLine}>{`Difficulty: ${difficulty} /5`}</Text>
          <Text style={styles.textLine}>{`Flowering season: ${floweringTime}`}</Text>
          <Text style={styles.textLine}>{`Maximum height: ${height}`}</Text>
          <Text style={styles.textLine}>{`Potting season: ${plantingTime}`}</Text>
          <Text style={styles.textLine}>{`Maximum Spread:${spread}`}</Text>
          <Text>{`Prefered aspect: ${aspect.map(direction => `${direction} `)}`}</Text>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  plantCard: {
    backgroundColor: '#8FBB99',
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 6,
    marginRight: 6,
    padding: 3,
    flex: 1
  },
  infoHeader: {
    alignItems: 'center'
  },
  textLine: {
    marginTop: 20
  },
  button: { backgroundColor: 'rgba(10,10,10,0)', height: 50, width: 50 },
  icon: {
    width: 60,
    height: 60
  }
});
