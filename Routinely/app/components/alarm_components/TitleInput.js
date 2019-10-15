import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Button, Divider, ButtonGroup } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';

export default class TitleInput extends Component {
    render() {
    return (
      <View style = {styles.container}>
          <View style={styles.card1}>
            <Hoshi label={'Title'} borderColor={'#2E68FF'} maskColor={'#blue'} />
          </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('TitleInput', () => TitleInput);

const styles = StyleSheet.create({
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 50,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  card1: {
    paddingVertical: 16,
    width: 350,
  },
  container: {
    flexDirection: 'row',
    padding: 10
  }
});
