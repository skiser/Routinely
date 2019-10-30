import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import DayPicker from '../components/alarm_components/DayPicker';
import RepeatDiv from '../components/alarm_components/RepeatDiv';
import SnoozeDuration from '../components/alarm_components/SnoozeDuration';
import TimePicker from '../components/alarm_components/TimePicker';
import {Divider} from 'react-native-elements';
import ColorPicker from '../components/alarm_components/ColorPicker';
import TitleInput from '../components/alarm_components/TitleInput';

class AlarmScreen extends Component {
  render() {
    return (
      <View>
        <TitleInput />
        <TimePicker />
        <RepeatDiv />
        <Divider />
        <DayPicker />
        <Divider />
        <SnoozeDuration />
        <Divider />
        <ColorPicker />
        <Divider />
        <Button onPress={() => this.props.navigation.navigate('AlarmRinging')} title="Ring"/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
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
