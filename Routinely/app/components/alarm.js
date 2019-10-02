import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, StyleSheet, Button } from 'react-native';
import DayPicker from './repeat/DayPicker';
import RepeatDiv from './repeat/RepeatDiv';
import SnoozeDuration from './repeat/SnoozeDuration';
import TimePicker from './TimePicker';
import {Divider} from 'react-native-elements';

class AlarmScreen extends Component {
  render() {
    return (
      <View>
        <TimePicker/>
        <RepeatDiv/>
        <Divider/>
        <DayPicker/>      
        <Divider/>
        <SnoozeDuration/>
        <Divider/> 
        <Button
          title="Calendar"
          onPress={() => this.props.navigation.navigate('Calendar')}
        />
         <Button
          title="Logout"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>

    );
  }
} 

const styles = StyleSheet.create({
 
});

export default AlarmScreen;
