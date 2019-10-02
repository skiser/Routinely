import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Button, Divider, ButtonGroup } from 'react-native-elements';

export default class SnoozeDuration extends Component {
    render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.snooze}>Snooze</Text>
        <Divider/>
        <Button buttonStyle = {styles.dayBox} title='2 min'></Button>
        <Button buttonStyle = {styles.dayBox} title='5 min'></Button>
        <Button buttonStyle = {styles.dayBox} title='10 min'></Button>
      </View>
    );
  }
}
AppRegistry.registerComponent('SnoozeDuration', () => SnoozeDuration);

const styles = StyleSheet.create({
  dayBox:{
    backgroundColor: 'lightgrey',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    overflow: 'hidden',
    padding: 8,
    textAlign:'center',
    width: 80,
    height: 40,
    flexDirection: 'row',
   
  },
  snooze:{
    fontSize: 20,
    color: 'darkgrey',
    fontWeight: '600',
    padding: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  }
});
