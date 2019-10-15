import React, {Component} from 'react';
import {AppRegistry, View, Text, StyleSheet, Platform} from 'react-native';

export default class DisplayTime extends Component {
  constructor() {
    super();

    this.state = {currentTime: null, currentDay: null};
    this.daysArray = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
  }

  componentDidMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    if (hour === 0) {
      hour = 12;
    }

    if (new Date().getHours() < 12) {
      am_pm = 'am';
    }

    this.setState({
      currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm,
    });

    this.daysArray.map((item, key) => {
      if (key === new Date().getDay()) {
        this.setState({currentDay: item.toUpperCase()});
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>12:34 PM</Text>
          <Text style={styles.daysText}>{this.state.currentDay}</Text>
          <Text style={styles.timeText}>{this.state.currentTime}</Text>
        </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('DisplayTime', () => DisplayTime);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 50,
    color: '#f44336',
  },
  daysText: {
    color: '#2196f3',
    fontSize: 25,
    paddingBottom: 0,
  },
});
