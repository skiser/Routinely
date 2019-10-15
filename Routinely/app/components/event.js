import React, {Component, useState } from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import TimePicker from './alarm_components/TimePicker';
import DayPicker from './alarm_components/DayPicker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

const utcDateToString = (momentInUTC: moment): string => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return s;
};

class EventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      notes:'',
    };
  }

  addEvent = async () => {
    const addEvent = firestore().collection('users').doc('skiser').collection('event')
    try{
      await addEvent.add({
      title: this.state.title,
      notes: this.state.notes,
    }).then(ref => {
      console.log('Added doc w ID: ', ref.id);
    })
    }catch(error){
      console.error(error)
    }
  };


  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Event title: </Text>
          <TextInput
            placeholder="enter event title"
            onChangeText = {title => this.setState({title})}
            value={this.state.title}
          />
        <Text style={styles.welcome}>Event Notes: </Text>
          <TextInput
            placeholder="enter event event"
            onChangeText = {notes => this.setState({notes})}
            value={this.state.notes}
          />
        {/* <View style={styles.picker}>
          <DayPicker />
          <TimePicker />
        </View> */}
        <Button 
        title= "addEvent"
        onPress={()=> this.addEvent()}
        >
        </Button>
      </View>
    );
  
  }

  static addToCalendar = (title: string, startDateUTC: moment) => {
    const eventConfig = {
      title,
      startDate: utcDateToString(startDateUTC),
      endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
      notes: 'tasty!',
      navigationBarIOS: {
        tintColor: 'orange',
        backgroundColor: 'green',
        titleColor: 'blue',
      },
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(
        (eventInfo: {
          calendarItemIdentifier: string,
          eventIdentifier: string,
        }) => {
          // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
          // These are two different identifiers on iOS.
          // On Android, where they are both equal and represent the event id, also strings.
          // when { action: 'CANCELED' } is returned, the dialog was dismissed
          console.warn(JSON.stringify(eventInfo));
        },
      )
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };

  static editCalendarEventWithId = (eventId: string) => {
    const eventConfig = {
      eventId,
    };

    AddCalendarEvent.presentEventEditingDialog(eventConfig)
      .then(eventInfo => {
        console.warn(JSON.stringify(eventInfo));
      })
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };
}

const styles = StyleSheet.create({
  pick: {
    width: 600,
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  card1: {
    paddingVertical: 16,
    width: 350,
  },
});
export default EventScreen;
