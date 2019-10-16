import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';

export default class BottomBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Calendar')}>
            <Image
              style={styles.contain}
              source={require('../img/calendar.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Alarm')}>
            <Image
              style={styles.contain}
              source={require('../img/alarm.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              this.signOut;
            }}>
            <Image
              style={styles.contain}
              source={require('../img/logout.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Event')}>
            <Image
              style={styles.contain}
              source={require('../img/plus.png')}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('BottomBar', () => BottomBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'blue',
  },
});
