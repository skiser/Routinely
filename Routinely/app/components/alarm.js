import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, StyleSheet, TouchableHighlight, Image} from 'react-native';
import DayPicker from './alarm_components/DayPicker';
import RepeatDiv from './alarm_components/RepeatDiv';
import SnoozeDuration from './alarm_components/SnoozeDuration';
import TimePicker from './alarm_components/TimePicker';
import {Divider} from 'react-native-elements';
import ColorPicker from './alarm_components/ColorPicker';
import TitleInput from './alarm_components/TitleInput';

class AlarmScreen extends Component {
  render() {
    return (
      <View>
        <TitleInput/>
        <TimePicker/>
        <RepeatDiv/>
        <Divider/>
        <DayPicker/>      
        <Divider/>
        <SnoozeDuration/>
        <Divider/> 
        <ColorPicker/>
        <Divider/>
        <View style={styles.container}>
        <View style={{flexDirection:"row"}}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Calendar')}>
          <Image
            style={styles.contain}
            source={require('./img/calendar.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Alarm')}>
          <Image
            style={styles.contain}
            source={require('./img/alarm.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Logout')}>
          <Image
            style={styles.contain}
            source={require('./img/logout.png')}
          />
        </TouchableHighlight>
        </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    paddingTop: 10,
    paddingLeft: 40, 
    paddingRight: 20,
    paddingBottom: 5,
  },
  contain: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default AlarmScreen;
