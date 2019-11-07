import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Platform, UIManager, DatePickerIOS,} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import DayPicker from '../components/alarm_components/DayPicker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {Hoshi} from 'react-native-textinput-effects';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import RepeatDiv from '../components/alarm_components/RepeatDiv';
import {Divider} from 'react-native-elements';

const utcDateToString = (momentInUTC: moment): string => {
  let time = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return time;
};

const user = firebase.auth().currentUser;

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
      Pressed: true,
    };
    //this.setDate = this.setDate.bind(this);
  }

  onButtonPress = (day) => {
    this.setState({
      day: true
    });
  }

  addEvent = async (title) => {
    //const title = this.state.title.toString();
    const addEvent = firestore().collection('users').doc(user.email).collection('events');
    try {
      addEvent.doc().set({
        title: this.state.title,
        notes: this.state.notes,
        chosenDate: this.state.chosenDate,
        Sun: this.state.Sun,
        Mon: this.state.Mon,
        Tue: this.state.Tue,
        Wed: this.state.Wed,
        Thu: this.state.Thu,
        Fri: this.state.Fri,
        Sat: this.state.Sat,
      })
        .then(ref => {
          console.log('Added doc w ID: ', ref.id);
        });
    } catch (error) {
      console.error(error);
    }
    this.props.navigation.navigate('Calendar');
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
            value={this.state.notes}
            onChangeText={notes => this.setState({notes})}
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
        <RepeatDiv />
        <Divider />
        <View style={styles.containerDate}>
          <Button
            buttonStyle={styles.dayBox}
            title="S"
            onPress={() => this.setState(prevState => ({Sun: !prevState.Sun}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="M"
            onPress={() => this.setState(prevState => ({Mon: !prevState.Mon}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="T"
            onPress={() => this.setState(prevState => ({Tue: !prevState.Tue}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="W"
            onPress={() => this.setState(prevState => ({Wed: !prevState.Wed}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="T"
            onPress={() => this.setState(prevState => ({Thu: !prevState.Thu}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="F"
            onPress={() => this.setState(prevState => ({Fri: !prevState.Fri}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="S"
            onPress={() => this.setState(prevState => ({Sat: !prevState.Sat}))}
          />
        </View>
        <AwesomeButtonBlue
          width={350}
          title="addEvent"
          onPress={() => this.addEvent(this.state.title)}>
          
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
  containerDate: {
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
