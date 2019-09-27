import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-elements';

export default class DayPicker extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.repeat}> Repeat</Text>
        <Divider/>
        <Button buttonStyle = {styles.dayBox} title='S'></Button>
        <Button buttonStyle = {styles.dayBox} title='M'></Button>
        <Button buttonStyle = {styles.dayBox} title='T'></Button>
        <Button buttonStyle = {styles.dayBox} title='W'></Button>
        <Button buttonStyle = {styles.dayBox} title='T'></Button>
        <Button buttonStyle = {styles.dayBox} title='F'></Button>
        <Button buttonStyle = {styles.dayBox} title='S'></Button>
      </View>
    );
  }
}
AppRegistry.registerComponent('DayPicker', () => DayPicker);

const styles = StyleSheet.create({
  dayBox:{
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    maxWidth: 50,
  },

  repeat:{
    fontSize: 24,
    fontWeight: '600',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  emailIn:{
    padding: 5,
    fontSize: 14,
    fontWeight: '600',
  },

  password:{
    paddingTop: 20,
    fontSize: 24,
    fontWeight: '600',
  },

  passIn:{
    padding: 5,
    fontSize: 14,
    fontWeight: '600',
  }

});
