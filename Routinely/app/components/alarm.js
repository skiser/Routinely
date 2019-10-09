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
<<<<<<< HEAD
        <Button
          buttonStyle = {styles.bottomLinks}
          title="Calendar"
          onPress={() => this.props.navigation.navigate('Calendar')}
        />
         <Button
          buttonStyle = {styles.bottomLinks}
          title="Logout"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          buttonStyle = {styles.bottomLinks}
          title="Alarm Ringing"
          onPress={() => this.props.navigation.navigate('AlarmRinging')}
        />
=======
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
>>>>>>> cb3e52e2da9d8829c9f583957a959a568f4378e8
      </View>
    );
  }
}
const styles = StyleSheet.create({
<<<<<<< HEAD
    bottomLinks:{
      flexDirection: 'row',
      color: 'red',
    }
=======
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
>>>>>>> cb3e52e2da9d8829c9f583957a959a568f4378e8
});

export default AlarmScreen;
