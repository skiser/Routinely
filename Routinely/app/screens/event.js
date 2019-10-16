import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  UIManager,
  DatePickerIOS,
} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import DayPicker from '../components/alarm_components/DayPicker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {Hoshi} from 'react-native-textinput-effects';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';

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
      chosenDate: new Date(),
      Sun: false,
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
    };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({chosenDate: newDate});
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
          chosenDate: utcDateToString(this.state.chosenDate),
        })
        .then(ref => {
          console.log('Added doc w ID: ', ref.id);
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
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
        <View>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={chosenDate => this.setState({chosenDate})}
          />
        </View>
        <View style={styles.containerdate}>
          <Button 
            buttonStyle={styles.dayBox} 
            title="S" 
            disabled 
            onPress={Sun => this.setState({Sun})}/>
          <Button 
            buttonStyle={styles.dayBox} 
            title="M" 
            disabled 
            onPress={Mon => this.setState({Mon})}/>
          <Button 
            buttonStyle={styles.dayBox} 
            title="T" 
            disabled 
            onPress={Tue => this.setState({Tue})}/>
          <Button 
            buttonStyle={styles.dayBox} 
            title="W" 
            disabled
            onPress={Wed => this.setState({Wed})}/>
          <Button 
            buttonStyle={styles.dayBox} 
            title="T" 
            disabled
            onPress={Thu => this.setState({Thu})}/>
          <Button 
            buttonStyle={styles.dayBox} 
            title="F" 
            disabled
            onPress={Fri => this.setState({Fri})}/>
          <Button 
            buttonStyle={styles.dayBox} 
            title="S"
            disabled
            onPress={Sat => this.setState({Sat})}/>
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
  dayBox: {
    backgroundColor: 'lightgrey',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    overflow: 'hidden',
    padding: 8,
    textAlign: 'center',
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  containerdate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  pick: {
    width: 600,
  },
  container: {
    flex: 1,
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
