import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Button, Divider, ButtonGroup} from 'react-native-elements';

export default class DayPicker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button buttonStyle={styles.dayBox} title="S" />
        <Button buttonStyle={styles.dayBox} title="M" />
        <Button buttonStyle={styles.dayBox} title="T" />
        <Button buttonStyle={styles.dayBox} title="W" />
        <Button buttonStyle={styles.dayBox} title="T" />
        <Button buttonStyle={styles.dayBox} title="F" />
        <Button buttonStyle={styles.dayBox} title="S" />
      </View>
    );
  }
}
AppRegistry.registerComponent('DayPicker', () => DayPicker);

const styles = StyleSheet.create({
  dayBox: {
    backgroundColor: 'lightgrey',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    overflow: 'hidden',
    padding: 8,
    textAlign: 'center',
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
