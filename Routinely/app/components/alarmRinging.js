import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Button } from 'react-native';
import DisplayTime from './alarmRinging_components/DisplayTime';


class AlarmRingingScreen extends Component {
  render() {
    return (
      <View>
        <DisplayTime/>
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

export default AlarmRingingScreen;
