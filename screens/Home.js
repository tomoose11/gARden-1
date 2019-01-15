import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet
} from 'react-native';

export default class Home extends Component {
  state = {
    // plantsUrlArray: []
  };

  componentDidMount = () => {
    console.log('MOUNT');
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is the home page.</Text>
        <Button
          title="go to AR!"
          onPress={() => {
            navigation.navigate('ARScreen');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40
  }
});
