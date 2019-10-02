import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Button, Divider, ButtonGroup } from 'react-native-elements';

export default class colorPicker extends Component {
    render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.colorTitle}>Color</Text>
        <Divider/>
        <Button buttonStyle = {styles.colorCircleYellow} title=''></Button>
        <Button buttonStyle = {styles.colorCircleRed} title=''></Button>
        <Button buttonStyle = {styles.colorCircleGreen} title=''></Button>
        <Button buttonStyle = {styles.colorCirclePink} title=''></Button>
        <Button buttonStyle = {styles.colorCircleBlue} title=''></Button>
      </View>
    );
  }
}
AppRegistry.registerComponent('colorPicker', () => colorPicker);

const styles = StyleSheet.create({
  colorCircleRed:{
    backgroundColor: 'red',
    borderColor: 'white',
    borderRadius: 100,
    padding: 4,
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  colorCircleBlue:{
    backgroundColor: 'blue',
    borderColor: 'white',
    borderRadius: 100,
    padding: 4,
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  colorCircleGreen:{
    backgroundColor: 'limegreen',
    borderColor: 'white',
    borderRadius: 100,
    padding: 4,
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  colorCircleYellow:{
    backgroundColor: 'yellow',
    borderColor: 'white',
    borderRadius: 100,
    padding: 4,
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  colorCirclePink:{
    backgroundColor: 'pink',
    borderColor: 'white',
    borderRadius: 100,
    padding: 4,
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  colorTitle:{
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
