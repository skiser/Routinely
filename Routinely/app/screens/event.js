import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Platform, UIManager} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import TimePicker from '../components/alarm_components/TimePicker';
import DayPicker from '../components/alarm_components/DayPicker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {Hoshi} from 'react-native-textinput-effects';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import DateTimePicker from '@react-native-community/datetimepicker';

const utcDateToString = (momentInUTC: moment): string => {
  let time = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return time;
};

class EventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      notes: '',
      startTime: '',
      date: new Date('2020-06-12T14:42:42'),
      mode: 'date',
      show: false,
    }; 
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  };


  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };

  componentDidMount() {
    this.time;
  }

  addEvent = async () => {
    const addEvent = firestore()
      .collection('users')
      .doc('skiser')
      .collection('event');
    try {
      await addEvent
        .add({
          title: this.state.title,
          notes: this.state.notes,
          startTime: utcDateToString(this.state.date),
        })
        .then(ref => {
          console.log('Added doc w ID: ', ref.id);
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {show, date, mode} = this.state; 
    return (
      <View style={styles.container}>
        <View style={styles.card1}>
          <Hoshi
            label={'Title'}
            onChangeText={title => this.setState({title})}
            value={this.state.title}
            borderColor={'#2E68FF'}
            maskColor={'#blue'}
          />
          <Hoshi
            label={'Custom Notes'}
            onChangeText={notes => this.setState({notes})}
            value={this.state.notes}
            borderColor={'#2E68FF'}
            maskColor={'#blue'}
          />
        </View>
        <View style={styles.picker}>
        <View>
          <Button onPress={this.datepicker} title="Show  Date" />
        </View>
        <View>
          <Button onPress={this.timepicker} title="Select Time" />
        </View>
        {show && (
          <DateTimePicker
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.setDate}
          />
        )}
        </View>
        <AwesomeButtonBlue
          width={350}
          title="addEvent"
          onPress={() => this.addEvent()}>
          Add Event
        </AwesomeButtonBlue>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  pick: {
    width: 600,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    paddingLeft: 10,
    paddingRight: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 50,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  card1: {
    paddingVertical: 16,
    width: 350,
  },
  submit: {
    paddingVertical: 16,
    width: 350,
  },
});
export default EventScreen;
