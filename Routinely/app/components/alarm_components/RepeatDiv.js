import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
export default class RepeatDiv extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.repeat}> Repeat</Text>
      </View>
    );
  }
}
AppRegistry.registerComponent('RepeatDiv', () => RepeatDiv);

const styles = StyleSheet.create({
  repeat: {
    fontSize: 20,
    color: 'darkgrey',
    fontWeight: '600',
    padding: 5,
  },
  container: {
    flexDirection: 'row',
  },
});
