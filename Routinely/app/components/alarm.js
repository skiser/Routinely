import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, StyleSheet, Button } from 'react-native';
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
      </View>

    );
  }
}
const styles = StyleSheet.create({
    bottomLinks:{
      flexDirection: 'row',
      color: 'red',
    }
});

export default AlarmScreen;
